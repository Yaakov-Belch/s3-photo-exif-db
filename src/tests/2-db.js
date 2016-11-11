import test from 'blue-tape';
import {openDb, newEmptyDb, addPhoto, closeDb} from '../database.js';

const dbSpec= {
  url:'mongodb://localhost:27017/test',
};


test('connect to database',t=>{
  return newEmptyDb(dbSpec)
    .then(db=>addPhoto(db,{hello:'world'},'id1'))
    .then(db=>closeDb(db));
});
