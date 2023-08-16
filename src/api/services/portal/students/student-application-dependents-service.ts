import { groupBy } from "lodash"

import db from "@/db/db-client"

import Dependent from "@/models/dependent"

export default class StudentApplicationDependentsService {
  #studentId: number
  #applicationId?: number

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId
    this.#applicationId = applicationId
  }

  /*
  Data format

  dependents: [
    {
      id: 124,
      ...
      relationship: {
        id: 112,
        ...
      },
      dependentEligibilities: [
        {
          id: 243,
          dependentId: 124,
          ...
        }
      ]
    }
  ]
  */
  async getDependents(): Promise<Dependent[]> {
    if (this.#studentId === undefined) {
      throw new Error('studentId is required')
    }

    const rows = await db
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

    const dependents = rows.map((row) => ({
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

    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set")
    } else {
      await this.#injectDependentEligibilities(dependents, this.#applicationId)
    }

    return dependents
  }

  async #injectDependentEligibilities(dependents: Dependent[], applicationId: number) {
    const dependentIds = dependents.map((dependent) => dependent.id)
    const dependentEligibilityHash = await db("dependentEligibility")
      .where({ applicationId })
      .where("id", "in", dependentIds)
      .then((rows) => groupBy(rows, "dependentId"))

    dependents.forEach((dependent) => {
      const dependentId = dependent.id
      dependent.dependentEligibilities = dependentEligibilityHash[dependentId]
    })
  }
}
