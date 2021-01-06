using System;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace SharePortal
{
  public static class AuthenticationExtensions
  {
    public static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
      services
        .Configure<AuthenticationOptions>(configuration.GetSection("Authentication"))
        .AddSingleton<AuthenticationService>()
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer();

      services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme).Configure<AuthenticationService>((options, authService) =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          IssuerSigningKey = authService.SecretKey,
          ValidateIssuerSigningKey = true,
          ValidateAudience = false,
          ValidateIssuer = false
        };
        options.Events = new JwtBearerEvents
        {
          OnTokenValidated = c =>
          {
            c.HttpContext.User = c.Principal;
            return Task.CompletedTask;
          }
        };
      });

      return services;
    }
  }

  public class AuthenticationService
  {
    private readonly PasswordHasher _passwordHasher;
    private readonly JwtTokenGenerator _jwtTokenGenerator;
    private readonly int _tokenLifetimeInDays;
    private readonly SecurityKey _secretKey;

    public AuthenticationService(IOptions<AuthenticationOptions> options)
    {
      _passwordHasher = new PasswordHasher();
      _secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(options.Value.JwtSecretKey));
      _jwtTokenGenerator = new JwtTokenGenerator(_secretKey);
      _tokenLifetimeInDays = options.Value.JwtLifetimeInDays;
    }

    public SecurityKey SecretKey => _secretKey;

    public string HashPassword(string password) => _passwordHasher.HashPassword(password);

    public bool VerifyPassword(string hashedPassword, string providedPassword) =>
      _passwordHasher.VerifyHashedPassword(hashedPassword, providedPassword);

    public string GenerateJwtToken(ClaimsIdentity identity) =>
      _jwtTokenGenerator.GenerateToken(identity, DateTime.UtcNow.AddDays(_tokenLifetimeInDays));

    public string GeneratePasswordResetToken(string username)
    {
      var identity = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, username) });
      return _jwtTokenGenerator.GenerateToken(identity, DateTime.UtcNow.AddHours(3), "password-reset");
    }

    public ClaimsPrincipal VerifyPasswordResetToken(string token)
    {
      return _jwtTokenGenerator.VerifyToken(token, "password-reset");
    }


    // adapted from https://github.com/aspnet/Identity/blob/master/src/Core/PasswordHasher.cs
    private class PasswordHasher
    {
      private const int ITERATION_COUNT = 10000;
      private const int SALT_LENGTH = 128 / 8;
      private const int KEY_LENGTH = 256 / 8;
      private const KeyDerivationPrf KEY_DERIVATION_PRF = KeyDerivationPrf.HMACSHA256;

      private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

      public string HashPassword(string password)
      {
        if (password == null)
        {
          throw new ArgumentNullException(nameof(password));
        }

        var salt = new byte[SALT_LENGTH];
        _rng.GetBytes(salt);
        var subkey = KeyDerivation.Pbkdf2(password, salt, KEY_DERIVATION_PRF, ITERATION_COUNT, KEY_LENGTH);
        var outputBytes = new byte[salt.Length + subkey.Length];
        Buffer.BlockCopy(salt, 0, outputBytes, 0, salt.Length);
        Buffer.BlockCopy(subkey, 0, outputBytes, salt.Length, subkey.Length);
        return Convert.ToBase64String(outputBytes);
      }

      public bool VerifyHashedPassword(string hashedPassword, string providedPassword)
      {
        if (hashedPassword == null)
        {
          throw new ArgumentNullException(nameof(hashedPassword));
        }
        if (providedPassword == null)
        {
          throw new ArgumentNullException(nameof(providedPassword));
        }

        var decodedHashedPassword = Convert.FromBase64String(hashedPassword);

        try
        {
          var salt = new byte[SALT_LENGTH];
          Buffer.BlockCopy(decodedHashedPassword, 0, salt, 0, salt.Length);

          var keyLength = hashedPassword.Length - salt.Length;
          if (keyLength < 128 / 8)
          {
            return false;
          }
          var expectedKey = new byte[keyLength];
          Buffer.BlockCopy(decodedHashedPassword, salt.Length, expectedKey, 0, expectedKey.Length);

          var actualSubkey = KeyDerivation.Pbkdf2(providedPassword, salt, KEY_DERIVATION_PRF, ITERATION_COUNT, keyLength);
          return ByteArraysEqual(actualSubkey, expectedKey);
        }
        catch
        {
          // This should never occur except in the case of a malformed payload, where
          // we might go off the end of the array. Regardless, a malformed payload
          // implies verification failed.
          return false;
        }
      }

      // Compares two byte arrays for equality. The method is specifically written so that the loop is not optimized.
      [MethodImpl(MethodImplOptions.NoInlining | MethodImplOptions.NoOptimization)]
      private static bool ByteArraysEqual(byte[] a, byte[] b)
      {
        if (a == null && b == null)
        {
          return true;
        }
        if (a == null || b == null || a.Length != b.Length)
        {
          return false;
        }
        var areSame = true;
        for (var i = 0; i < a.Length; i++)
        {
          areSame &= (a[i] == b[i]);
        }
        return areSame;
      }
    }

    private class JwtTokenGenerator
    {
      private readonly SecurityKey _key;

      public JwtTokenGenerator(SecurityKey key)
      {
        _key = key;
      }

      public string GenerateToken(ClaimsIdentity identity, DateTime expires, string audience = null)
      {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = identity,
          Expires = expires,
          SigningCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature),
          Audience = audience
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
      }

      public ClaimsPrincipal VerifyToken(string token, string audience = null)
      {
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.ValidateToken(token, new TokenValidationParameters
        {
          IssuerSigningKey = _key,
          ValidateIssuerSigningKey = true,
          ValidateAudience = audience != null,
          ValidAudiences = audience != null ? new string[] { audience } : null,
          ValidateIssuer = false
        }, out var validatedToken);
      }
    }
  }

  public class AuthenticationOptions
  {
    public int JwtLifetimeInDays { get; set; }
    public string JwtSecretKey { get; set; }
    public int AccountLockoutTimeInHours { get; set; } = 3;
  }
}
