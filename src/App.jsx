import { useState } from 'react'
import './App.css'

function App() {
  const [bidPrice, setBidPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [acquisitionHouseCount, setAcquisitionHouseCount] = useState('1')
  const [acquisitionTax, setAcquisitionTax] = useState('')
  const [auctionFee, setAuctionFee] = useState(2800000)
  const [legalFee, setLegalFee] = useState(1000000)
  const [unpaidFee, setUnpaidFee] = useState('')
  const [interiorCost, setInteriorCost] = useState(10000000)
  const [movingCost, setMovingCost] = useState(3000000)
  const [holdingPeriod, setHoldingPeriod] = useState(24)
  const [loanRatio, setLoanRatio] = useState(65)
  const [loanRate, setLoanRate] = useState(4.5)
  const [loanInterest, setLoanInterest] = useState('')
  const [managementFee, setManagementFee] = useState('')
  const [guaranteeInsurance, setGuaranteeInsurance] = useState('')
  const [publicPrice, setPublicPrice] = useState('')
  const [houseCount, setHouseCount] = useState('1')
  const [propertyTax, setPropertyTax] = useState('')
  const [comprehensiveRealEstateTax, setComprehensiveRealEstateTax] = useState('')
  const [houseType, setHouseType] = useState('individual')
  const [capitalGainsTax, setCapitalGainsTax] = useState('')
  const [brokerageFee, setBrokerageFee] = useState('')

  const [result, setResult] = useState({
    totalInvestment: 0,
    totalCost: 0,
    totalSale: 0,
    netProfit: 0,
    profitRate: 0
  })

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleNumberInput = (value, setter, allowDecimal = false) => {
    if (value === '') {
      setter('')
      return
    }
    const numValue = allowDecimal ? parseFloat(value) : parseInt(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

  const getNumericValue = (value) => {
    return value === '' || value === null || value === undefined ? 0 : Number(value)
  }

  const calculateAcquisitionTax = () => {
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

  const calculateLoanInterest = () => {
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

    if (loanRateValue < 4 || loanRateValue > 5) {
      alert('대출 금리는 4~5% 범위로 설정해주세요.')
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

  const calculateGuaranteeInsurance = () => {
    const publicPriceValue = getNumericValue(publicPrice)
    
    if (publicPriceValue === 0) {
      alert('공시가격을 먼저 입력해주세요.')
      return
    }

    const insurance = Math.round(publicPriceValue * 1.26)
    setGuaranteeInsurance(insurance)

    alert(`보증보험료가 자동 계산되었습니다.\n\n공시가격: ${formatNumber(publicPriceValue)}원\n계산식: 공시가격 × 1.26\n\n보증보험료: ${formatNumber(insurance)}원`)
  }

  const calculatePropertyTax = () => {
    const publicPriceValue = getNumericValue(publicPrice)
    
    if (publicPriceValue === 0) {
      alert('공시가격을 먼저 입력해주세요.')
      return
    }

    // 재산세 과세표준 = 공시가격 × 60%
    const taxBase = Math.round(publicPriceValue * 0.6)
    
    let tax = 0
    let taxRate = 0

    // 주택 재산세 누진세율 적용
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

    // 지방교육세 (재산세의 20%)
    const educationTax = Math.round(tax * 0.2)
    const totalTax = Math.round(tax + educationTax)

    setPropertyTax(totalTax)

    alert(`재산세가 자동 계산되었습니다.\n\n공시가격: ${formatNumber(publicPriceValue)}원\n과세표준(60%): ${formatNumber(taxBase)}원\n최고세율: ${taxRate}%\n\n재산세: ${formatNumber(Math.round(tax))}원\n지방교육세(20%): ${formatNumber(educationTax)}원\n총 재산세: ${formatNumber(totalTax)}원\n\n※ 재산세는 연 2회(7월, 9월) 분할 납부됩니다.`)
  }

  const calculateComprehensiveRealEstateTax = () => {
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

  const calculateCapitalGainsTax = () => {
    const bidPriceValue = getNumericValue(bidPrice)
    const salePriceValue = getNumericValue(salePrice)
    const holdingPeriodValue = getNumericValue(holdingPeriod)
    
    if (bidPriceValue === 0 || salePriceValue === 0) {
      alert('낙찰금액과 판매예상금액을 먼저 입력해주세요.')
      return
    }

    const profit = salePriceValue - bidPriceValue

    if (profit <= 0) {
      alert('수익이 없어 양도소득세가 발생하지 않습니다.')
      setCapitalGainsTax(0)
      return
    }

    const holdingYears = holdingPeriodValue / 12

    let taxRate = 0
    let description = ''
    let calculationMethod = ''

    if (houseType === 'business') {
      if (profit <= 14000000) {
        taxRate = 0.06
        description = '매매사업자 (과세표준 1,400만원 이하)'
      } else if (profit <= 50000000) {
        taxRate = 0.15
        description = '매매사업자 (과세표준 5,000만원 이하)'
      } else if (profit <= 88000000) {
        taxRate = 0.24
        description = '매매사업자 (과세표준 8,800만원 이하)'
      } else if (profit <= 150000000) {
        taxRate = 0.35
        description = '매매사업자 (과세표준 1억 5천만원 이하)'
      } else if (profit <= 300000000) {
        taxRate = 0.38
        description = '매매사업자 (과세표준 3억 이하)'
      } else if (profit <= 500000000) {
        taxRate = 0.40
        description = '매매사업자 (과세표준 5억 이하)'
      } else if (profit <= 1000000000) {
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
        if (profit <= 14000000) {
          taxRate = 0.06
          description = '일반 개인, 보유 2년 이상 (과세표준 1,400만원 이하)'
        } else if (profit <= 50000000) {
          taxRate = 0.15
          description = '일반 개인, 보유 2년 이상 (과세표준 5,000만원 이하)'
        } else if (profit <= 88000000) {
          taxRate = 0.24
          description = '일반 개인, 보유 2년 이상 (과세표준 8,800만원 이하)'
        } else if (profit <= 150000000) {
          taxRate = 0.35
          description = '일반 개인, 보유 2년 이상 (과세표준 1억 5천만원 이하)'
        } else if (profit <= 300000000) {
          taxRate = 0.38
          description = '일반 개인, 보유 2년 이상 (과세표준 3억 이하)'
        } else if (profit <= 500000000) {
          taxRate = 0.40
          description = '일반 개인, 보유 2년 이상 (과세표준 5억 이하)'
        } else if (profit <= 1000000000) {
          taxRate = 0.42
          description = '일반 개인, 보유 2년 이상 (과세표준 10억 이하)'
        } else {
          taxRate = 0.45
          description = '일반 개인, 보유 2년 이상 (과세표준 10억 초과)'
        }
        calculationMethod = '1주택자 2년 이상 보유 시 기본세율 적용'
      }
    }

    const baseTax = Math.round(profit * taxRate)
    const localTax = Math.round(baseTax * 0.1)
    const totalTax = baseTax + localTax

    setCapitalGainsTax(totalTax)

    alert(`양도소득세가 자동 계산되었습니다.\n\n양도차익: ${formatNumber(profit)}원\n보유기간: ${holdingPeriodValue}개월 (${holdingYears.toFixed(1)}년)\n유형: ${houseType === 'business' ? '매매사업자' : '일반 개인'}\n${description}\n적용 세율: ${(taxRate * 100)}%\n\n양도소득세: ${formatNumber(baseTax)}원\n지방소득세(10%): ${formatNumber(localTax)}원\n총 세액: ${formatNumber(totalTax)}원\n\n※ ${calculationMethod}\n※ 실제 세액은 장기보유특별공제, 기본공제(250만원), 필요경비 등에 따라 달라집니다.\n※ 조정대상지역 다주택자는 중과세율(+20~30%p) 적용 가능`)
  }

  const calculateBrokerageFee = () => {
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

  const calculate = () => {
    const totalCost = getNumericValue(acquisitionTax) + getNumericValue(auctionFee) + 
      getNumericValue(legalFee) + getNumericValue(unpaidFee) +
      getNumericValue(interiorCost) + getNumericValue(movingCost) + 
      getNumericValue(loanInterest) + getNumericValue(managementFee) +
      getNumericValue(guaranteeInsurance) +
      getNumericValue(propertyTax) + getNumericValue(comprehensiveRealEstateTax) + 
      getNumericValue(capitalGainsTax) + getNumericValue(brokerageFee)

    const bidPriceValue = getNumericValue(bidPrice)
    const salePriceValue = getNumericValue(salePrice)
    const totalInvestment = bidPriceValue + totalCost
    const netProfit = salePriceValue - totalInvestment
    const profitRate = totalInvestment > 0 ? ((netProfit / totalInvestment) * 100).toFixed(2) : 0

    setResult({
      totalInvestment,
      totalCost,
      totalSale: salePriceValue,
      netProfit,
      profitRate
    })
  }

  return (
    <div className="container">
      <h1>부동산 경매 수익 계산기</h1>

      <div className="section">
        <h2>기본 정보</h2>
        <div className="input-group">
          <label>낙찰금액 (원)</label>
          <input
            type="number"
            value={bidPrice || ''}
            onChange={(e) => handleNumberInput(e.target.value, setBidPrice)}
            min="0"
            placeholder="0"
          />
        </div>
        <div className="input-group">
          <label>판매예상금액 (원)</label>
          <input
            type="number"
            value={salePrice || ''}
            onChange={(e) => handleNumberInput(e.target.value, setSalePrice)}
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div className="section">
        <h2>취득 비용</h2>
        <div className="input-group">
          <label>주택 수</label>
          <select value={acquisitionHouseCount} onChange={(e) => setAcquisitionHouseCount(e.target.value)}>
            <option value="1">1주택</option>
            <option value="2-normal">2주택 (비조정지역)</option>
            <option value="2-regulated">2주택 (조정지역)</option>
            <option value="3">3주택 이상</option>
          </select>
          <small className="help-text">취득세 계산에 사용됩니다</small>
        </div>
        <div className="input-group">
          <label>
            취득세 (원)
            <button type="button" className="auto-calc-btn" onClick={calculateAcquisitionTax}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={acquisitionTax || ''}
            onChange={(e) => handleNumberInput(e.target.value, setAcquisitionTax)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">낙찰금액 기준으로 자동 계산됩니다</small>
        </div>
        <div className="input-group">
          <label>경매집행비용 (원)</label>
          <input
            type="number"
            value={auctionFee}
            onChange={(e) => handleNumberInput(e.target.value, setAuctionFee)}
            min="0"
          />
        </div>
        <div className="input-group">
          <label>법무비 (원)</label>
          <input
            type="number"
            value={legalFee}
            onChange={(e) => handleNumberInput(e.target.value, setLegalFee)}
            min="0"
          />
        </div>
        <div className="input-group">
          <label>미납관리비 (원)</label>
          <input
            type="number"
            value={unpaidFee || ''}
            onChange={(e) => handleNumberInput(e.target.value, setUnpaidFee)}
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div className="section">
        <h2>보유 비용</h2>
        <div className="input-group">
          <label>보유 예상 기간 (개월)</label>
          <input
            type="number"
            value={holdingPeriod}
            onChange={(e) => handleNumberInput(e.target.value, setHoldingPeriod)}
            min="1"
            step="1"
          />
          <small className="help-text">대출이자 및 양도소득세 계산에 사용됩니다</small>
        </div>
        <div className="input-group">
          <label>인테리어 비용 (원)</label>
          <input
            type="number"
            value={interiorCost}
            onChange={(e) => handleNumberInput(e.target.value, setInteriorCost)}
            min="0"
          />
        </div>
        <div className="input-group">
          <label>이사 비용 (원)</label>
          <input
            type="number"
            value={movingCost}
            onChange={(e) => handleNumberInput(e.target.value, setMovingCost)}
            min="0"
          />
        </div>
        <div className="input-group">
          <label>경락잔금대출 비율 (%)</label>
          <input
            type="number"
            value={loanRatio}
            onChange={(e) => handleNumberInput(e.target.value, setLoanRatio)}
            min="0"
            max="90"
            step="1"
          />
          <small className="help-text">낙찰금액의 최대 90%</small>
        </div>
        <div className="input-group">
          <label>대출 금리 (%)</label>
          <input
            type="number"
            value={loanRate}
            onChange={(e) => handleNumberInput(e.target.value, setLoanRate, true)}
            min="4"
            max="5"
            step="0.1"
          />
          <small className="help-text">연 4~5% 범위</small>
        </div>
        <div className="input-group">
          <label>
            경락잔금대출이자 (원)
            <button type="button" className="auto-calc-btn" onClick={calculateLoanInterest}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={loanInterest || ''}
            onChange={(e) => handleNumberInput(e.target.value, setLoanInterest)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">대출비율, 금리, 보유기간 기준으로 자동 계산됩니다</small>
        </div>
        <div className="input-group">
          <label>관리비 (원)</label>
          <input
            type="number"
            value={managementFee || ''}
            onChange={(e) => handleNumberInput(e.target.value, setManagementFee)}
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div className="section">
        <h2>공시가격 정보</h2>
        <div className="input-group">
          <label>공시가격 (원)</label>
          <input
            type="number"
            value={publicPrice || ''}
            onChange={(e) => handleNumberInput(e.target.value, setPublicPrice)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">보증보험료 및 종부세 계산에 사용됩니다 (보통 시세의 70% 수준)</small>
        </div>
        <div className="input-group">
          <label>
            보증보험료 (원)
            <button type="button" className="auto-calc-btn" onClick={calculateGuaranteeInsurance}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={guaranteeInsurance || ''}
            onChange={(e) => handleNumberInput(e.target.value, setGuaranteeInsurance)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">공시가격 × 1.26으로 자동 계산됩니다</small>
        </div>
        <div className="input-group">
          <label>주택 수</label>
          <select value={houseCount} onChange={(e) => setHouseCount(e.target.value)}>
            <option value="1">1주택</option>
            <option value="2">2주택</option>
            <option value="3">3주택 이상</option>
          </select>
          <small className="help-text">재산세 및 종부세 계산에 사용됩니다</small>
        </div>
        <div className="input-group">
          <label>
            재산세 (원)
            <button type="button" className="auto-calc-btn" onClick={calculatePropertyTax}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={propertyTax || ''}
            onChange={(e) => handleNumberInput(e.target.value, setPropertyTax)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">공시가격 기준으로 자동 계산됩니다 (모든 주택 대상)</small>
        </div>
        <div className="input-group">
          <label>
            종합부동산세 (원)
            <button type="button" className="auto-calc-btn" onClick={calculateComprehensiveRealEstateTax}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={comprehensiveRealEstateTax || ''}
            onChange={(e) => handleNumberInput(e.target.value, setComprehensiveRealEstateTax)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">고가 주택에만 부과 (1주택 12억, 2주택 9억, 3주택 6억 초과)</small>
        </div>
      </div>

      <div className="section">
        <h2>매도 비용</h2>
        <div className="input-group">
          <label>주택 유형</label>
          <select value={houseType} onChange={(e) => setHouseType(e.target.value)}>
            <option value="individual">일반 개인</option>
            <option value="business">매매사업자</option>
          </select>
          <small className="help-text">양도소득세 계산에 사용됩니다</small>
        </div>
        <div className="input-group">
          <label>
            양도소득세 (원)
            <button type="button" className="auto-calc-btn" onClick={calculateCapitalGainsTax}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={capitalGainsTax || ''}
            onChange={(e) => handleNumberInput(e.target.value, setCapitalGainsTax)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">수익금, 보유기간 기준으로 자동 계산됩니다</small>
        </div>
        <div className="input-group">
          <label>
            중개수수료 (원)
            <button type="button" className="auto-calc-btn" onClick={calculateBrokerageFee}>
              자동계산
            </button>
          </label>
          <input
            type="number"
            value={brokerageFee || ''}
            onChange={(e) => handleNumberInput(e.target.value, setBrokerageFee)}
            min="0"
            placeholder="0"
          />
          <small className="help-text">판매금액 기준으로 자동 계산됩니다</small>
        </div>
      </div>

      <button className="calculate-btn" onClick={calculate}>
        계산하기
      </button>

      <div className="result">
        <h2>계산 결과</h2>
        <div className="result-item">
          <span>총 투자금액:</span>
          <span className="amount">{formatNumber(result.totalInvestment)}원</span>
        </div>
        <div className="result-item">
          <span>총 비용:</span>
          <span className="amount">{formatNumber(result.totalCost)}원</span>
        </div>
        <div className="result-item">
          <span>판매금액:</span>
          <span className="amount">{formatNumber(result.totalSale)}원</span>
        </div>
        <div className="result-item highlight">
          <span>순수익:</span>
          <span className="amount" style={{ color: result.netProfit >= 0 ? '#4CAF50' : '#f44336' }}>
            {formatNumber(result.netProfit)}원
          </span>
        </div>
        <div className="result-item">
          <span>수익률:</span>
          <span className="amount" style={{ color: result.netProfit >= 0 ? '#4CAF50' : '#f44336' }}>
            {result.profitRate}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default App
