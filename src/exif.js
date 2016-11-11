import exifParser from 'exif-parser';

export const extractExif= (buffer) => exifParser.create(buffer).parse();

export const trafoExif= (data,id,bucketSpec)=>data.tags;

module.exports={extractExif, trafoExif};
 
