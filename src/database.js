import Promise from 'bluebird';
import mongodb from 'mongodb';

export const openDb= (dbSpec)=>
  mongodb.MongoClient.connect(dbSpec.url);

export const clearDb=(db)=>
  db.collection('exif').remove({});

export const addExif=(db,id,exif)=>
  db.collection('exif')
    .findOneAndUpdate({_id:id}, {$setOnInsert:exif},{new:true, upsert:true})
    .then(r=>!r.value); // return promise of true if id was new.

export const checkExif=(db,id)=>
  db.collection('exif').find({_id:id}).limit(1).count();

export const closeDb= (db)=>
  db.close();

