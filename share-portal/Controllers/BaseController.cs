using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace SharePortal
{
  [ApiController]
  [Route("[controller]")]
  [Authorize]
  public abstract class BaseController : ControllerBase
  {
    /// <summary>
    /// Creates a <see cref="CreatedAtRouteResult"/> (201 Created) with the specified values.
    /// </summary>
    /// <typeparam name="T">The type of content in the entity body.</typeparam>
    /// <param name="routeValues">The route data to use for generating the URL.</param>
    /// <param name="content">The content value to format in the entity body.</param>
    /// <returns>The created Microsoft.AspNetCore.Mvc.CreatedAtRouteResult for the response.</returns>
    protected CreatedAtRouteResult CreatedAtRoute<T>(object routeValues, T value)
    {
      var values = new RouteValueDictionary(routeValues);
      if (!values.ContainsKey("controller"))
        values.Add("controller", ControllerContext.ActionDescriptor.ControllerName);

      return base.CreatedAtRoute(values, value);
    }
  }
}
