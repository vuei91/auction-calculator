import { formatNumber, getNumericValue } from './formatters'

export const calculateAcquisitionTax = (bidPrice, acquisitionHouseCount, setAcquisitionTax) => {
  const bidPriceValue = getNumericValue(bidPrice)
  
  if (bidPriceValue === 0) {
    alert('낙찰금액을 먼저 입력해주세요.')
    return
  }

  let taxRate = 0
  let localTaxRate = 0
  let description = ''

  if (acquisitionHouseCount === '1') {
    if (bidPriceValue <= 600000000) {
      taxRate = 0.01
      localTaxRate = 0.001
      description = '1주택, 6억 이하'
    } else if (bidPriceValue <= 900000000) {
      taxRate = 0.02
      localTaxRate = 0.002
      description = '1주택, 6억 초과~9억 이하 (비례계산)'
    } else {
      taxRate = 0.03
      localTaxRate = 0.003
      description = '1주택, 9억 초과'
    }
  } else if (acquisitionHouseCount === '2-normal') {
    taxRate = 0.02
    localTaxRate = 0.002
    description = '2주택 (비조정지역)'
  } else if (acquisitionHouseCount === '2-regulated') {
    taxRate = 0.08
    localTaxRate = 0.008
    description = '2주택 (조정지역)'
  } else {
    taxRate = 0.12
    localTaxRate = 0.012
    description = '3주택 이상'
  }

  const baseTax = Math.round(bidPriceValue * taxRate)
  const localTax = Math.round(bidPriceValue * localTaxRate)
  const totalTax = baseTax + localTax

  setAcquisitionTax(totalTax)

  alert(`취득세가 자동 계산되었습니다.\n\n낙찰금액: ${formatNumber(bidPriceValue)}원\n${description}\n기본 세율: ${(taxRate * 100)}%\n지방교육세/농특세: ${(localTaxRate * 100)}%\n\n기본 취득세: ${formatNumber(baseTax)}원\n지방교육세/농특세: ${formatNumber(localTax)}원\n총 취득세: ${formatNumber(totalTax)}원\n\n※ 실제 세율은 주택 수, 지역, 면적 등에 따라 달라질 수 있습니다.\n※ 조정대상지역: 서울 전역, 경기 12곳 등 (2026.02 기준)`)
}

export const calculateLoanInterest = (bidPrice, loanRatio, loanRate, holdingPeriod, setLoanInterest) => {
  const bidPriceValue = getNumericValue(bidPrice)
  const loanRatioValue = getNumericValue(loanRatio)
  const loanRateValue = getNumericValue(loanRate)
  const holdingPeriodValue = getNumericValue(holdingPeriod)
  
  if (bidPriceValue === 0) {
    alert('낙찰금액을 먼저 입력해주세요.')
    return
  }

  if (loanRatioValue < 0 || loanRatioValue > 90) {
    alert('대출 비율은 0~90% 범위로 설정해주세요.')
    return
  }

  if (loanRateValue < 4 || loanRateValue > 10) {
    alert('대출 금리는 4~10% 범위로 설정해주세요.')
    return
  }

  if (holdingPeriodValue < 1) {
    alert('보유 예상 기간을 입력해주세요.')
    return
  }

  const loanAmount = bidPriceValue * (loanRatioValue / 100)
  const interest = Math.round(loanAmount * (loanRateValue / 100) * (holdingPeriodValue / 12))

  setLoanInterest(interest)

  alert(`대출이자가 자동 계산되었습니다.\n\n낙찰금액: ${formatNumber(bidPriceValue)}원\n대출비율: ${loanRatioValue}%\n대출금액: ${formatNumber(loanAmount)}원\n연이율: ${loanRateValue}%\n보유기간: ${holdingPeriodValue}개월\n\n총 이자: ${formatNumber(interest)}원`)
}

