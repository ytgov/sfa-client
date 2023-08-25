import Person from "@/models/person"
import Relationship from "@/models/relationship"

export default class StudentPerson {
  id: number
  studentId: number
  // I think it would make more sense to have personId as a required field, but matching the database for now
  personId?: number
  relationshipId: number
  isActive: boolean
  person?: Person
  relationship?: Relationship

  constructor({
    id,
    studentId,
    personId,
    relationshipId,
    isActive,
    person,
  }: StudentPerson) {
    this.id = id
    this.studentId = studentId
    this.personId = personId
    this.relationshipId = relationshipId
    this.isActive = isActive
    this.person = person
  }

  static hasValidPerson(
    studentPerson: StudentPerson
  ): studentPerson is StudentPerson & { person: Person } {
    return studentPerson.person !== undefined
  }
}
