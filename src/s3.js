import Promise from 'bluebird';
import URL     from 'url';
import fetch   from 'node-fetch';
import {parseString} from 'xml2js';

// xml2data(string) returns a promise of a jsObject.
const xml2data=Promise.promisify(parseString);

const bucketUrl=(bucketSpec)=>URL.format({
  protocol:'https',
  host:bucketSpec.endPoint,
  pathname:bucketSpec.bucket
});
const photoUrl=(bucketSpec,id)=>URL.format({
  protocol:'https',
  host:bucketSpec.endPoint,
  pathname:`${bucketSpec.bucket}/${id}`
});

export const getPhotoIdList=async (bucketSpec,logger)=>{
  const url=bucketUrl(bucketSpec);
  logger && logger('getPhotoIdList',bucketSpec,url);

  const conn=await fetch(url);
  const text=await conn.text();
  const data=await xml2data(text);
  const list=data.ListBucketResult.Contents;
  return list.map(d=>d.Key[0]);
};

export const getPhotoBuffer=async (bucketSpec,id,logger)=>{
  const url=photoUrl(bucketSpec,id);
  logger && logger('getPhotoBuffer',{id,url});

  const conn=await fetch(url);
  return await conn.buffer();
};