export const calculateEarlyRepaymentFee = (bidPrice, loanRatio, earlyRepaymentRate, setEarlyRepaymentFee) => {
  const bidPriceValue = getNumericValue(bidPrice)
  const loanRatioValue = getNumericValue(loanRatio)
  const earlyRepaymentRateValue = getNumericValue(earlyRepaymentRate)
  
  if (bidPriceValue === 0) {
    alert('낙찰금액을 먼저 입력해주세요.')
    return
  }

  const loanAmount = bidPriceValue * (loanRatioValue / 100)
  const fee = Math.round(loanAmount * (earlyRepaymentRateValue / 100))

  setEarlyRepaymentFee(fee)

  alert(`대출중도상환 수수료가 자동 계산되었습니다.\n\n낙찰금액: ${formatNumber(bidPriceValue)}원\n대출비율: ${loanRatioValue}%\n대출금액: ${formatNumber(loanAmount)}원\n수수료율: ${earlyRepaymentRateValue}%\n\n중도상환 수수료: ${formatNumber(fee)}원`)
}

export const calculateGuaranteeInsurance = (publicPrice, setGuaranteeInsurance) => {
  const publicPriceValue = getNumericValue(publicPrice)
  
  if (publicPriceValue === 0) {
    alert('공시가격을 먼저 입력해주세요.')
    return
  }

  const insurance = Math.round(publicPriceValue * 1.26)
  setGuaranteeInsurance(insurance)

  alert(`보증보험료가 자동 계산되었습니다.\n\n공시가격: ${formatNumber(publicPriceValue)}원\n계산식: 공시가격 × 1.26\n\n보증보험료: ${formatNumber(insurance)}원`)
}

export const calculatePropertyTax = (publicPrice, setPropertyTax) => {
  const publicPriceValue = getNumericValue(publicPrice)
  
  if (publicPriceValue === 0) {
    alert('공시가격을 먼저 입력해주세요.')
    return
  }

  const taxBase = Math.round(publicPriceValue * 0.6)
  
  let tax = 0
  let taxRate = 0

  if (taxBase <= 60000000) {
    tax = taxBase * 0.001
    taxRate = 0.1
  } else if (taxBase <= 150000000) {
    tax = 60000 + (taxBase - 60000000) * 0.0015
    taxRate = 0.15
  } else if (taxBase <= 300000000) {
    tax = 195000 + (taxBase - 150000000) * 0.0025
    taxRate = 0.25
  } else {
    tax = 570000 + (taxBase - 300000000) * 0.004
    taxRate = 0.4
  }

  const educationTax = Math.round(tax * 0.2)
  const totalTax = Math.round(tax + educationTax)

  setPropertyTax(totalTax)

  alert(`재산세가 자동 계산되었습니다.\n\n공시가격: ${formatNumber(publicPriceValue)}원\n과세표준(60%): ${formatNumber(taxBase)}원\n최고세율: ${taxRate}%\n\n재산세: ${formatNumber(Math.round(tax))}원\n지방교육세(20%): ${formatNumber(educationTax)}원\n총 재산세: ${formatNumber(totalTax)}원\n\n※ 재산세는 연 2회(7월, 9월) 분할 납부됩니다.`)
}

