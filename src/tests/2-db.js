import test from 'blue-tape';
import {openDb, clearDb, addExif, checkExif, closeDb}
  from '../database.js';

import {dbSpec} from '../zSamples';

test('clear/write/check in database', async t=>{
  t.plan(5);
  const db=await openDb(dbSpec);
  try {
    await clearDb(db);
    t.notOk(await checkExif(db, 'id1'),'cleared: no photo found');
    t.ok(await addExif(db,'id1',{hello:'world'}), 'add new photo');
    t.ok(await checkExif(db, 'id1'),'added: one photo found');
    t.notOk(await addExif(db,'id1',{hello:'world'}), 'photo already there');
    await clearDb(db);
    t.notOk(await checkExif(db, 'id1'),'cleared: no photo found');
  } finally {
    await closeDb(db);
  }
});
