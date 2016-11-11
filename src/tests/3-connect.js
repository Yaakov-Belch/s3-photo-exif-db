import test from 'blue-tape';

import {getPhotoIdList} from '../s3.js';
import {openDb,clearDb,checkExif,closeDb} from '../database.js'
import {
  fetchExif, newLogger, parallelFetchAndStore, exifDbLoader
} from '../connect.js';

import {
  bucketSpec, firstPhotoId, exifKey1, exifValue1,
  dbSpec,
} from '../zSamples';

test('first photo: fetchExif', async t=>{
  const logger=newLogger(t);
  t.plan(1);
  const exif=await fetchExif(bucketSpec,firstPhotoId,logger);
  t.equal(exif[exifKey1], exifValue1, 'check fetchExif');
});

test('fetch two and the third photo exif', async t=>{
  const logger=newLogger(t);
  const spec={concurrency:1, skipOld:true};
  const db=await openDb(dbSpec);
  try {
    await clearDb(db);

    const list= await getPhotoIdList(bucketSpec);
    const list2=list.slice(0,2);
    const list3=list.slice(0,3);

    await parallelFetchAndStore(list2,bucketSpec,db,spec,logger);
    await parallelFetchAndStore(list3,bucketSpec,db,spec,logger);

  } finally {
    await closeDb(db);
  }
});

test('run full app', async t=>{
  const logger=newLogger(t);
  const spec={concurrency:3, skipOld:true};
  await exifDbLoader(bucketSpec,dbSpec,spec,logger);
});
