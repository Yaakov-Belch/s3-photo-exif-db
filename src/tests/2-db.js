import test from 'blue-tape';
import {openDb, clearDb, addPhoto, closeDb} from '../database.js';

const dbSpec= {
  url:'mongodb://localhost:27017/test',
};

test('connect to database', async t=>{
  const db=await openDb(dbSpec);
  await clearDb(db);
  await addPhoto(db,{hello:'world'},'id1');
  await closeDb(db);
});
