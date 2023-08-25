import db from "@/db/db-client"

export default class StudentApplicationParentDependentsService {
  #applicationId: number

  constructor({ applicationId }: { applicationId: number }) {
    this.#applicationId = applicationId
  }

  async getParentDependents() {
    const parentDependentRows = await db
      .select({
        t1Id: "parentDependent.id",
        t1ApplicationId: "parentDependent.applicationId",
        t1RelationshipId: "parentDependent.relationshipId",
        t1FirstName: "parentDependent.firstName",
        t1LastName: "parentDependent.lastName",
        t1BirthDate: "parentDependent.birthDate",
        t1Age: "parentDependent.age",
        t1IsResiding: "parentDependent.isResiding",
        t1IsSharedCustody: "parentDependent.isSharedCustody",
        t1IsAttendPostSecondary: "parentDependent.isAttendPostSecondary",
        t1Comments: "parentDependent.comments",
        t1IsEligible: "parentDependent.isEligible",
        t1IsDisabled: "parentDependent.isDisabled",
        t1Conversion: "parentDependent.conversion",
        t2Id: "relationship.id",
        t2Description: "relationship.description",
        t2IsActive: "relationship.isActive",
      })
      .from("parentDependent")
      .leftJoin("relationship", "relationship.id", "=", "parentDependent.relationshipId")
      .where({ applicationId: this.#applicationId })

    const parentDependents = parentDependentRows.map((row) => ({
      id: row.t1Id,
      applicationId: row.t1ApplicationId,
      relationshipId: row.t1RelationshipId,
      firstName: row.t1FirstName,
      lastName: row.t1LastName,
      birthDate: row.t1BirthDate,
      age: row.t1Age,
      isResiding: row.t1IsResiding,
      isSharedCustody: row.t1IsSharedCustody,
      isAttendPostSecondary: row.t1IsAttendPostSecondary,
      comments: row.t1Comments,
      isEligible: row.t1IsEligible,
      isDisabled: row.t1IsDisabled,
      conversion: row.t1Conversion,
      relationship: {
        id: row.t2Id,
        description: row.t2Description,
        isActive: row.t2IsActive,
      },
    }))

    return parentDependents
  }
}
