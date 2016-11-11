'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parserFactory = require('exif-parser');

var extractExif = exports.extractExif = function extractExif(buffer) {
  return parserFactory.create(buffer).parse();
};

var trafoExif = exports.trafoExif = function trafoExif(data, id, bucketSpec) {
  return data.tags;
};

module.exports = { extractExif: extractExif, trafoExif: trafoExif };