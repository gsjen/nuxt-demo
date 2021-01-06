using MongoDB.Driver;
using SharePortal.Repositories;

namespace SharePortal
{
  public class DbService
  {

    private readonly IMongoDatabase _database;

    public DbService(string connectionString)
    {
      var client = new MongoClient(connectionString);
      _database = client.GetDatabase("shareportaldb");
    }

    public StoreRepository Stores => new StoreRepository(_database.GetCollection<Store>("stores"));

    public UserRepository Users => new UserRepository(_database.GetCollection<User>("users"));
  }
}
