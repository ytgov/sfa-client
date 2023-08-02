import db from '@/db/db-client';

test('database client connect correctly', () => {
  return db("sfa.application").where({ id: 250 }).first().then(application => {
    expect(application).not.toBe(null);
  })
});
