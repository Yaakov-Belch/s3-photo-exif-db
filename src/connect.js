import Promise from 'bluebird';
import {getPhotoIdList, getPhotoBuffer} from './s3.js';
import {buffer2Exif} from './exif.js';
import {openDb, addExif, checkExif, closeDb} from './database.js';

export const exifDbLoader=async(bucketSpec,dbSpec,spec,logger)=>{
  logger && logger('exifDbLoader', {bucketSpec,dbSpec,spec});
  const db=await openDb(dbSpec);
  try {

    const list= await getPhotoIdList(bucketSpec);
    await parallelFetchAndStore(list,bucketSpec,db,spec,logger);

  } finally {
    await closeDb(db);
    logger && logger('exifDbLoader.done',{});
    return true;
  }
};

export const parallelFetchAndStore=
  async (list,bucketSpec,db,spec,logger)=> {
    const {concurrency,skipOld}=spec;
    logger && logger('parallelFetchAndStore',{list,spec});

    await Promise.map(list,
      async (id)=> {
        if(skipOld && await checkExif(db,id)) {
          logger && logger('skipOld',{id});
          return true;
        }

        const exif =await fetchExif(bucketSpec,id,logger);
        return await addExif(db,id,exif,logger);

      },
      {concurrency}
    );

    return true;
  };

export const fetchExif= async (bucketSpec,id,logger)=>
  buffer2Exif(await getPhotoBuffer(bucketSpec,id,logger), bucketSpec);

export const newLogger=(t)=>(key,data)=>
  t? (t.comment(key+':'),t.comment(JSON.stringify(data,null,2)))
   : console.log(key,data);

