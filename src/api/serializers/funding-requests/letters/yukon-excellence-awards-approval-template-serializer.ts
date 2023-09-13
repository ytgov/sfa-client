import { isArray, isEmpty, isNil, sortBy } from "lodash";

import Application from "@/models/application";
import FundingRequest from "@/models/funding-request";
import Person from "@/models/person";
import PersonAddress from "@/models/person-address";
import User from "@/models/user";
import AddressType from "@/models/address-type";

export default class YukonExcellenceAwardsApprovalTemplateSerializer {
  #fundingRequest: FundingRequest;
  #signingOfficer: User;

  constructor({ fundingRequest, signingOfficer }: { fundingRequest: FundingRequest; signingOfficer: User }) {
    this.#fundingRequest = fundingRequest;
    this.#signingOfficer = signingOfficer;
  }

  static prepare({ fundingRequest, signingOfficer }: { fundingRequest: FundingRequest; signingOfficer: User }) {
    const serializer = new YukonExcellenceAwardsApprovalTemplateSerializer({
      fundingRequest,
      signingOfficer,
    });
    return serializer.prepare();
  }

  prepare() {
    const application = this.#fundingRequest.application;
    if (application === undefined)
      throw new Error("Could not prepare template data as application is missing from funding request.");

    const person = application?.student?.person;
    if (person === undefined) throw new Error("Could not prepare template data as person is missing from student.");
    if (isNil(person.firstName))
      throw new Error("Could not prepare template data as firstName is missing from person.");
    if (isNil(person.lastName)) throw new Error("Could not prepare template data as lastName is missing from person.");

    const primaryAddress = this.#preparePrimaryAddress(application, person);
    if (isNil(primaryAddress.address1))
      throw new Error("Could not prepare template data as address1 is missing from primaryAddress.");
    if (isNil(primaryAddress.postalCode))
      throw new Error("Could not prepare template data as postalCode is missing from primaryAddress.");

    const city = primaryAddress.city;
    if (city === undefined) throw new Error("Could not prepare template data as city is missing from primary address.");

    const province = primaryAddress.province;
    if (province === undefined)
      throw new Error("Could not prepare template data as province is missing from primary address.");

    const country = primaryAddress.country;
    if (country === undefined)
      throw new Error("Could not prepare template data as country is missing from primary address.");

    const studyArea = application.studyArea;
    if (studyArea === undefined)
      throw new Error("Could not prepare template data as study area is missing from application.");

    const serializedDisbursements = this.#prepareDisbursements(this.#fundingRequest);

    return {
      currentDate: new Date(),
      recipient: {
        firstName: person.firstName,
        initials: person.initials,
        lastName: person.lastName,
        address1: primaryAddress.address1,
        address2: primaryAddress.address2,
        city: city.description,
        province: province.description,
        country: country.description,
        postalCode: primaryAddress.postalCode,
      },
      amountInCents: serializedDisbursements.reduce((t, d) => {
        return t + d.amountInCents;
      }, 0),
      remainingInCents: this.#fundingRequest.yeaRemaining,
      studentFinancialAssistanceOfficer: this.#signingOfficer,
    };
  }

  // CONSIDER: Generalizing this function, as it used in several serializers.
  // It might even work as model method?
  #preparePrimaryAddress(application: Application, person: Person): PersonAddress {
    let primaryAddress = application?.primaryAddress;

    if (primaryAddress === undefined) {
      const personAddresses = person.personAddresses;
      if (personAddresses === undefined || (isArray(personAddresses) && personAddresses.length === 0)) {
        throw new Error(
          "Could not prepare template data as application primaryAddress is missing and person has no addresses."
        );
      }

      const firstChoice = personAddresses?.find((address) => address.addressTypeId === AddressType.Types.MAILING);
      const secondChoice = personAddresses?.find((address) => address.addressTypeId === AddressType.Types.HOME);
      const thirdChoice = personAddresses?.find((address) => address.addressTypeId === AddressType.Types.SCHOOL);
      const fourthChoice = personAddresses?.find((address) => address.addressTypeId === AddressType.Types.PARENT);
      const fifthChoice = personAddresses[0];

      primaryAddress = firstChoice || secondChoice || thirdChoice || fourthChoice || fifthChoice;
    }

    return primaryAddress;
  }

  #prepareDisbursements(fundingRequest: FundingRequest) {
    const disbursements = fundingRequest.disbursements;
    if (isNil(disbursements) || isEmpty(disbursements)) return [];

    return disbursements.map((disbursement) => {
      if (disbursement.disbursedAmount === undefined)
        throw new Error("Could not prepare template data as disbursement disbursed amount is missing.");

      return {
        amountInCents: disbursement.disbursedAmount * 100,
        releaseDate: disbursement.issueDate,
      };
    });
  }
}
