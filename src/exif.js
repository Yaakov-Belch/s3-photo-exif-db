import exifParser from 'exif-parser';

export const extractExif= (buffer) =>
  exifParser.create(buffer).parse();

export const trafoExif= (data,bucketSpec)=>
  data.tags;

export const buffer2Exif=(buffer,bucketSpec)=>
  trafoExif(extractExif(buffer),bucketSpec);

 
