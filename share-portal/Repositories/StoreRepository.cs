using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace SharePortal.Repositories
{
  public class StoreRepository : MongoRepository<Store>
  {
    public StoreRepository(IMongoCollection<Store> collection)
      : base(collection)
    { }

    public async Task<IEnumerable<Store>> FindAllAsync()
    {
      return await FindAllAsync();
    }

    public async Task<Store> FindByIdAsync(string id)
    {
      return await FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task CreateAsync(Store store)
    {
      await InsertAsync(store);
    }

    public async Task<bool> UpdateAsync(Store store)
    {
      return await ReplaceAsync(s => s.Id == store.Id, store);
    }

    public async Task<bool> DeleteAsync(string id)
    {
      return await DeleteAsync(s => s.Id == id);
    }
  }
}
