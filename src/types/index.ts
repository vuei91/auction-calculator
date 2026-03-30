// 주택 수 타입 (취득세용)
export type AcquisitionHouseCount = '1' | '2-normal' | '2-regulated' | '3'

// 주택 수 타입 (종부세용)
export type PublicPriceHouseCount = '1' | '2' | '3'

// 주택 유형 (양도세용)
export type HouseType = 'individual' | 'business'

// 누진세율 구간
export interface TaxBracket {
  limit: number
  rate: number
}

// 취득세 계산 결과
export interface AcquisitionTaxResult {
  baseTax: number
  localTax: number
  totalTax: number
  taxRate: number
  localTaxRate: number
  description: string
}

// 재산세 계산 결과
export interface PropertyTaxResult {
  taxBase: number
  baseTax: number
  educationTax: number
  totalTax: number
}

// 종합부동산세 계산 결과
export interface ComprehensiveRealEstateTaxResult {
  deduction: number
  taxBase: number
  tax: number
  isExempt: boolean
}

// 중개수수료 계산 결과
export interface BrokerageFeeResult {
  baseFee: number
  vat: number
  totalFee: number
  feeRate: number
  maxFee: number
}

// 양도소득세 계산 결과
export interface CapitalGainsTaxResult {
  necessaryExpenses: number
  profit: number
  taxableIncome: number
  capitalGainsTax: number
  localIncomeTax: number
  totalTax: number
  taxRate: number
  description: string
}

// 전체 비용 항목
export interface AllCosts {
  acquisitionTax: number
  auctionFee: number
  legalFee: number
  unpaidFee: number
  interiorCost: number
  moveInCleaning: number
  ownershipTransferFee: number
  evictionCost: number
  loanInterest: number
  earlyRepaymentFee: number
  managementFee: number
  guaranteeInsurance: number
  propertyTax: number
  comprehensiveRealEstateTax: number
  capitalGainsTax: number
  localIncomeTax: number
  brokerageFee: number
}

// 최종 결과
export interface TotalResult {
  totalCost: number
  totalInvestment: number
  netProfit: number
  profitRate: number
  marketGain: number
  loanAmount: number
  cashInvestment: number
}

// 소득세 기본세율 (8구간 누진세율)
export const PROGRESSIVE_TAX_BRACKETS: TaxBracket[] = [
  { limit: 14_000_000, rate: 0.06 },
  { limit: 50_000_000, rate: 0.15 },
  { limit: 88_000_000, rate: 0.24 },
  { limit: 150_000_000, rate: 0.35 },
  { limit: 300_000_000, rate: 0.38 },
  { limit: 500_000_000, rate: 0.40 },
  { limit: 1_000_000_000, rate: 0.42 },
  { limit: Infinity, rate: 0.45 },
]
