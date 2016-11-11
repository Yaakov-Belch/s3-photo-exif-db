const Promise=require('bluebird');
const mongodb = require('mongodb');

export const openDb= (dbSpec)=>
  mongodb.MongoClient.connect(dbSpec.url);

export const newEmptyDb=(dbSpec)=>
  openDb(dbSpec)
    .then(deleteAllPhotos);

const deleteAllPhotos=(db)=>
  db.collection('photos')
    .remove({})
    .then(()=>db);

export const addPhoto=(db,data,id)=>
  db.collection('photos')
    .insertOne(Object.assign({},data,{_id:id}))
    .then(()=>db);

export const closeDb= (db)=> db.close();

