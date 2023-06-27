import CSLFT from "@/components/application/csfa-needs-assessment/CSLFT";
import CSLPT from "@/components/application/csfa-needs-assessment/CSLPT";
import CSGPTDEP from "@/components/application/csfa-needs-assessment/CSGPTDEP";
import CSGPT from "@/components/application/csfa-needs-assessment/CSGPT";
import CSGDSE from "@/components/application/csfa-needs-assessment/CSGDSE";
import CSGTP from "@/components/application/csfa-needs-assessment/CSGTP";
import CSGD from "@/components/application/csfa-needs-assessment/CSGD";
import CSGFTDEP from "@/components/application/csfa-needs-assessment/CSGFTDEP";
import CSGFT from "@/components/application/csfa-needs-assessment/CSGFT";
import CanadianArmyScholarship from "@/components/application/csfa-needs-assessment/CanadianArmyScholarship";
import TrainingAllowance from "@/components/application/csfa-needs-assessment/TrainingAllowance";
import YukonGrant from "@/components/application/csfa-needs-assessment/YukonGrant";
import YukonExcellenceAwards from "@/components/application/csfa-needs-assessment/YukonExcellenceAwards";

import axios from "axios";
import { APPLICATION_URL } from '../../urls';

//NOTES
// - status_id key (status_id: 6) is to know if will we use a function named
// sfa.check_deadline_fct to verify
// - the objects with year_to_compare key is used to verify is send the component or not

const assessmentComponentList = {
    1: { component: TrainingAllowance, props: { status_id: 6, } }, // Student Training Allowance
    2: { component: YukonGrant, props: { status_id: 6, } }, // Yukon Grant
    3: { component: YukonExcellenceAwards, props: {} }, // Yukon Excellence Awards
    4: { component: CSLFT, props: { status_id: 40, request_type_id: 4 } }, // Canada Student Loan Full-Time
    5: { component: CSLPT, props: { year_to_compare: 2018, }}, // Canada Student Loan Part-Time
    7: { component: CSGTP, props: {} }, // Canadian Army Scholarship
    9: { component: CSGTP, props: {} }, // Nicholas John Harach Scholarship
    10: { component: CSGTP, props: {} }, // Yukon Art Society Scholarship
    11: { component: CSGTP, props: {} }, // Yukon Huskys CB Radio Club Scholarship
    28: { component: CSGTP, props: {} }, // Grant for Mature Learners Top-Up
    29: { component: CSGD, props: {year_to_compare: 2017, } }, // Grant for Students with Permanent Disabilities
    30: { component: CSGDSE, props: {} }, // Grant for Services & Equipment for PD Students
    31: { component: CSGPT, props: { year_to_compare: 2018 } }, // Grant for Part-time Studies
    32: { component: CSGFTDEP, props: { year_to_compare: 2017 } }, // Grant for Students with Dependents FT
    33: { component: CSGPTDEP, props: { year_to_compare: 2018 } }, // Grant for Students with Dependents PT
    35: { component: CSGFT, props: {} }, // Grant for Full-time Students
};

const deadlineCheck = async (applicationId, requestTypeId) => {
    try {
        const res = await axios.get(APPLICATION_URL+`/${applicationId}/request-type/${requestTypeId}/deadline-check`);

        const message = res?.data?.messages[0];

        return message?.text || "Error to check";

    } catch (error) {
        return "Error to  check" ;
    }
}

export const assessmentType = async (requestTypeid, applicationId, fundingRequestId, academicYear, emiter ) => {
    const assessmentComponent = assessmentComponentList?.[requestTypeid] || null;
    if (!assessmentComponent) {
        return null;
    }

    if ((requestTypeid === 1 || requestTypeid === 2) && assessmentComponent?.props?.status_id === 6) {
    
    const message = await deadlineCheck(applicationId, requestTypeid);

        if ( message === "OK") {
            emiter?.$emit("showSuccess", "OK");
            return assessmentComponent.component;
        } else {
            emiter?.$emit("showError", message || "Error to  check");
            return null;
        }

    }
    
    if (assessmentComponent?.props?.year_to_compare) {
        const academicYearToCompare = assessmentComponent.props.year_to_compare;

        if (academicYear >= academicYearToCompare) {
            emiter?.$emit("showSuccess", "academic year verified!");
            return assessmentComponent.component;
        } else {
            emiter?.$emit("showError", message || "academic year must be less than " + academicYearToCompare);
            return null;
        }
    }

    return assessmentComponent.component;
};

export const assessmentTypeWithProps = (id) => {
    const assessmentComponent = assessmentComponentList?.[id];
    return assessmentComponent || null;
};