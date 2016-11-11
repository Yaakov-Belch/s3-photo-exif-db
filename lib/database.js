'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDb = exports.checkExif = exports.addExif = exports.clearDb = exports.openDb = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openDb = exports.openDb = function openDb(dbSpec) {
  return _mongodb2.default.MongoClient.connect(dbSpec.url);
};

var clearDb = exports.clearDb = function clearDb(db) {
  return db.collection('exif').remove({});
};

var addExif = exports.addExif = function addExif(db, id, exif) {
  return db.collection('exif').findOneAndUpdate({ _id: id }, { $setOnInsert: exif }, { new: true, upsert: true }).then(function (r) {
    return !r.value;
  });
}; // return promise of true if id was new.

var checkExif = exports.checkExif = function checkExif(db, id) {
  return db.collection('exif').find({ _id: id }).limit(1).count();
};

var closeDb = exports.closeDb = function closeDb(db) {
  return db.close();
};