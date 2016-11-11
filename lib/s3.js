'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Promise = require('bluebird');
var URL = require('url');
var fetch = require('node-fetch');

// xml2js(string) returns a promise of a jsObject.
var xml2js = Promise.promisify(require('xml2js').parseString);

var bucketUrl = function bucketUrl(bucketSpec) {
  return URL.format({
    protocol: 'https',
    host: bucketSpec.endPoint,
    pathname: bucketSpec.bucket
  });
};
var photoUrl = function photoUrl(bucketSpec, id) {
  return URL.format({
    protocol: 'https',
    host: bucketSpec.endPoint,
    pathname: bucketSpec.bucket + '/' + id
  });
};

var getPhotoIdList = exports.getPhotoIdList = function getPhotoIdList(bucketSpec) {
  var url = bucketUrl(bucketSpec);
  return fetch(url).then(function (r) {
    return r.text();
  }).then(xml2js).then(function (r) {
    return r.ListBucketResult.Contents;
  }).then(function (r) {
    return r.map(function (d) {
      return d.Key[0];
    });
  });
};

var getPhotoBuffer = exports.getPhotoBuffer = function getPhotoBuffer(bucketSpec, id) {
  var url = photoUrl(bucketSpec, id);
  return fetch(url).then(function (r) {
    return r.buffer();
  });
};