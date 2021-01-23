const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
const url = 'mongodb://localhost:27017';
 
const dbName = 'mongoTutorial';
 
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  const db = client.db(dbName);
 
  updateDocuments(db, function() {
      client.close();
  });
});

const updateDocuments = function(db, callback) {
  
    const collection = db.collection('users');
    
    collection.updateOne({ username : "user2" }
      , { $set: { age : 24 } }, function(err, result) {
      assert.equal(err, null);
      console.log("Updated");
      callback(result);
    });
  }