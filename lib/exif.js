'use strict';

var parserFactory = require('exif-parser');

var trafo = function trafo(data, id, bucketSpec) {
  return data.tags;
};

var extract = function extract(buffer) {
  return parserFactory.create(buffer).parse();
};

module.exports = { extract: extract, trafo: trafo };