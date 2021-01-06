using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SharePortal
{
  public class AccountController : BaseController
  {
    private readonly DbService _dbService;
    private readonly AuthenticationService _authService;

    public AccountController(DbService dbService, AuthenticationService authService)
    {
      _dbService = dbService;
      _authService = authService;
    }

    [HttpPost("authenticate")]
    [AllowAnonymous]
    public async Task<IActionResult> Authenticate()
    {
      ClaimsIdentity identity;
      var authenticateResult = await HttpContext.AuthenticateAsync();
      if (authenticateResult.Succeeded)
      {
        identity = (ClaimsIdentity)HttpContext.User.Identity;
        // identity = HttpContext.User.HasClaim(c => c.Type == ClaimTypes.Name) ? new ClaimsIdentity(JwtBearerDefaults.AuthenticationScheme) : new ClaimsIdentity();
        // identity.AddClaims(claims.Union(HttpContext.User.Claims, new ClaimsEqualityComparer()));
      }
      else
      {
        identity = new ClaimsIdentity();
      }

      return Ok(new
      {
        Token = _authService.GenerateJwtToken(identity)
      });
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn(SignInModel model)
    {
      if (model == null || string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
      {
        return BadRequest("Required parameters missing.");
      }

      var user = await _dbService.Users.FindByUsernameAsync(model.Username);
      if (user == null || !_authService.VerifyPassword(user.Password, model.Password))
      {
        if (user != null)
        {
          var failureCount = (user.BadPasswordCount ?? 0) + 1;
          var windowStart = user.BadPasswordWindowStart ?? DateTime.UtcNow;
          var windowEnd = windowStart.Add(TimeSpan.FromHours(1));
          if (DateTime.UtcNow > windowEnd)
          {
            user.BadPasswordWindowStart = DateTime.UtcNow;
            user.BadPasswordCount = 1;
          }
          else if (failureCount >= 3)
          {
            user.IsLockedOut = true;
          }
          else
          {
            user.BadPasswordWindowStart = windowStart;
            user.BadPasswordCount = failureCount;
          }
          user.ModifiedDate = DateTime.UtcNow;
          await _dbService.Users.UpdateAsync(user);
        }
        return BadRequest("Invalid username or password.");
      }

      var claims = new List<Claim>
      {
          new Claim(ClaimTypes.Name, user.Username),
          new Claim(ClaimTypes.Email, user.Email),
          new Claim(ClaimTypes.Role, user.Role)
      };

      user.LastLoginDate = DateTime.UtcNow;
      user.ModifiedDate = DateTime.UtcNow;
      await _dbService.Users.UpdateAsync(user);

      var identity = new ClaimsIdentity(claims, "Basic");
      HttpContext.User = new ClaimsPrincipal(identity);

      return Ok(new
      {
        Token = _authService.GenerateJwtToken(identity),
        User = new
        {
          Username = user.Username
        }
      });
    }

    [HttpPost("resetpassword")]
    public async Task<IActionResult> ResetPassword(SignInModel model)
    {
      if (!string.IsNullOrEmpty(model.Token))
      {
        var principal = _authService.VerifyPasswordResetToken(model.Token);
        if (principal == null)
          return BadRequest("Invalid token.");

        var user = await _dbService.Users.FindByUsernameAsync(principal.Identity.Name);
        user.Password = model.Password;
        await _dbService.Users.UpdateAsync(user);
      }
      else
      {
        var user = await _dbService.Users.FindByUsernameAsync(model.Username);
        if (user == null)
          return BadRequest("Invalid username.");

        var token = _authService.GeneratePasswordResetToken(user.Username);
        // send email
      }



      return Ok();
    }

    public class SignInModel
    {
      public string Username { get; set; }

      public string Password { get; set; }

      public string Token { get; set; }
    }
  }
}
