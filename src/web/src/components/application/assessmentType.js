import CSLFT from "@/components/application/csfa-needs-assessment/CSLFT";
import CSGTP from "@/components/application/assessments/views/CSGTP";
import CSGD from "@/components/application/assessments/views/CSGD";
import CSGFTDEP from "@/components/application/assessments/views/CSGFTDEP";
import CSGFT from "@/components/application/assessments/views/CSGFT";
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
    7: { component: CSGTP, props: {} }, // Canadian Army Scholarship
    9: { component: CSGTP, props: {} }, // Nicholas John Harach Scholarship
    10: { component: CSGTP, props: {} }, // Yukon Art Society Scholarship
    11: { component: CSGTP, props: {} }, // Yukon Huskys CB Radio Club Scholarship
    28: { component: CSGTP, props: {} }, // Grant for Mature Learners Top-Up
    29: { component: CSGD, props: {year_to_compare: 2017, } }, // Grant for Students with Permanent Disabilities
    32: { component: CSGFTDEP, props: { year_to_compare: 2017 } }, // Grant for Students with Dependents FT
    35: { component: CSGFT, props: { request_type_id: 4 } }, // Grant for Full-time Students
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

        if ( message !== "OK") {
            emiter?.$emit("showError", message || "Error to  check");
        }
        return assessmentComponent.component;

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