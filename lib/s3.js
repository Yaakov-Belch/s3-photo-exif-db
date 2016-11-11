'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhotoBuffer = exports.getPhotoIdList = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// xml2data(string) returns a promise of a jsObject.
var xml2data = _bluebird2.default.promisify(_xml2js.parseString);

var bucketUrl = function bucketUrl(bucketSpec) {
  return _url2.default.format({
    protocol: 'https',
    host: bucketSpec.endPoint,
    pathname: bucketSpec.bucket
  });
};
var photoUrl = function photoUrl(bucketSpec, id) {
  return _url2.default.format({
    protocol: 'https',
    host: bucketSpec.endPoint,
    pathname: bucketSpec.bucket + '/' + id
  });
};

var getPhotoIdList = exports.getPhotoIdList = function getPhotoIdList(bucketSpec, logger) {
  var url = bucketUrl(bucketSpec);
  logger && logger('getPhotoIdList', bucketSpec, url);

  return (0, _nodeFetch2.default)(url).then(function (r) {
    return r.text();
  }).then(xml2data).then(function (r) {
    return r.ListBucketResult.Contents;
  }).then(function (r) {
    return r.map(function (d) {
      return d.Key[0];
    });
  });
};

var getPhotoBuffer = exports.getPhotoBuffer = function getPhotoBuffer(bucketSpec, id, logger) {
  var url = photoUrl(bucketSpec, id);
  logger && logger('getPhotoBuffer', { id: id, url: url });

  return (0, _nodeFetch2.default)(url).then(function (r) {
    return r.buffer();
  });
};