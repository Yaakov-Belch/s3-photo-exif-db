'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trafoExif = exports.extractExif = undefined;

var _exifParser = require('exif-parser');

var _exifParser2 = _interopRequireDefault(_exifParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractExif = exports.extractExif = function extractExif(buffer) {
  return _exifParser2.default.create(buffer).parse();
};

var trafoExif = exports.trafoExif = function trafoExif(data, id, bucketSpec) {
  return data.tags;
};

module.exports = { extractExif: extractExif, trafoExif: trafoExif };