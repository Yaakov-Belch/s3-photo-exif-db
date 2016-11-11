import exifParser from 'exif-parser';

export const extractExif= (buffer) =>
  exifParser.create(buffer).parse();

export const trafoExif= (exif,bucketSpec)=>
  exif.tags;

export const buffer2Exif=(buffer,bucketSpec)=>
  trafoExif(extractExif(buffer),bucketSpec);

 
