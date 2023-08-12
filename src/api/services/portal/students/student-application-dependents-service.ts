import db from "@/db/db-client"

import Dependent from "@/models/dependent"

export default class StudentApplicationDependentsService {
  #studentId: number

  constructor({ studentId }: { studentId: number }) {
    this.#studentId = studentId
  }

  ////
  // Data format
  // dependents: [
  //   {
  //      id: 124
  //      ...
  //      relationship: {
  //        id: 112,
  //      }
  //    }
  // ]
  async getDependents(): Promise<Dependent[]> {
    return db
      .select({
        t1Id: "dependent.id",
        t1StudentId: "dependent.studentId",
        t1RelationshipId: "dependent.relationshipId",
        t1FirstName: "dependent.firstName",
        t1LastName: "dependent.lastName",
        t1Comments: "dependent.comments",
        t1BirthDate: "dependent.birthDate",
        t1IsInProgress: "dependent.isInProgress",
        t1IsConversion: "dependent.isConversion",
        t1IsDisability: "dependent.isDisability",
        t2Id: "relationship.id",
        t2Description: "relationship.description",
        t2IsActive: "relationship.isActive",
      })
      .from("dependent")
      .leftJoin("relationship", "relationship.id", "dependent.relationshipId")
      .where({ studentId: this.#studentId })
      .then((rows) =>
        rows.map((row) => ({
          id: row.t1Id,
          studentId: row.t1StudentId,
          relationshipId: row.t1RelationshipId,
          firstName: row.t1FirstName,
          lastName: row.t1LastName,
          comments: row.t1Comments,
          birthDate: row.t1BirthDate,
          isInProgress: row.t1IsInProgress,
          isConversion: row.t1IsConversion,
          isDisability: row.t1IsDisability,
          relationship: {
            id: row.t2Id,
            description: row.t2Description,
            isActive: row.t2IsActive,
          },
        }))
      )
  }
}
