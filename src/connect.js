import {getPhotoIdList, getPhotoBuffer} from './s3.js';
import {buffer2Exif} from './exif.js';

export const fetchExif= async (bucketSpec,id)=>
  buffer2Exif(await getPhotoBuffer(bucketSpec,id), bucketSpec);
