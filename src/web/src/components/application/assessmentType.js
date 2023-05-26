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
    4: CSLFT,
    5: CSLPT,
    32: CSGPTDEP,
    31: CSGPT,
    30: CSGDSE,
    28: CSGTP,
    0: CSGD,
    33: CSGFTDEP,
    35: CSGFT,
    7: CanadianArmyScholarship,
    1: TrainingAllowance,
    2: YukonGrant,
    3: YukonExcellenceAwards
};
export const assessmentType = (id) => {
    return assessmentComponentList?.[id] || null;
};