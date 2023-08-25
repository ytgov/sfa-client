import { compact, isArray, isEmpty, isNil, last, sortBy, sumBy, uniq } from "lodash"

import { NON_EXISTANT_ID } from "@/utils/constants"

import AddressType from "@/models/address-type"
import AgencyAssistance from "@/models/agency-assistance"
import Application from "@/models/application"
import CsfaAmounts from "@/models/csfa-amount"
import Dependent from "@/models/dependent"
import Disability from "@/models/disability"
import Expense from "@/models/expense"
import FundingPurpose from "@/models/funding-purpose"
import FundingRequest from "@/models/funding-request"
import FundingSource from "@/models/funding-source"
import Income from "@/models/income"
import Institution from "@/models/institution"
import ParentDependent from "@/models/parent-dependent"
import Person from "@/models/person"
import PersonAddress from "@/models/person-address"
import Relationship from "@/models/relationship"
import Residence from "@/models/residence"
import Student from "@/models/student"
import StudentConsent from "@/models/student-consent"
import StudentPerson from "@/models/student-person"

export default class StudentApplicationsSerializer {
  #applications: Application[] = []
  #application: Application = {} as Application

  constructor(applicationOrApplications: Application[] | Application) {
    if (isArray(applicationOrApplications)) {
      this.#applications = applicationOrApplications || ([] as Application[])
    } else {
      this.#application = applicationOrApplications || ({} as Application)
    }
  }

