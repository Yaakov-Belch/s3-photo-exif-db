const parserFactory=require('exif-parser');

const trafo= (data,id,bucketSpec)=>data.tags;

const extract= (buffer) => parserFactory.create(buffer).parse();

module.exports={extract, trafo};
 
