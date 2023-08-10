import db from '@/db/db-client';

afterAll(() => db.destroy())

// TODO: set up migrations such
test('database client connect correctly', async () => {
  const application = await db("application").where({ id: 250 }).first();
  expect(application).not.toBe(null);
});
