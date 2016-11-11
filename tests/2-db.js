const test = require('blue-tape');

const database=require('../lib/database.js');
const dbSpec= {
  url:'mongodb://localhost:27017/test',
};


test('connect to database',t=>{
  return database.newEmptyDb(dbSpec)
    .then(db=>database.addPhoto(db,{hello:'world'},'id1'))
    // .then(db=>database.addPhoto(db,{hello:'world'},'id1'))
    .then(db=>database.close(db));
});
