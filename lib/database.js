const Promise=require('bluebird');
const mongodb = require('mongodb');

const openDb= (dbSpec)=>
  mongodb.MongoClient.connect(dbSpec.url);

const newEmptyDb=(dbSpec)=>
  openDb(dbSpec)
    .then(deleteAllPhotos);

const deleteAllPhotos=(db)=>
  db.collection('photos')
    .remove({})
    .then(()=>db);

const addPhoto=(db,data,id)=>
  db.collection('photos')
    .insertOne(Object.assign({},data,{_id:id}))
    .then(()=>db);

const close= (db)=> db.close();

module.exports={openDb, newEmptyDb, addPhoto, close};
  
