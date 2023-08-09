import { compact, isArray, sumBy, uniq } from "lodash"

import { NON_EXISTANT_ID } from "@/utils/constants"

import AddressType from "@/models/address-type"
import Application from "@/models/application"
import CsfaAmounts from "@/models/csfa-amount"
import FundingRequest from "@/models/funding-request"
import FundingSource from "@/models/funding-source"
import Institution from "@/models/institution"
import Person from "@/models/person"
import PersonAddress from "@/models/person-address"

export default class ApplicationsSerializer {
  #applications: Application[] = []
  #application: Application = {} as Application

  constructor(applicationOrApplications: Application[] | Application) {
    if (isArray(applicationOrApplications)) {
      this.#applications = applicationOrApplications || ([] as Application[])
    } else {
      this.#application = applicationOrApplications || ({} as Application)
    }
  }

  asListView() {
    return this.#applications.map((application) => {
      return {
        id: application.id,
        studentId: application.studentId,
        academicYearId: application.academicYearId,
        updatedAt: application.updatedAt,
        submittedAt: application.onlineSubmitDate,
        isActive: true,
        status: "Submitted",
        // TODO: these don't exist on the Application model, so need to be created here
        description: "TODO",
        createdAt: null,
      }
    })
  }

  // FUTURE: this should accept multiple "view" options
  // with custom views moved to their own serializer
  // e.g. 'PORTAL_STUDENT_VIEW' vs. default application view
  // Its also might be a good idea to move most of this logic to the front-end
  // and simply serve up the sanitized model data here instead
  asDetailedView() {
    return {
      termsAgree: true,
      programDetails: this.#programDetailsSection(this.#application),
      fundingSources: this.#fundingRequestsAssocation(
        this.#application.fundingRequests || ([] as FundingRequest[])
      ),
      personalDetails: this.#personAssociation(
        this.#application.student?.person || ({} as Person),
        this.#application.categoryId
      ),
      addresses: this.#addressessAssociation(
        this.#application.primaryAddressId || NON_EXISTANT_ID,
        this.#application.student?.person?.addresses || ([] as PersonAddress[])
      ),
      statistical: this.#statisticalSection(this.#application.student?.person || ({} as Person)),
    }
  }

  #programDetailsSection(application: Application) {
    return {
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

  #fundingRequestsAssocation(fundingRequests: FundingRequest[]) {
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

  #addressessAssociation(primaryAddressId: number, addresses: PersonAddress[]) {
    const primaryAddress =
      addresses.find((address) => address.id === primaryAddressId) ||
      addresses.find((address) => address.addressTypeId === AddressType.Types.HOME) ||
      addresses.find((address) => address.addressTypeId === AddressType.Types.SCHOOL) ||
      ({ id: NON_EXISTANT_ID } as PersonAddress)

    const nonPrimaryAddresses = addresses.filter((address) => address.id !== primaryAddress.id)
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

  #statisticalSection(person: Person) {
    // TODO: replace with real data
    return {
      language: person.language?.description,
      gender: person.sex?.description,
      disability: "Permanent",
      maritalStatus: 1,
      citizenship: person.citizenshipCode,
    }
  }
}
