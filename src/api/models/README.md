# Models

Basic constraints:

1. Models should reflect database level data.
2. Models should use camelCase instead of whatever the database is using, because we are in JS land, and camelCase is the standard.
3. Model files should have one default export that matches the name of the database table in PascalCase.
4. Model relations should match the name of the database table when singular (in camelCase) and be the plural of the table name when they are an array.
5. When a model needs a constructor it should use the 2 interfaces, 1 class pattern as seen in [./user.ts](./user.ts)
   e.g. interface UserRecord, interface User extends UserRecord, class User

   In this case, the database table matches the UserRecord interface fields.