export const calculateComprehensiveRealEstateTax = (publicPrice, houseCount, setComprehensiveRealEstateTax) => {
  const publicPriceValue = getNumericValue(publicPrice)
  
  if (publicPriceValue === 0) {
    alert('공시가격을 먼저 입력해주세요.')
    return
  }

  let deduction = 0
  if (houseCount === '1') {
    deduction = 1200000000
  } else if (houseCount === '2') {
    deduction = 900000000
  } else {
    deduction = 600000000
  }

  const taxBase = Math.max(0, (publicPriceValue - deduction) * 0.6)

  if (taxBase === 0) {
    alert('공시가격이 공제금액 이하로 종부세가 발생하지 않습니다.')
    setComprehensiveRealEstateTax(0)
    return
  }

  let tax = 0
  let taxRate = 0

  if (houseCount === '1') {
    if (taxBase <= 300000000) {
      tax = taxBase * 0.005
      taxRate = 0.5
    } else if (taxBase <= 600000000) {
      tax = 1500000 + (taxBase - 300000000) * 0.007
      taxRate = 0.7
    } else if (taxBase <= 1200000000) {
      tax = 3600000 + (taxBase - 600000000) * 0.01
      taxRate = 1.0
    } else if (taxBase <= 5000000000) {
      tax = 9600000 + (taxBase - 1200000000) * 0.014
      taxRate = 1.4
    } else if (taxBase <= 9400000000) {
      tax = 62800000 + (taxBase - 5000000000) * 0.02
      taxRate = 2.0
    } else {
      tax = 150800000 + (taxBase - 9400000000) * 0.027
      taxRate = 2.7
    }
  } else {
    if (taxBase <= 300000000) {
      tax = taxBase * 0.006
      taxRate = 0.6
    } else if (taxBase <= 600000000) {
      tax = 1800000 + (taxBase - 300000000) * 0.009
      taxRate = 0.9
    } else if (taxBase <= 1200000000) {
      tax = 4500000 + (taxBase - 600000000) * 0.013
      taxRate = 1.3
    } else if (taxBase <= 5000000000) {
      tax = 12300000 + (taxBase - 1200000000) * 0.02
      taxRate = 2.0
    } else if (taxBase <= 9400000000) {
      tax = 88300000 + (taxBase - 5000000000) * 0.03
      taxRate = 3.0
    } else {
      tax = 220300000 + (taxBase - 9400000000) * 0.05
      taxRate = 5.0
    }
  }

  const propertyTaxValue = Math.round(tax)
  setComprehensiveRealEstateTax(propertyTaxValue)

  alert(`종합부동산세가 자동 계산되었습니다.\n\n공시가격: ${formatNumber(publicPriceValue)}원\n주택 수: ${houseCount}주택\n공제금액: ${formatNumber(deduction)}원\n과세표준: ${formatNumber(taxBase)}원\n최고세율: ${taxRate}%\n\n종부세: ${formatNumber(propertyTaxValue)}원\n\n※ 실제 세액은 공정시장가액비율, 세부담 상한 등에 따라 달라질 수 있습니다.`)
}

export const calculateOwnershipTransferFee = (monthlyManagementFee, holdingPeriod, setOwnershipTransferFee) => {
  const monthlyFeeValue = getNumericValue(monthlyManagementFee)
  const holdingPeriodValue = getNumericValue(holdingPeriod)
  
  if (monthlyFeeValue === 0) {
    alert('월 관리비를 먼저 입력해주세요.')
    return
  }

  if (holdingPeriodValue === 0) {
    alert('보유 예상 기간을 먼저 입력해주세요.')
    return
  }

  const totalFee = Math.round(monthlyFeeValue * holdingPeriodValue)
  setOwnershipTransferFee(totalFee)

  alert(`소유권이후 관리비가 자동 계산되었습니다.\n\n월 관리비: ${formatNumber(monthlyFeeValue)}원\n보유기간: ${holdingPeriodValue}개월\n\n총 관리비: ${formatNumber(totalFee)}원`)
}