  asDetailedView() {
    return {
      termsAgree: true,
      programDetails: this.#programDetailsSection(this.#application),
      fundingSources: this.#fundingSourcesSection(
        this.#application.fundingRequests || ([] as FundingRequest[])
      ),
      fundingRequests: this.#fundingRequestsAssocation(
        this.#application.fundingRequests || ([] as FundingRequest[])
      ),
      personalDetails: this.#personAssociation(
        this.#application.student?.person || ({} as Person),
        this.#application.categoryId
      ),
      addresses: this.#personAddressessAssociation(
        this.#application.primaryAddressId || NON_EXISTANT_ID,
        this.#application.student?.person?.personAddresses || ([] as PersonAddress[])
      ),
      statistical: this.#statisticalSection(
        this.#application,
        this.#application.student || ({} as Student),
        this.#application.student?.person || ({} as Person)
      ),
      consent: this.#consentSection(
        this.#application.student?.studentConsents || ([] as StudentConsent[])
      ),
      residency: this.#residencySection(
        this.#application,
        this.#application.student?.residences || ([] as Residence[])
      ),
      education: this.#educationAssociation(this.#application.student || ({} as Student)),
      otherFunding: this.#otherFundingSection(
        this.#application.agencyAssistances || ([] as AgencyAssistance[])
      ),
      studentDependants: this.#studentDependantsSection(
        this.#application.student?.dependents || ([] as Dependent[])
      ),
      csfaAccommodation: this.#csfaAccomodationSection(this.#application),
      csfaIncome: this.#csfaIncomeSection(this.#application.incomes || ([] as Income[])),
      csfaExpenses: this.#csfaExpensesSection(this.#application.expenses || ([] as Expense[])),
      parents: this.#parentsSection(
        this.#application?.student?.studentPersons || ([] as StudentPerson[])
      ),
      parentDependents: this.#parentDependentsSection(this.#application.parentDependents || ([] as ParentDependent[])),
    }
  }

  #programDetailsSection(application: Application) {
    return {
      attendanceId: application.attendanceId,
      attendance: application.attendance?.description,
      durationOfProgram: application.programYearTotal, // duplicate of programDuration
      endDateOfClasses: application.classesEndDate,
      institution: this.#institutionAssociation(
        this.#application.institution || ({} as Institution)
      ),
      institutionId: application.institutionCampusId,
      program: application.programId,
      programDuration: application.programYearTotal, // duplicate of durationOfProgram
      programName: application.program?.description,
      startDate: application.classesStartDate, // duplicate of startDateOfClasses
      startDateOfClasses: application.classesStartDate, // duplicate of startDate
      studyArea: application.studyAreaId,
      yearEntering: application.programYear,
    }
  }

  #institutionAssociation(institution: Institution) {
    return {
      id: institution.id,
      name: institution.name,
    }
  }

  #fundingSourcesSection(fundingRequests: FundingRequest[]) {
    const sources = uniq(
      compact(fundingRequests.map((fundingRequest) => fundingRequest.requestType?.description))
    )

    const hasCsfaRequestAmount = fundingRequests.some(
      (fundingRequest) => fundingRequest.cslRequestAmount
    )
    const isCslFullAmount = fundingRequests.some((fundingRequest) => fundingRequest.isCslFullAmount)
    const isCsfa = sources.includes(FundingSource.CANADA_STUDENT_FINANCIAL_ASSISTANCE_FULL_TIME)

    let csfaAmounts = null
    let csfaLoanAmount = 0
    if (isCsfa && isCslFullAmount) {
      csfaAmounts = CsfaAmounts.FULL_AMOUNT_LOANS_AND_GRANTS
    } else if (isCsfa && hasCsfaRequestAmount) {
      csfaAmounts = CsfaAmounts.GRANTS_AND_LOANS_UP_TO
      csfaLoanAmount = sumBy(fundingRequests, (r) => r.cslRequestAmount || 0)
    } else {
      csfaAmounts = CsfaAmounts.GRANTS_ONLY
    }

    return {
      sources,
      csfaLoanAmount,
      csfaAmounts,
    }
  }

  #fundingRequestsAssocation(fundingRequests: FundingRequest[]) {
    return fundingRequests
  }

  #personAssociation(person: Person, categoryId?: number) {
    return {
      firstName: person?.firstName,
      middleName: person?.initials,
      lastName: person?.lastName,
      homeEmail: person?.email,
      homePhone: person?.telephone,
      birthDate: person?.birthDate,
      sin: person?.sin,
      category: categoryId,
    }
  }

  #personAddressessAssociation(primaryAddressId: number, personAddresses: PersonAddress[]) {
    const primaryAddress =
      personAddresses.find((address) => address.id === primaryAddressId) ||
      personAddresses.find((address) => address.addressTypeId === AddressType.Types.HOME) ||
      personAddresses.find((address) => address.addressTypeId === AddressType.Types.SCHOOL) ||
      ({ id: NON_EXISTANT_ID } as PersonAddress)

    const nonPrimaryAddresses = personAddresses.filter(
      (address) => address.id !== primaryAddress.id
    )
    const secondaryAddress =
      nonPrimaryAddresses.find((address) => address.addressTypeId === AddressType.Types.HOME) ||
      nonPrimaryAddresses.find((address) => address.addressTypeId === AddressType.Types.SCHOOL) ||
      ({ id: NON_EXISTANT_ID } as PersonAddress)

    return {
      homeAddress1: {
        first: primaryAddress.address1,
        city: primaryAddress.cityId,
        region: primaryAddress.provinceId,
        postal: primaryAddress.postalCode,
      },
      homeAddress2: {
        first: secondaryAddress.address1,
        city: secondaryAddress.cityId,
        region: secondaryAddress.provinceId,
        postal: secondaryAddress.postalCode,
      },
      primary: primaryAddress.addressTypeId === AddressType.Types.HOME ? "Permanent" : "School",
      homeAddress1Id: primaryAddress.id,
      homeAddress2Id: secondaryAddress.id,
    }
  }

  #statisticalSection(application: Application, student: Student, person: Person) {
    return {
      language: person.language?.description,
      gender: person.sex?.description,
      // citizenship data is duplicated across person and application tables
      citizenship: person.citizenshipCode || application.citizenshipStatus,
      firstNation: application.firstNationId,
      aboriginalStatus: application.aboriginalStatusId,
      maritalStatus: application.maritalStatusId,
      disability: this.#disabilityStatus(application),
      visibleMinority: application.isMinority,
      crownWard: student.isCrownWard,
    }
  }

  #disabilityStatus(application: Application) {
    if (application.isDisabled === false) {
      return Disability.Types.NONE
    } else if (application.isPermDisabled === true) {
      return Disability.Types.PERMANENT
    } else {
      return Disability.Types.OTHER
    }
  }

  #consentSection(studentConsents: StudentConsent[]) {
    const relevantConsents = studentConsents.filter(
      (consent) => consent.consentSfa === true && consent.consentCsl === true
    )

    const consents = relevantConsents.map((consent) => ({ person: consent.consentPerson }))

    const allowOthers = !isEmpty(relevantConsents)

    return { consents, allowOthers }
  }

  #residencySection(application: Application, residences: Residence[]) {
    const sortedResidences = sortBy(residences, [
      (residence) => `${residence.fromYear}/${residence.fromMonth}`,
      (residence) => `${residence.toYear}/${residence.toMonth}`,
    ])

    const residencyHistory = sortedResidences.map((residence) => ({
      start: `${residence.fromYear}/${residence.fromMonth}`,
      end: `${residence.toYear}/${residence.toMonth}`,
      city: residence.cityId,
      province: residence.provinceId,
      country: residence.countryId,
      inSchool: residence.inSchool,
    }))

    const lastResidency = last(sortedResidences)

    let hasTraveled = false
    let lastReturnDate = null
    if (lastResidency !== undefined) {
      hasTraveled = true
      lastReturnDate = `${lastResidency.toYear}/${lastResidency.toMonth}`
    }

    return {
      residencyHistory,
      hasTraveled,
      lastReturnDate,
    }
  }

  // FUTURE: this will probably pull from the education table at some point?
  #educationAssociation(student: Student) {
    const educationHistory = []

    if (
      !isNil(student.highSchoolId) &&
      !isNil(student.highSchoolLeftYear) &&
      !isNil(student.highSchoolLeftMonth)
    ) {
      educationHistory.push({
        leftHighSchool: `${student.highSchoolLeftYear}/${student.highSchoolLeftMonth}`,
        school: student.highSchoolId,
      })
    } else {
      educationHistory.push({})
    }

    return {
      educationHistory,
    }
  }

  #otherFundingSection(agencyAssistances: AgencyAssistance[]) {
    const otherFundings = agencyAssistances.map((agencyAssistance) => {
      const purposes = []
      if (agencyAssistance.isTuition) {
        purposes.push(FundingPurpose.TUITION)
      }

      if (agencyAssistance.isLivingExpenses) {
        purposes.push(FundingPurpose.LIVING_EXPENSES)
      }

      if (agencyAssistance.isBooks) {
        purposes.push(FundingPurpose.BOOKS)
      }

      if (agencyAssistance.isTransportation) {
        purposes.push(FundingPurpose.TRANSPORTATION)
      }

      return {
        agency: agencyAssistance.agencyId,
        amount: agencyAssistance.amount,
        other: agencyAssistance.otherPurpose,
        comments: agencyAssistance.agencyComment,
        purposes,
      }
    })

    return {
      hasFunding: !isEmpty(otherFundings),
      otherFundings,
    }
  }

  #studentDependantsSection(dependents: Dependent[]) {
    const serializedDependents = dependents.map((dependent) => {
      const dependentEligibilities = dependent.dependentEligibilities || []

      const isSharesCustody = dependentEligibilities.some(
        (dependentEligibility) => dependentEligibility.isSharesCustody
      )
      const residesWithStudent = dependentEligibilities.some(
        (dependentEligibility) => dependentEligibility.residesWithStudent
      )
      const isPostSecondary = dependentEligibilities.some(
        (dependentEligibility) => dependentEligibility.isPostSecondary
      )

      const custodyDetails = dependentEligibilities
        .map((dependentEligibility) => dependentEligibility.sharesCustodyDetails)
        .join(", ")

      return {
        id: dependent.id,
        firstName: dependent.firstName,
        lastName: dependent.lastName,
        dob: dependent.birthDate,
        relationshipId: dependent.relationshipId,
        comments: dependent.comments,
        relationship: dependent.relationship,
        sharedCustody: isSharesCustody,
        residesWith: residesWithStudent,
        inPostSecondary: isPostSecondary,
        custodyDetails,
      }
    })

    return {
      hasDependants: !isEmpty(serializedDependents),
      dependants: serializedDependents,
    }
  }

  #csfaAccomodationSection(application: Application) {
    const accommodations = []
    if (!isNil(application.prestudyAccomCode)) {
      accommodations.push({
        living: application.prestudyAccomCode,
        ownHome: application.prestudyOwnHome,
        rentToParents: application.prestudyBoardAmount,
        cityId: application.prestudyCityId,
        city: application.prestudyCityId,
        provinceId: application.prestudyProvinceId,
        province: application.prestudyProvinceId,
        busService: application.prestudyBus,
        distanceFromSchool: application.prestudyDistance, // NOTE: spelling updated from distinct_from_school used in front-end
      })
    }

    if (!isNil(application.studyAccomCode)) {
      accommodations.push({
        living: application.studyAccomCode,
        ownHome: application.studyOwnHome,
        rentToParents: application.studyBoardAmount,
        cityId: application.studyCityId,
        city: application.studyCityId,
        provinceId: application.studyProvinceId,
        province: application.studyProvinceId,
        busService: application.studyBus,
        distanceFromSchool: application.studyDistance, // NOTE: spelling updated from distinct_from_school used in front-end
      })
    }

    return {
      accommodations, // NOTE: spelling updated from accomodations (one m) used in front-end
    }
  }

  #csfaIncomeSection(incomes: Income[]) {
    const serializedIncomes = incomes.map((income) => ({
      type: income.incomeTypeId,
      incomeTypeId: income.incomeTypeId,
      comment: income.comment,
      amount: income.amount,
    }))

    return {
      hasIncome: !isEmpty(serializedIncomes),
      incomes: serializedIncomes,
    }
  }

  #csfaExpensesSection(expenses: Expense[]) {
    const serializedExpenses = expenses.map((expense) => ({
      type: expense.categoryId,
      expenseCategoryId: expense.categoryId,
      comment: expense.description,
      amount: expense.amount,
      required: expense.expenseCategory?.isRequired,
    }))

    return {
      expenses: serializedExpenses,
    }
  }

  #parentsSection(studentPersons: StudentPerson[]) {
    const studentPersonsWithParentRelationship = studentPersons
      .filter(
        (studentPerson) =>
          studentPerson.isActive &&
          studentPerson.relationship?.description === Relationship.Types.PARENT
      )
      // I don't know why .filter(studentPerson => studentPerson.person !== undefined) doesn't work on its own
      .filter(StudentPerson.hasValidPerson)

    const serializedParents = studentPersonsWithParentRelationship.map((studentPerson) => {
      const { person, relationshipId } = studentPerson
      return {
        firstName: person.firstName,
        lastName: person.lastName,
        sin: person.sin,
        relationship: relationshipId,
        relationshipId,
      }
    })

    return {
      parents: serializedParents,
    }
  }

  #parentDependentsSection(parentDependents: ParentDependent[]) {
    const serializedDependents = parentDependents.map((parentDependent) => ({
      firstName: parentDependent.firstName,
      lastName: parentDependent.lastName,
      dob: parentDependent.birthDate,
      relationshipId: parentDependent.relationshipId,
      relationship: parentDependent.relationship?.description,
      comments: parentDependent.comments
    }))

    return {
      hasDependents:!isEmpty(serializedDependents),
      dependents: serializedDependents,
    }
  }
}
