using System;
using System.Diagnostics;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SharePortal
{
  [DebuggerDisplay("Id = {" + nameof(Id) + "}")]
  public class Store
  {
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Name { get; set; }

    public string ShareGroup { get; set; }

    public string Address { get; set; }

    public string City { get; set; }

    public string State { get; set; }

    public string Zip { get; set; }

    public string Phone { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string PharmacyPhone { get; set; }

    public string Fax { get; set; }

    public string PharmacyFax { get; set; }

    public DateTime? SignupDate { get; set; }
  }
}