export const calculateCapitalGainsTax = (
  bidPrice, 
  salePrice, 
  holdingPeriod, 
  houseType,
  acquisitionTax,
  legalFee,
  brokerageFee,
  setCapitalGainsTax,
  setLocalIncomeTax,
  setTaxableIncome
) => {
  const bidPriceValue = getNumericValue(bidPrice)
  const salePriceValue = getNumericValue(salePrice)
  const holdingPeriodValue = getNumericValue(holdingPeriod)
  const acquisitionTaxValue = getNumericValue(acquisitionTax)
  const legalFeeValue = getNumericValue(legalFee)
  const brokerageFeeValue = getNumericValue(brokerageFee)
  
  if (bidPriceValue === 0 || salePriceValue === 0) {
    alert('낙찰금액과 판매예상금액을 먼저 입력해주세요.')
    return
  }

  // 필요경비: 취득가액 + 취득세 + 법무비 + 중개수수료
  const necessaryExpenses = bidPriceValue + acquisitionTaxValue + legalFeeValue + brokerageFeeValue
  
  // 양도차익 = 양도가액 - 필요경비
  const profit = salePriceValue - necessaryExpenses
  
  // 과세표준 = 양도차익 - 기본공제(250만원)
  const basicDeduction = 2500000
  const taxableIncomeValue = Math.max(0, profit - basicDeduction)

  if (profit <= 0) {
    alert('수익이 없어 양도소득세가 발생하지 않습니다.')
    setCapitalGainsTax(0)
    setLocalIncomeTax(0)
    setTaxableIncome(0)
    return
  }

  const holdingYears = holdingPeriodValue / 12

  let taxRate = 0
  let description = ''
  let calculationMethod = ''

  if (houseType === 'business') {
    if (taxableIncomeValue <= 14000000) {
      taxRate = 0.06
      description = '매매사업자 (과세표준 1,400만원 이하)'
    } else if (taxableIncomeValue <= 50000000) {
      taxRate = 0.15
      description = '매매사업자 (과세표준 5,000만원 이하)'
    } else if (taxableIncomeValue <= 88000000) {
      taxRate = 0.24
      description = '매매사업자 (과세표준 8,800만원 이하)'
    } else if (taxableIncomeValue <= 150000000) {
      taxRate = 0.35
      description = '매매사업자 (과세표준 1억 5천만원 이하)'
    } else if (taxableIncomeValue <= 300000000) {
      taxRate = 0.38
      description = '매매사업자 (과세표준 3억 이하)'
    } else if (taxableIncomeValue <= 500000000) {
      taxRate = 0.40
      description = '매매사업자 (과세표준 5억 이하)'
    } else if (taxableIncomeValue <= 1000000000) {
      taxRate = 0.42
      description = '매매사업자 (과세표준 10억 이하)'
    } else {
      taxRate = 0.45
      description = '매매사업자 (과세표준 10억 초과)'
    }
    calculationMethod = '기본세율(6~45%) 또는 비교과세 적용'
  } else {
    if (holdingYears < 1) {
      taxRate = 0.70
      description = '일반 개인, 보유 1년 미만 (중과세율)'
      calculationMethod = '단기 보유 중과세율 적용'
    } else if (holdingYears < 2) {
      taxRate = 0.60
      description = '일반 개인, 보유 1~2년 미만 (중과세율)'
      calculationMethod = '단기 보유 중과세율 적용'
    } else {
      if (taxableIncomeValue <= 14000000) {
        taxRate = 0.06
        description = '일반 개인, 보유 2년 이상 (과세표준 1,400만원 이하)'
      } else if (taxableIncomeValue <= 50000000) {
        taxRate = 0.15
        description = '일반 개인, 보유 2년 이상 (과세표준 5,000만원 이하)'
      } else if (taxableIncomeValue <= 88000000) {
        taxRate = 0.24
        description = '일반 개인, 보유 2년 이상 (과세표준 8,800만원 이하)'
      } else if (taxableIncomeValue <= 150000000) {
        taxRate = 0.35
        description = '일반 개인, 보유 2년 이상 (과세표준 1억 5천만원 이하)'
      } else if (taxableIncomeValue <= 300000000) {
        taxRate = 0.38
        description = '일반 개인, 보유 2년 이상 (과세표준 3억 이하)'
      } else if (taxableIncomeValue <= 500000000) {
        taxRate = 0.40
        description = '일반 개인, 보유 2년 이상 (과세표준 5억 이하)'
      } else if (taxableIncomeValue <= 1000000000) {
        taxRate = 0.42
        description = '일반 개인, 보유 2년 이상 (과세표준 10억 이하)'
      } else {
        taxRate = 0.45
        description = '일반 개인, 보유 2년 이상 (과세표준 10억 초과)'
      }
      calculationMethod = '1주택자 2년 이상 보유 시 기본세율 적용'
    }
  }

  const baseTax = Math.round(taxableIncomeValue * taxRate)
  const localTax = Math.round(baseTax * 0.1)
  const totalTax = baseTax + localTax

  setCapitalGainsTax(baseTax)
  setLocalIncomeTax(localTax)
  setTaxableIncome(taxableIncomeValue)

  alert(`양도소득세가 자동 계산되었습니다.\n\n양도가액: ${formatNumber(salePriceValue)}원\n필요경비: ${formatNumber(necessaryExpenses)}원\n  - 취득가액: ${formatNumber(bidPriceValue)}원\n  - 취득세: ${formatNumber(acquisitionTaxValue)}원\n  - 법무비: ${formatNumber(legalFeeValue)}원\n  - 중개수수료: ${formatNumber(brokerageFeeValue)}원\n\n양도차익: ${formatNumber(profit)}원\n기본공제: ${formatNumber(basicDeduction)}원\n과세표준: ${formatNumber(taxableIncomeValue)}원\n\n보유기간: ${holdingPeriodValue}개월 (${holdingYears.toFixed(1)}년)\n유형: ${houseType === 'business' ? '매매사업자' : '일반 개인'}\n${description}\n적용 세율: ${(taxRate * 100)}%\n\n양도소득세: ${formatNumber(baseTax)}원\n지방소득세(10%): ${formatNumber(localTax)}원\n총 세액: ${formatNumber(totalTax)}원\n\n※ ${calculationMethod}\n※ 실제 세액은 장기보유특별공제 등에 따라 달라집니다.\n※ 조정대상지역 다주택자는 중과세율(+20~30%p) 적용 가능`)
}

