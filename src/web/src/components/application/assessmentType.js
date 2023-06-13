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

const assessmentComponentList = {
    1: { component: TrainingAllowance, props: {} }, // Student Training Allowance
    2: { component: YukonGrant, props: {} }, // Yukon Grant
    3: { component: YukonExcellenceAwards, props: {} }, // Yukon Excellence Awards
    4: { component: CSLFT, props: { request_type_id: 4 } }, // Canada Student Loan Full-Time
    5: { component: CSLPT, props: {}}, // Canada Student Loan Part-Time
    7: { component: CSGTP, props: {} }, // Canadian Army Scholarship
    9: { component: CSGTP, props: {} }, // Nicholas John Harach Scholarship
    10: { component: CSGTP, props: {} }, // Yukon Art Society Scholarship
    11: { component: CSGTP, props: {} }, // Yukon Huskys CB Radio Club Scholarship
    28: { component: CSGTP, props: {} }, // Grant for Mature Learners Top-Up
    29: { component: CSGD, props: {} }, // Grant for Students with Permanent Disabilities
    30: { component: CSGDSE, props: {} }, // Grant for Services & Equipment for PD Students
    31: { component: CSGPT, props: {} }, // Grant for Part-time Studies
    32: { component: CSGFTDEP, props: {} }, // Grant for Students with Dependents FT
    33: { component: CSGPTDEP, props: {} }, // Grant for Students with Dependents PT
    35: { component: CSGFT, props: {} }, // Grant for Full-time Students
};
export const assessmentType = (id) => {
    const assessmentComponent = assessmentComponentList?.[id].component;
    return assessmentComponent || null;
};

export const assessmentTypeWithProps = (id) => {
    const assessmentComponent = assessmentComponentList?.[id];
    return assessmentComponent || null;
};