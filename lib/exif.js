const parserFactory=require('exif-parser');

const trafo= (data)=>data.tags;

const extract=(buffer)=>
  trafo(parserFactory.create(buffer).parse());

module.exports={extract,trafo};
 
