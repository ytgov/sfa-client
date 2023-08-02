import db from '@/db/db-client';

afterAll(() => db.destroy())

test('database client connect correctly', async () => {
  const application = await db("sfa.application").where({ id: 250 }).first();
  expect(application).not.toBe(null);
});
