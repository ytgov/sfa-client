import db from "@/db/db-client"

afterAll(() => db.destroy())

describe("db/db-client", () => {
  test("database client connect correctly", async () => {
    const application = await db("application").where({ id: 250 }).first()
    expect(application).not.toBe(null)
  })

  test("select query injects schema", () => {
    expect(db.select("id").from("user").toString()).toBe("select [id] from [sfa].[user]")
  })

  test("direct function usage injects schema", () => {
    expect(db("user").limit(10).toString()).toBe("select top (10) * from [sfa].[user]")
  })

  test("from usage injects schema", () => {
    expect(db.from("user").limit(10).toString()).toBe("select top (10) * from [sfa].[user]")
  })

  test("direct function usage with custom schema replaces schema", () => {
    expect(db("user").withSchema("dbo").limit(10).toString()).toBe(
      "select top (10) * from [dbo].[user]"
    )
  })

  test("direct custom schema usage replaces schema", () => {
    expect(db.withSchema("dbo").from("user").limit(10).toString()).toBe(
      "select top (10) * from [dbo].[user]"
    )
  })

  test("raw usage works correctly", () => {
    expect(db.raw("select top (10) * from [dbo].[user]").toString()).toBe(
      "select top (10) * from [dbo].[user]"
    )
  })

  test("migrate attribute returns a migrator instace", () => {
    expect(db.migrate).toHaveProperty("latest")
  })
})
