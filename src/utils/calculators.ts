import {
  PROGRESSIVE_TAX_BRACKETS,
  type AcquisitionHouseCount,
  type AcquisitionTaxResult,
  type PublicPriceHouseCount,
  type PropertyTaxResult,
  type ComprehensiveRealEstateTaxResult,
  type BrokerageFeeResult,
  type HouseType,
  type CapitalGainsTaxResult,
  type AllCosts,
  type TotalResult,
} from '../types'

/**
 * 누진세율 계산 (8구간, 구간별 초과분에 해당 세율 적용 합산)
 * 기존 코드는 단일 세율을 전체 금액에 적용했으나, 실제 세법은 구간별 초과분 합산 방식
 */
export const calculateProgressiveTax = (taxableIncome: number): number => {
  let remainingIncome = taxableIncome
  let totalTax = 0
  let prevLimit = 0

  for (const bracket of PROGRESSIVE_TAX_BRACKETS) {
    const taxableInBracket = Math.min(remainingIncome, bracket.limit - prevLimit)
    if (taxableInBracket <= 0) break
    totalTax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
    prevLimit = bracket.limit
  }

  return Math.round(totalTax)
}


/**
 * 취득세 계산 (순수 함수)
 * 변경점: setState를 받지 않고 결과 객체를 반환
 */
export const calculateAcquisitionTax = (
  bidPrice: number,
  houseCount: AcquisitionHouseCount
): AcquisitionTaxResult => {
  let taxRate = 0
  let localTaxRate = 0
  let description = ''

  if (houseCount === '1') {
    if (bidPrice <= 600_000_000) {
      taxRate = 0.01
      localTaxRate = 0.001
      description = '1주택, 6억 이하'
    } else if (bidPrice <= 900_000_000) {
      taxRate = 0.02
      localTaxRate = 0.002
      description = '1주택, 6억 초과~9억 이하'
    } else {
      taxRate = 0.03
      localTaxRate = 0.003
      description = '1주택, 9억 초과'
    }
  } else if (houseCount === '2-normal') {
    taxRate = 0.02
    localTaxRate = 0.002
    description = '2주택 (비조정지역)'
  } else if (houseCount === '2-regulated') {
    taxRate = 0.08
    localTaxRate = 0.008
    description = '2주택 (조정지역)'
  } else {
    taxRate = 0.12
    localTaxRate = 0.012
    description = '3주택 이상'
  }

  const baseTax = Math.round(bidPrice * taxRate)
  const localTax = Math.round(bidPrice * localTaxRate)
  const totalTax = baseTax + localTax

  return { baseTax, localTax, totalTax, taxRate, localTaxRate, description }
}


/**
 * 대출이자 계산 (순수 함수)
 * 공식: 낙찰금액 × 대출비율 × 금리 × (보유기간/12)
 */
export const calculateLoanInterest = (
  bidPrice: number,
  loanRatio: number,
  loanRate: number,
  holdingPeriod: number
): number => {
  const loanAmount = bidPrice * (loanRatio / 100)
  return Math.round(loanAmount * (loanRate / 100) * (holdingPeriod / 12))
}

/**
 * 중도상환수수료 계산 (순수 함수)
 * 공식: 낙찰금액 × 대출비율 × 수수료율
 */
export const calculateEarlyRepaymentFee = (
  bidPrice: number,
  loanRatio: number,
  earlyRepaymentRate: number
): number => {
  const loanAmount = bidPrice * (loanRatio / 100)
  return Math.round(loanAmount * (earlyRepaymentRate / 100))
}

/**
 * 소유권이후 관리비 계산 (순수 함수)
 * 공식: 월 관리비 × 보유기간
 */
export const calculateOwnershipTransferFee = (
  monthlyManagementFee: number,
  holdingPeriod: number
): number => {
  return Math.round(monthlyManagementFee * holdingPeriod)
}

/**
 * 보증보험료 계산 (순수 함수)
 * 공식: 공시가격 × 1.26
 */
export const calculateGuaranteeInsurance = (publicPrice: number): number => {
  return Math.round(publicPrice * 1.26)
}


/**
 * 재산세 계산 (순수 함수)
 * 과세표준 = 공시가격 × 60%, 4구간 누진세율, 지방교육세 20% 합산
 */
