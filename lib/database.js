'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDb = exports.checkExif = exports.addExif = exports.clearDb = exports.openDb = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var addExif = exports.addExif = function () {
  var _ref = (0, _bluebird.coroutine)(_regenerator2.default.mark(function _callee(db, id, exif, logger) {
    var opts, c, r, added;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger && logger('addExif', { id: id, exif: exif });

            opts = { new: true, upsert: true };
            c = db.collection('exif');
            _context.next = 5;
            return c.findOneAndUpdate({ _id: id }, { $setOnInsert: exif }, opts);

          case 5:
            r = _context.sent;
            added = !r.value;

            logger && logger('addExif.added', { id: id, added: added });
            return _context.abrupt('return', added);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addExif(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var checkExif = exports.checkExif = function checkExif(db, id) {
  return db.collection('exif').find({ _id: id }).limit(1).count();
};

var closeDb = exports.closeDb = function closeDb(db) {
  return db.close();
};