export const SUBSIDY_CONFIG = {
  name: "고유가 피해지원금",
  year: 2026,
  status: "정비중" as const, // "심사중" | "확정" | "신청중" | "정비중" | "지급중" | "종료"
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
    {
      members: 1,
      monthlyIncome: 3850000,
      insuranceEmployee: 130000,
      insuranceRegional: 80000,
    },
    {
      members: 2,
      monthlyIncome: 6300000,
      insuranceEmployee: 140000,
      insuranceRegional: 120000,
    },
    {
      members: 3,
      monthlyIncome: 8040000,
      insuranceEmployee: 260000,
      insuranceRegional: 190000,
    },
    {
      members: 4,
      monthlyIncome: 9740000,
      insuranceEmployee: 320000,
      insuranceRegional: 220000,
    },
    {
      members: 5,
      monthlyIncome: 11200000,
      insuranceEmployee: 390000,
      insuranceRegional: 0,
    },
    {
      members: 6,
      monthlyIncome: 12700000,
      insuranceEmployee: 430000,
      insuranceRegional: 0,
    },
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
  if (members >= 5) {
    return {
      status: "needsCheck",
      eligible: false,
      message:
        "5인 이상 가구는 가입자 유형과 공식 기준 확인이 필요합니다. 콜센터 1670-2626 또는 건강보험공단 1577-1000으로 확인하세요.",
    };
  }

  const threshold = SUBSIDY_CONFIG.incomeThresholds.find(
    (t) => t.members === members
  );
  if (!threshold) {
    return {
      status: "needsCheck",
      eligible: false,
      message: "해당 가구원 수 기준은 별도 확인이 필요합니다.",
    };
  }

  const lower = Math.min(
    threshold.insuranceEmployee,
    threshold.insuranceRegional
  );
  const upper = Math.max(
    threshold.insuranceEmployee,
    threshold.insuranceRegional
  );

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
        "가입자 유형(직장/지역)에 따라 대상 여부가 달라질 수 있습니다. 콜센터에 문의해 확인하세요.",
    };
  }

  return {
    status: "ineligible",
    eligible: false,
    message: "입력한 건강보험료가 기준을 초과할 가능성이 높습니다.",
  };
}
