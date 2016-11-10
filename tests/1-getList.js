const test = require('blue-tape');
const getPhotoList=require('../lib/getPhotoList.js');

const bucketUrl='http://s3.amazonaws.com/waldo-recruiting';
const firstId='hello';
const sampleLength=3;

test('getPhotoList sample from bucketUrl', t=>{
  t.plan(3);
  getPhotoList(bucketUrl)
    .then(list=>{
      t.ok(Array.isArray(list),'return an array of ids');
      t.equal(list[0],firstId,'first photo id');
      t.equal(list.length,sampleLength, 'length of sample list');
    })
    .catch(e=>t.fail(e));
});