export const calculatePropertyTax = (publicPrice: number): PropertyTaxResult => {
  const taxBase = Math.round(publicPrice * 0.6)

  let tax = 0
  if (taxBase <= 60_000_000) {
    tax = taxBase * 0.001
  } else if (taxBase <= 150_000_000) {
    tax = 60_000 + (taxBase - 60_000_000) * 0.0015
  } else if (taxBase <= 300_000_000) {
    tax = 195_000 + (taxBase - 150_000_000) * 0.0025
  } else {
    tax = 570_000 + (taxBase - 300_000_000) * 0.004
  }

  const baseTax = Math.round(tax)
  const educationTax = Math.round(tax * 0.2)
  const totalTax = baseTax + educationTax

  return { taxBase, baseTax, educationTax, totalTax }
}


/**
 * 종합부동산세 계산 (순수 함수)
 * 주택 수별 공제금액 차등, 1주택/다주택 누진세율 적용
 */
export const calculateComprehensiveRealEstateTax = (
  publicPrice: number,
  houseCount: PublicPriceHouseCount
): ComprehensiveRealEstateTaxResult => {
  let deduction = 0
  if (houseCount === '1') {
    deduction = 1_200_000_000
  } else if (houseCount === '2') {
    deduction = 900_000_000
  } else {
    deduction = 600_000_000
  }

  const taxBase = Math.max(0, (publicPrice - deduction) * 0.6)

  if (taxBase === 0) {
    return { deduction, taxBase, tax: 0, isExempt: true }
  }

  let tax = 0
  if (houseCount === '1') {
    if (taxBase <= 300_000_000) {
      tax = taxBase * 0.005
    } else if (taxBase <= 600_000_000) {
      tax = 1_500_000 + (taxBase - 300_000_000) * 0.007
    } else if (taxBase <= 1_200_000_000) {
      tax = 3_600_000 + (taxBase - 600_000_000) * 0.01
    } else if (taxBase <= 5_000_000_000) {
      tax = 9_600_000 + (taxBase - 1_200_000_000) * 0.014
    } else if (taxBase <= 9_400_000_000) {
      tax = 62_800_000 + (taxBase - 5_000_000_000) * 0.02
    } else {
      tax = 150_800_000 + (taxBase - 9_400_000_000) * 0.027
    }
  } else {
    if (taxBase <= 300_000_000) {
      tax = taxBase * 0.006
    } else if (taxBase <= 600_000_000) {
      tax = 1_800_000 + (taxBase - 300_000_000) * 0.009
    } else if (taxBase <= 1_200_000_000) {
      tax = 4_500_000 + (taxBase - 600_000_000) * 0.013
    } else if (taxBase <= 5_000_000_000) {
      tax = 12_300_000 + (taxBase - 1_200_000_000) * 0.02
    } else if (taxBase <= 9_400_000_000) {
      tax = 88_300_000 + (taxBase - 5_000_000_000) * 0.03
    } else {
      tax = 220_300_000 + (taxBase - 9_400_000_000) * 0.05
    }
  }

  return { deduction, taxBase, tax: Math.round(tax), isExempt: false }
}


/**
 * 중개수수료 계산 (순수 함수)
 * 서울시 조례 기준 6구간 요율, 한도액 적용, VAT 10% 가산
 */
export const calculateBrokerageFee = (salePrice: number): BrokerageFeeResult => {
  let feeRate = 0
  let maxFee = 0

  if (salePrice < 50_000_000) {
    feeRate = 0.006
    maxFee = 250_000
  } else if (salePrice < 200_000_000) {
    feeRate = 0.005
    maxFee = 800_000
  } else if (salePrice < 900_000_000) {
    feeRate = 0.004
    maxFee = 0
  } else if (salePrice < 1_200_000_000) {
    feeRate = 0.005
    maxFee = 0
  } else if (salePrice < 1_500_000_000) {
    feeRate = 0.006
    maxFee = 0
  } else {
    feeRate = 0.007
    maxFee = 0
  }

  let baseFee = Math.round(salePrice * feeRate)
  if (maxFee > 0 && baseFee > maxFee) {
    baseFee = maxFee
  }

  const vat = Math.round(baseFee * 0.1)
  const totalFee = baseFee + vat

  return { baseFee, vat, totalFee, feeRate, maxFee }
}


