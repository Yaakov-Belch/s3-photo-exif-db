
const Promise=require('bluebird');
const URL=require('url');
const fetch=require('node-fetch');

// xml2js(string) returns a promise of a js object:
const xml2js=Promise.promisify(require('xml2js').parseString);

const bucketUrl=(bucketSpec)=>URL.format({
  protocol:'https',
  host:bucketSpec.endPoint,
  pathname:bucketSpec.bucket
});

const getPhotoIdList=(bucketSpec)=>{
  const url=bucketUrl(bucketSpec);
  return fetch(url)
    .then(r=>r.text())
    .then(xml2js)
    .then(r=>r.ListBucketResult.Contents)
    .then(r=>r.map(d=>d.Key[0]));
};

module.exports={getPhotoIdList};
