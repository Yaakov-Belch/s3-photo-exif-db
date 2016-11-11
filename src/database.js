import Promise from 'bluebird';
import mongodb from 'mongodb';

export const openDb= (dbSpec)=>
  mongodb.MongoClient.connect(dbSpec.url);

export const clearDb=(db)=>
  db.collection('exif').remove({});

export const addExif=(db,_id,data)=>
  db.collection('exif')
    .findOneAndUpdate({_id}, {$setOnInsert:data},{new:true, upsert:true})
    .then(r=>!r.value); // return promise of true if _id was new.

export const checkExif=(db,_id)=>
  db.collection('exif').find({_id}).limit(1).count();

export const closeDb= (db)=>
  db.close();

