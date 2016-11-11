import test from 'blue-tape';
import {fetchExif} from '../connect.js';

import {
  bucketSpec, firstPhotoId, exifKey1, exifValue1

} from '../zSamples';

test('first photo: fetchExif', async t=>{
  t.plan(1);
  const exif=await fetchExif(bucketSpec,firstPhotoId);
  t.equal(exif[exifKey1], exifValue1, 'check fetchExif');
});
