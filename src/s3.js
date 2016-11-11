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

export const getPhotoIdList=(bucketSpec,logger)=>{
  const url=bucketUrl(bucketSpec);
  logger && logger('getPhotoIdList',bucketSpec,url);

  return fetch(url)
    .then(r=>r.text())
    .then(xml2data)
    .then(r=>r.ListBucketResult.Contents)
    .then(r=>r.map(d=>d.Key[0]));
};

export const getPhotoBuffer=(bucketSpec,id,logger)=>{
  const url=photoUrl(bucketSpec,id);
  logger && logger('getPhotoBuffer',{id,url});

  return fetch(url)
    .then(r=>r.buffer());
};

