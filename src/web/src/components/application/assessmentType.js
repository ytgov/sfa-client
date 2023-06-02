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
    1: TrainingAllowance, // Student Training Allowance
    2: YukonGrant, // Yukon Grant
    3: YukonExcellenceAwards, // Yukon Excellence Awards
    4: CSLFT, // Canada Student Loan Full-Time
    5: CSLPT, // Canada Student Loan Part-Time
    7: CSGTP, // Canadian Army Scholarship
    9: CSGTP, // Nicholas John Harach Scholarship
    10: CSGTP, // Yukon Art Society Scholarship
    11: CSGTP, // Yukon Huskys CB Radio Club Scholarship
    28 : CSGTP, // Grant for Mature Learners Top-Up
    29: CSGD, // Grant for Students with Permanent Disabilities
    30: CSGDSE, // Grant for Services & Equipment for PD Students
    31: CSGPT, // Grant for Part-time Studies
    32: CSGFTDEP, // Grant for Students with Dependents FT
    33: CSGPTDEP, // Grant for Students with Dependents PT
    35: CSGFT, // Grant for Full-time Students
};
export const assessmentType = (id) => {
    return assessmentComponentList?.[id] || null;
};