/**
 * 양도소득세 계산 (순수 함수)
 * 변경점:
 * 1. setState를 받지 않고 결과 객체 반환
 * 2. 2년 이상 보유 시 & 매매사업자: 누진세율을 구간별 초과분 합산 방식으로 적용
 *    (기존 코드는 단일 세율을 전체 금액에 적용)
 */
export const calculateCapitalGainsTax = (
  bidPrice: number,
  salePrice: number,
  holdingPeriod: number,
  houseType: HouseType,
  acquisitionTax: number,
  legalFee: number,
  brokerageFee: number
): CapitalGainsTaxResult => {
  // 필요경비 = 취득가액 + 취득세 + 법무비 + 중개수수료
  const necessaryExpenses = bidPrice + acquisitionTax + legalFee + brokerageFee

  // 양도차익 = 양도가액 - 필요경비
  const profit = salePrice - necessaryExpenses

  // 기본공제 250만원
  const basicDeduction = 2_500_000
  const taxableIncome = Math.max(0, profit - basicDeduction)

  if (profit <= 0) {
    return {
      necessaryExpenses,
      profit,
      taxableIncome: 0,
      capitalGainsTax: 0,
      localIncomeTax: 0,
      totalTax: 0,
      taxRate: 0,
      description: '수익 없음',
    }
  }

  const holdingYears = holdingPeriod / 12
  let capitalGainsTax = 0
  let taxRate = 0
  let description = ''

  if (houseType === 'business') {
    // 매매사업자: 누진세율 적용 (구간별 초과분 합산)
    capitalGainsTax = calculateProgressiveTax(taxableIncome)
    taxRate = taxableIncome > 0 ? capitalGainsTax / taxableIncome : 0
    description = '매매사업자 (누진세율 6~45%)'
  } else {
    // 일반 개인
    if (holdingYears < 1) {
      taxRate = 0.70
      capitalGainsTax = Math.round(taxableIncome * taxRate)
      description = '일반 개인, 보유 1년 미만 (중과세율 70%)'
    } else if (holdingYears < 2) {
      taxRate = 0.60
      capitalGainsTax = Math.round(taxableIncome * taxRate)
      description = '일반 개인, 보유 1~2년 미만 (중과세율 60%)'
    } else {
      // 2년 이상: 누진세율 적용 (구간별 초과분 합산)
      capitalGainsTax = calculateProgressiveTax(taxableIncome)
      taxRate = taxableIncome > 0 ? capitalGainsTax / taxableIncome : 0
      description = '일반 개인, 보유 2년 이상 (누진세율 6~45%)'
    }
  }

  const localIncomeTax = Math.round(capitalGainsTax * 0.1)
  const totalTax = capitalGainsTax + localIncomeTax

  return {
    necessaryExpenses,
    profit,
    taxableIncome,
    capitalGainsTax,
    localIncomeTax,
    totalTax,
    taxRate,
    description,
  }
}


/**
 * 최종 결과 계산 (순수 함수) — 신규 추가
 * 기존 코드에서는 App 컴포넌트 내 인라인으로 계산했으나, 순수 함수로 분리
 */
export const calculateTotalResult = (
  bidPrice: number,
  salePrice: number,
  loanRatio: number,
  costs: AllCosts
): TotalResult => {
  const totalCost =
    costs.acquisitionTax +
    costs.auctionFee +
    costs.legalFee +
    costs.unpaidFee +
    costs.interiorCost +
    costs.moveInCleaning +
    costs.ownershipTransferFee +
    costs.evictionCost +
    costs.loanInterest +
    costs.earlyRepaymentFee +
    costs.managementFee +
    costs.guaranteeInsurance +
    costs.propertyTax +
    costs.comprehensiveRealEstateTax +
    costs.capitalGainsTax +
    costs.localIncomeTax +
    costs.brokerageFee

  const totalInvestment = bidPrice + totalCost
  const netProfit = salePrice - totalInvestment
  const profitRate =
    totalInvestment > 0
      ? parseFloat(((netProfit / totalInvestment) * 100).toFixed(2))
      : 0
  const marketGain = salePrice - bidPrice
  const loanAmount = Math.round(bidPrice * (loanRatio / 100))
  const cashInvestment =
    bidPrice - loanAmount + totalCost - costs.capitalGainsTax - costs.localIncomeTax

  return {
    totalCost,
    totalInvestment,
    netProfit,
    profitRate,
    marketGain,
    loanAmount,
    cashInvestment,
  }
}
