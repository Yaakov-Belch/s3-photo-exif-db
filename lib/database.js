'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDb = exports.addPhoto = exports.newEmptyDb = exports.openDb = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var openDb = exports.openDb = function openDb(dbSpec) {
  return _mongodb2.default.MongoClient.connect(dbSpec.url);
};

var newEmptyDb = exports.newEmptyDb = function newEmptyDb(dbSpec) {
  return openDb(dbSpec).then(deleteAllPhotos);
};

var deleteAllPhotos = function deleteAllPhotos(db) {
  return db.collection('photos').remove({}).then(function () {
    return db;
  });
};

var addPhoto = exports.addPhoto = function addPhoto(db, data, id) {
  return db.collection('photos').insertOne((0, _assign2.default)({}, data, { _id: id })).then(function () {
    return db;
  });
};

var closeDb = exports.closeDb = function closeDb(db) {
  return db.close();
};