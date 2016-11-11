import Promise from 'bluebird';
import mongodb from 'mongodb';

export const openDb= (dbSpec)=>
  mongodb.MongoClient.connect(dbSpec.url);

export const clearDb=(db)=>
  db.collection('photos').remove({})

export const addPhoto=(db,data,id)=>
  db.collection('photos')
    .insertOne(Object.assign({},data,{_id:id}))

export const closeDb= (db)=>
  db.close();

