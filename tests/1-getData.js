const test = require('blue-tape');
const fs   = require('fs');

const s3access=    require('../lib/s3access.js');
const exif= require('../lib/exif.js');


const bucketSpec={
  endPoint: 's3.amazonaws.com',
  bucket: 'waldo-recruiting'
};

const sampleLength=129;
const firstPhotoId=
  '0003b8d6-d2d8-4436-a398-eab8d696f0f9.68cccdd4-e431-457d-8812-99ab561bf867.jpg';
const firstPhotoSize=6306109;

test('getPhotoIdList sample from bucketUrl', t=>{
  t.plan(3);
  s3access.getPhotoIdList(bucketSpec)
    .then(list=>{
      t.ok(Array.isArray(list),'return an array of ids');
      t.equal(list.length,sampleLength, 'length of sample list');
      t.equal(list[0],firstPhotoId,'first photo id');
    })
    .catch(e=>t.fail(e));
});

test('getPhotoBuffer sample length', t=>{
  t.plan(1);
  s3access.getPhotoBuffer(bucketSpec,firstPhotoId)
    .then(buffer=>{
      t.equal(buffer.length,firstPhotoSize,'first photo size')
    });
});


test.only('extract exif from photo on disk',t=>{
  t.plan(2);
  const buffer=fs.readFileSync('Z/image.jpg');
  t.equal(buffer.length,32764,'check image size');

  t.equal(exif.extract(buffer).Make, 'Canon', 'check exif.Make');
});

