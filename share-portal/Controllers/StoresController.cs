using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SharePortal
{
  public class StoresController : BaseController
  {
    private readonly DbService _dbService;

    public StoresController(DbService dbService)
    {
      _dbService = dbService;
    }

    [HttpGet]
    public async Task<IActionResult> Get() => Ok(await _dbService.Stores.FindAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
      var result = await _dbService.Stores.FindByIdAsync(id);
      if (result == null)
        return NotFound();

      return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Store store)
    {
      await _dbService.Stores.CreateAsync(store);
      return CreatedAtRoute(new { id = store.Id }, store);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Store store)
    {
      if (!await _dbService.Stores.UpdateAsync(store))
        return NotFound();

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
      if (!await _dbService.Stores.DeleteAsync(id))
        return NotFound();

      return NoContent();
    }
  }
}
