using System;
using System.Diagnostics;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SharePortal
{
  [DebuggerDisplay("Id = {" + nameof(Id) + "}")]
  public class User
  {
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public DateTime? LastLoginDate { get; set; }

    public DateTime? BadPasswordWindowStart { get; set; }

    public int? BadPasswordCount { get; set; }

    public bool IsLockedOut { get; set; }

    public string Role { get; set; }
  }
}
