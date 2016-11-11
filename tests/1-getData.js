const test = require('blue-tape');
const fs   = require('fs');
const s3=require('../lib/s3access.js');

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
  s3.getPhotoIdList(bucketSpec)
    .then(list=>{
      t.ok(Array.isArray(list),'return an array of ids');
      t.equal(list.length,sampleLength, 'length of sample list');
      t.equal(list[0],firstPhotoId,'first photo id');
    })
    .catch(e=>t.fail(e));
});

test('getPhotoBuffer sample length', t=>{
  t.plan(1);
  s3.getPhotoBuffer(bucketSpec,firstPhotoId)
    .then(buffer=>{
      t.equal(buffer.length,firstPhotoSize,'first photo size')
    });
});


test('read image from disk',t=>{
  const buffer=fs.readFileSync('Z/image.jpg');
  t.equal(buffer.length,32764);
  t.end();
});
