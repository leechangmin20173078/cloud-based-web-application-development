const Note = require('./Note');
const MongoClient = require('mongodb').MongoClient;

const MongoUrl = 'mongodb://127.0.0.1:27017';
const DataBaseName = 'mongodb-tutorial';
const CollectionName = 'Notes'

var notes = [];

exports.keylist = async function() { 
    let client = await MongoClient.connect(MongoUrl)
    .catch(err => {
      console.log(err);
    });
    let db = client.db(DataBaseName);
    let collection = db.collection(CollectionName);
    let result = await collection.find({}).toArray();
    return result;
  };