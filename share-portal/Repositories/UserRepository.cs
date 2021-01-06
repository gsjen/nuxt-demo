using System.Threading.Tasks;
using MongoDB.Driver;

namespace SharePortal.Repositories
{
  public class UserRepository : MongoRepository<User>
  {
    public UserRepository(IMongoCollection<User> collection)
      : base(collection)
    { }

    public async Task<User> FindByUsernameAsync(string username)
    {
      return await FirstOrDefaultAsync(s => s.Username == username);
    }

    public async Task CreateAsync(User user)
    {
      await InsertAsync(user);
    }

    public async Task<bool> UpdateAsync(User user)
    {
      return await ReplaceAsync(s => s.Id == user.Id, user);
    }

    public async Task<bool> DeleteAsync(string id)
    {
      return await DeleteAsync(s => s.Id == id);
    }
  }
}
