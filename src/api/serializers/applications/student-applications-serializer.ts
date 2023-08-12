import { compact, isArray, isEmpty, isNil, last, sortBy, sumBy, uniq } from "lodash"

import { NON_EXISTANT_ID } from "@/utils/constants"

import AddressType from "@/models/address-type"
import AgencyAssistance from "@/models/agency-assistance"
import Application from "@/models/application"
import CsfaAmounts from "@/models/csfa-amount"
import Disability from "@/models/disability"
import FundingPurpose from "@/models/funding-purpose"
import FundingRequest from "@/models/funding-request"
import FundingSource from "@/models/funding-source"
import Institution from "@/models/institution"
import Person from "@/models/person"
import PersonAddress from "@/models/person-address"
import Residence from "@/models/residence"
import Student from "@/models/student"
import StudentConsent from "@/models/student-consent"

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
}
