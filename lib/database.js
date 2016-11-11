'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = require('bluebird');
var mongodb = require('mongodb');

var openDb = function openDb(dbSpec) {
  return mongodb.MongoClient.connect(dbSpec.url);
};

var newEmptyDb = function newEmptyDb(dbSpec) {
  return openDb(dbSpec).then(deleteAllPhotos);
};

var deleteAllPhotos = function deleteAllPhotos(db) {
  return db.collection('photos').remove({}).then(function () {
    return db;
  });
};

var addPhoto = function addPhoto(db, data, id) {
  return db.collection('photos').insertOne((0, _assign2.default)({}, data, { _id: id })).then(function () {
    return db;
  });
};

var close = function close(db) {
  return db.close();
};

module.exports = { openDb: openDb, newEmptyDb: newEmptyDb, addPhoto: addPhoto, close: close };