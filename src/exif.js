const parserFactory=require('exif-parser');

export const extractExif= (buffer) => parserFactory.create(buffer).parse();

export const trafoExif= (data,id,bucketSpec)=>data.tags;

module.exports={extractExif, trafoExif};
 
