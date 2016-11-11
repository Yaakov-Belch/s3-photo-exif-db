'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhotoBuffer = exports.getPhotoIdList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var getPhotoIdList = exports.getPhotoIdList = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(bucketSpec, logger) {
    var url, conn, text, data, list;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = bucketUrl(bucketSpec);

            logger && logger('getPhotoIdList', bucketSpec, url);

            _context.next = 4;
            return (0, _nodeFetch2.default)(url);

          case 4:
            conn = _context.sent;
            _context.next = 7;
            return conn.text();

          case 7:
            text = _context.sent;
            _context.next = 10;
            return xml2data(text);

          case 10:
            data = _context.sent;
            list = data.ListBucketResult.Contents;
            return _context.abrupt('return', list.map(function (d) {
              return d.Key[0];
            }));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getPhotoIdList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getPhotoBuffer = exports.getPhotoBuffer = function () {
  var _ref2 = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee2(bucketSpec, id, logger) {
    var url, conn;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = photoUrl(bucketSpec, id);

            logger && logger('getPhotoBuffer', { id: id, url: url });

            _context2.next = 4;
            return (0, _nodeFetch2.default)(url);

          case 4:
            conn = _context2.sent;
            _context2.next = 7;
            return conn.buffer();

          case 7:
            return _context2.abrupt('return', _context2.sent);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getPhotoBuffer(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();