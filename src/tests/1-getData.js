import test from 'blue-tape';
import fs   from 'fs';

import {getPhotoIdList, getPhotoBuffer} from '../s3.js';
import {extractExif, trafoExif, buffer2Exif} from '../exif.js';

import {
  bucketSpec, sampleLength, firstPhotoId, firstPhotoSize,
  imageFile, imageFileSize, exifKey0, exifValue0
} from '../zSamples';

test('getPhotoIdList sample from bucketUrl', async t=>{
  t.plan(3);
  const list= await getPhotoIdList(bucketSpec);
  t.ok(Array.isArray(list),'return an array of ids');
  t.equal(list.length,sampleLength, 'length of sample list');
  t.equal(list[0],firstPhotoId,'first photo id');
});

test('getPhotoBuffer sample length', async t=>{
  t.plan(1);
  const buffer= await getPhotoBuffer(bucketSpec,firstPhotoId);
  t.equal(buffer.length,firstPhotoSize,'first photo size');
});

test('extract exif from photo on disk', async t=>{
  t.plan(4);
  const buffer=fs.readFileSync(imageFile);
  t.equal(buffer.length,imageFileSize,'check image size');

  const exif=extractExif(buffer);
  t.equal(exif.tags[exifKey0], exifValue0, 'check extractExif');

  t.equal(
    trafoExif(exif,bucketSpec)[exifKey0],
    exifValue0,
    'check trafoExif'
  );

  t.equal(
    buffer2Exif(buffer,bucketSpec)[exifKey0],
    exifValue0,
    'check buffer2Exif'
  );
});

