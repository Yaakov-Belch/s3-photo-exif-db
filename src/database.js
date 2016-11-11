import Promise from 'bluebird';
import mongodb from 'mongodb';

export const openDb= (dbSpec)=>
  mongodb.MongoClient.connect(dbSpec.url);

export const clearDb=(db)=>
  db.collection('exif').remove({});

export const addExif=async(db,id,exif,logger)=> {
  logger && logger('addExif',{id,exif});

  const opts={new:true, upsert:true};
  const c=db.collection('exif');
  const r=await c.findOneAndUpdate({_id:id},{$setOnInsert:exif},opts);

  const added=!r.value;
  logger && logger('addExif.added',{id,added});
  return added;
};

export const checkExif=(db,id)=>
  db.collection('exif').find({_id:id}).limit(1).count();

export const closeDb= (db)=>
  db.close();