export const calculateBrokerageFee = (salePrice, setBrokerageFee) => {
  const salePriceValue = getNumericValue(salePrice)
  
  if (salePriceValue === 0) {
    alert('판매예상금액을 먼저 입력해주세요.')
    return
  }

  let feeRate = 0
  let maxFee = 0
  let description = ''

  if (salePriceValue < 50000000) {
    feeRate = 0.006
    maxFee = 250000
    description = '5천만원 미만'
  } else if (salePriceValue < 200000000) {
    feeRate = 0.005
    maxFee = 800000
    description = '5천만원 이상 ~ 2억원 미만'
  } else if (salePriceValue < 900000000) {
    feeRate = 0.004
    maxFee = 0
    description = '2억원 이상 ~ 9억원 미만'
  } else if (salePriceValue < 1200000000) {
    feeRate = 0.005
    maxFee = 0
    description = '9억원 이상 ~ 12억원 미만'
  } else if (salePriceValue < 1500000000) {
    feeRate = 0.006
    maxFee = 0
    description = '12억원 이상 ~ 15억원 미만'
  } else {
    feeRate = 0.007
    maxFee = 0
    description = '15억원 이상'
  }

  let brokerageFeeValue = Math.round(salePriceValue * feeRate)

  if (maxFee > 0 && brokerageFeeValue > maxFee) {
    brokerageFeeValue = maxFee
  }

  const vat = Math.round(brokerageFeeValue * 0.1)
  const totalFee = brokerageFeeValue + vat

  setBrokerageFee(totalFee)

  let alertMessage = `중개수수료가 자동 계산되었습니다.\n\n`
  alertMessage += `판매금액: ${formatNumber(salePriceValue)}원\n`
  alertMessage += `${description}\n`
  alertMessage += `상한 요율: ${(feeRate * 100)}%\n`
  if (maxFee > 0) {
    alertMessage += `한도액: ${formatNumber(maxFee)}원\n`
  }
  alertMessage += `\n중개보수: ${formatNumber(brokerageFeeValue)}원\n`
  alertMessage += `부가가치세(10%): ${formatNumber(vat)}원\n`
  alertMessage += `총 수수료: ${formatNumber(totalFee)}원\n\n`
  alertMessage += `※ 실제 수수료는 상한요율 이내에서 중개사와 협의하여 결정됩니다.\n`
  alertMessage += `※ 서울특별시 주택중개보수 등에 관한 조례 (2021.12.30 시행)`

  alert(alertMessage)
}
