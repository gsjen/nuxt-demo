using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SharePortal.Repositories
{
  public abstract class MongoRepository<T>
  {
    protected readonly IMongoCollection<T> _collection;

    public MongoRepository(IMongoCollection<T> collection)
    {
      _collection = collection;
    }

    protected async Task<IList<T>> FindAsync()
    {
      return await _collection.Find(new BsonDocument()).ToListAsync();
    }

    protected async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> filter)
    {
      return await _collection.Find(filter).FirstOrDefaultAsync();
    }

    protected async Task InsertAsync(T document)
    {
      await _collection.InsertOneAsync(document);
    }

    protected async Task<bool> ReplaceAsync(Expression<Func<T, bool>> filter, T document)
    {
      return (await _collection.ReplaceOneAsync(filter, document)).MatchedCount > 0;
    }

    protected async Task<bool> DeleteAsync(Expression<Func<T, bool>> filter)
    {
      return (await _collection.DeleteOneAsync(filter)).DeletedCount > 0;
    }
  }
}
