export const SUBSIDY_CONFIG = {
  name: "고유가 피해지원금",
  year: 2026,
  status: "신청중" as const, // "심사중" | "확정" | "신청중" | "정비중" | "지급중" | "종료"
  totalBudget: "4조 8,000억 원",
  targetPopulation: "약 3,577만 명 (소득 하위 70%)",

  amounts: {
    metropolitan: 100000,
    nonMetropolitan: 150000,
    depopulationPreferred: 200000,
    depopulationSpecial: 250000,
  },

  vulnerableAmounts: {
    nextTier: {
      metropolitan: 450000,
      nonMetropolitan: 500000,
    },
    basicLivelihood: {
      metropolitan: 550000,
      nonMetropolitan: 600000,
    },
  },

  incomeThresholds: [
    { members: 1, insuranceEmployee: 130000, insuranceRegional: 80000, insuranceMixed: 0 },
    { members: 2, insuranceEmployee: 140000, insuranceRegional: 120000, insuranceMixed: 140000 },
    { members: 3, insuranceEmployee: 260000, insuranceRegional: 190000, insuranceMixed: 240000 },
    { members: 4, insuranceEmployee: 320000, insuranceRegional: 220000, insuranceMixed: 300000 },
    { members: 5, insuranceEmployee: 390000, insuranceRegional: 240000, insuranceMixed: 360000 },
    { members: 6, insuranceEmployee: 430000, insuranceRegional: 290000, insuranceMixed: 380000 },
    { members: 7, insuranceEmployee: 470000, insuranceRegional: 320000, insuranceMixed: 420000 },
    { members: 8, insuranceEmployee: 510000, insuranceRegional: 400000, insuranceMixed: 490000 },
    { members: 9, insuranceEmployee: 540000, insuranceRegional: 440000, insuranceMixed: 510000 },
    { members: 10, insuranceEmployee: 580000, insuranceRegional: 470000, insuranceMixed: 550000 },
  ],
} as const;

export type SubsidyStatus = "심사중" | "확정" | "신청중" | "정비중" | "지급중" | "종료";

export type RegionType = "수도권" | "비수도권" | "인구감소우대" | "인구감소특별";

export function getSubsidyAmount(regionType: RegionType): number {
  switch (regionType) {
    case "수도권":
      return SUBSIDY_CONFIG.amounts.metropolitan;
    case "비수도권":
      return SUBSIDY_CONFIG.amounts.nonMetropolitan;
    case "인구감소우대":
      return SUBSIDY_CONFIG.amounts.depopulationPreferred;
    case "인구감소특별":
      return SUBSIDY_CONFIG.amounts.depopulationSpecial;
  }
}

type EligibilityStatus = "eligible" | "ineligible" | "needsCheck";

interface EligibilityResult {
  status: EligibilityStatus;
  eligible: boolean;
  message: string;
}

export function checkEligibility(
  members: number,
  monthlyInsurance: number
): EligibilityResult {
  // 10인 이상은 10인 기준 적용
  const lookupMembers = members >= 10 ? 10 : members;

  const threshold = SUBSIDY_CONFIG.incomeThresholds.find(
    (t) => t.members === lookupMembers
  );
  if (!threshold) {
    return {
      status: "needsCheck",
      eligible: false,
      message: "해당 가구원 수 기준은 별도 확인이 필요합니다.",
    };
  }

  // 직장·지역·혼합 중 0이 아닌 값들로 lower/upper 산출
  const values = [
    threshold.insuranceEmployee,
    threshold.insuranceRegional,
    threshold.insuranceMixed,
  ].filter((v) => v > 0);

  if (values.length === 0) {
    return {
      status: "needsCheck",
      eligible: false,
      message: "해당 가구원 수 기준은 별도 확인이 필요합니다.",
    };
  }

  const lower = Math.min(...values);
  const upper = Math.max(...values);

  if (monthlyInsurance <= lower) {
    return {
      status: "eligible",
      eligible: true,
      message:
        "입력한 건강보험료 기준으로는 지원 대상 가능성이 있습니다. (자산 기준 추가 확인 필요)",
    };
  }

  if (monthlyInsurance <= upper) {
    return {
      status: "needsCheck",
      eligible: false,
      message:
        "가입자 유형(직장/지역/혼합)에 따라 대상 여부가 달라질 수 있습니다. 콜센터에 문의해 확인하세요.",
    };
  }

  return {
    status: "ineligible",
    eligible: false,
    message: "입력한 건강보험료가 기준을 초과할 가능성이 높습니다.",
  };
}
