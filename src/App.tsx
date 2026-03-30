import { useState } from 'react'
import './App.css'
import { getNumericValue, handleNumberInput as handleInput } from './utils/formatters'
import {
  calculateAcquisitionTax,
  calculateLoanInterest,
  calculateEarlyRepaymentFee,
  calculateOwnershipTransferFee,
  calculateGuaranteeInsurance,
  calculatePropertyTax,
  calculateComprehensiveRealEstateTax,
  calculateCapitalGainsTax,
  calculateBrokerageFee,
  calculateTotalResult,
} from './utils/calculators'
import type { AcquisitionHouseCount, PublicPriceHouseCount, HouseType, TotalResult } from './types'
import BasicInfo from './components/BasicInfo'
import AcquisitionCost from './components/AcquisitionCost'
import HoldingCost from './components/HoldingCost'
import PublicPriceInfo from './components/PublicPriceInfo'
import SaleCost from './components/SaleCost'
import ResultDisplay from './components/ResultDisplay'

const INITIAL_RESULT: TotalResult = {
  totalCost: 0,
  totalInvestment: 0,
  netProfit: 0,
  profitRate: 0,
  marketGain: 0,
  loanAmount: 0,
  cashInvestment: 0,
}

function App() {
  const [bidPrice, setBidPrice] = useState<number | string>('')
  const [salePrice, setSalePrice] = useState<number | string>('')
  const [acquisitionHouseCount, setAcquisitionHouseCount] = useState<AcquisitionHouseCount>('1')
  const [acquisitionTax, setAcquisitionTax] = useState<number | string>('')
  const [auctionFee, setAuctionFee] = useState<number | string>(2_800_000)
  const [legalFee, setLegalFee] = useState<number | string>(1_000_000)
  const [unpaidFee, setUnpaidFee] = useState<number | string>('')
  const [interiorCost, setInteriorCost] = useState<number | string>(10_000_000)
  const [moveInCleaning, setMoveInCleaning] = useState<number | string>('')
  const [monthlyManagementFee, setMonthlyManagementFee] = useState<number | string>('')
  const [ownershipTransferFee, setOwnershipTransferFee] = useState<number | string>('')
  const [evictionCost, setEvictionCost] = useState<number | string>('')
  const [holdingPeriod, setHoldingPeriod] = useState<number | string>(24)
  const [loanRatio, setLoanRatio] = useState<number | string>(65)
  const [loanRate, setLoanRate] = useState<number | string>(4.5)
  const [loanInterest, setLoanInterest] = useState<number | string>('')
  const [earlyRepaymentRate, setEarlyRepaymentRate] = useState<number | string>(1)
  const [earlyRepaymentFee, setEarlyRepaymentFee] = useState<number | string>('')
  const [managementFee, setManagementFee] = useState<number | string>('')
  const [guaranteeInsurance, setGuaranteeInsurance] = useState<number | string>('')
  const [publicPrice, setPublicPrice] = useState<number | string>('')
  const [houseCount, setHouseCount] = useState<PublicPriceHouseCount>('1')
  const [propertyTax, setPropertyTax] = useState<number | string>('')
  const [comprehensiveRealEstateTax, setComprehensiveRealEstateTax] = useState<number | string>('')
  const [houseType, setHouseType] = useState<HouseType>('individual')
  const [capitalGainsTax, setCapitalGainsTax] = useState<number | string>('')
  const [localIncomeTax, setLocalIncomeTax] = useState<number | string>('')
  const [taxableIncome, setTaxableIncome] = useState<number | string>('')
  const [brokerageFee, setBrokerageFee] = useState<number | string>('')
  const [result, setResult] = useState<TotalResult>(INITIAL_RESULT)

  // 자동계산 핸들러: 순수 함수 호출 후 상태 업데이트
  const handleCalcAcquisitionTax = () => {
    const bp = getNumericValue(bidPrice)
    if (bp === 0) { alert('낙찰금액을 먼저 입력해주세요.'); return }
    const r = calculateAcquisitionTax(bp, acquisitionHouseCount)
    setAcquisitionTax(r.totalTax)
  }

  const handleCalcLoanInterest = () => {
    const bp = getNumericValue(bidPrice)
    if (bp === 0) { alert('낙찰금액을 먼저 입력해주세요.'); return }
    const val = calculateLoanInterest(bp, getNumericValue(loanRatio), getNumericValue(loanRate), getNumericValue(holdingPeriod))
    setLoanInterest(val)
  }

  const handleCalcEarlyRepaymentFee = () => {
    const bp = getNumericValue(bidPrice)
    if (bp === 0) { alert('낙찰금액을 먼저 입력해주세요.'); return }
    const val = calculateEarlyRepaymentFee(bp, getNumericValue(loanRatio), getNumericValue(earlyRepaymentRate))
    setEarlyRepaymentFee(val)
  }

  const handleCalcOwnershipTransferFee = () => {
    const mf = getNumericValue(monthlyManagementFee)
    if (mf === 0) { alert('월 관리비를 먼저 입력해주세요.'); return }
    const val = calculateOwnershipTransferFee(mf, getNumericValue(holdingPeriod))
    setOwnershipTransferFee(val)
  }

  const handleCalcGuaranteeInsurance = () => {
    const pp = getNumericValue(publicPrice)
    if (pp === 0) { alert('공시가격을 먼저 입력해주세요.'); return }
    setGuaranteeInsurance(calculateGuaranteeInsurance(pp))
  }

  const handleCalcPropertyTax = () => {
    const pp = getNumericValue(publicPrice)
    if (pp === 0) { alert('공시가격을 먼저 입력해주세요.'); return }
    const r = calculatePropertyTax(pp)
    setPropertyTax(r.totalTax)
  }

  const handleCalcComprehensiveRealEstateTax = () => {
    const pp = getNumericValue(publicPrice)
    if (pp === 0) { alert('공시가격을 먼저 입력해주세요.'); return }
    const r = calculateComprehensiveRealEstateTax(pp, houseCount)
    if (r.isExempt) { alert('공시가격이 공제금액 이하로 종부세가 발생하지 않습니다.') }
    setComprehensiveRealEstateTax(r.tax)
  }

  const handleCalcBrokerageFee = () => {
    const sp = getNumericValue(salePrice)
    if (sp === 0) { alert('판매예상금액을 먼저 입력해주세요.'); return }
    const r = calculateBrokerageFee(sp)
    setBrokerageFee(r.totalFee)
  }

  const handleCalcCapitalGainsTax = () => {
    const bp = getNumericValue(bidPrice)
    const sp = getNumericValue(salePrice)
    if (bp === 0 || sp === 0) { alert('낙찰금액과 판매예상금액을 먼저 입력해주세요.'); return }
    const r = calculateCapitalGainsTax(
      bp, sp, getNumericValue(holdingPeriod), houseType,
      getNumericValue(acquisitionTax), getNumericValue(legalFee), getNumericValue(brokerageFee)
    )
    if (r.profit <= 0) { alert('수익이 없어 양도소득세가 발생하지 않습니다.') }
    setCapitalGainsTax(r.capitalGainsTax)
    setLocalIncomeTax(r.localIncomeTax)
    setTaxableIncome(r.taxableIncome)
  }

  const calculate = () => {
    const r = calculateTotalResult(
      getNumericValue(bidPrice),
      getNumericValue(salePrice),
      getNumericValue(loanRatio),
      {
        acquisitionTax: getNumericValue(acquisitionTax),
        auctionFee: getNumericValue(auctionFee),
        legalFee: getNumericValue(legalFee),
        unpaidFee: getNumericValue(unpaidFee),
        interiorCost: getNumericValue(interiorCost),
        moveInCleaning: getNumericValue(moveInCleaning),
        ownershipTransferFee: getNumericValue(ownershipTransferFee),
        evictionCost: getNumericValue(evictionCost),
        loanInterest: getNumericValue(loanInterest),
        earlyRepaymentFee: getNumericValue(earlyRepaymentFee),
        managementFee: getNumericValue(managementFee),
        guaranteeInsurance: getNumericValue(guaranteeInsurance),
        propertyTax: getNumericValue(propertyTax),
        comprehensiveRealEstateTax: getNumericValue(comprehensiveRealEstateTax),
        capitalGainsTax: getNumericValue(capitalGainsTax),
        localIncomeTax: getNumericValue(localIncomeTax),
        brokerageFee: getNumericValue(brokerageFee),
      }
    )
    setResult(r)
  }

  return (
    <div className="container">
      <h1>부동산 경매 수익 계산기</h1>

      <BasicInfo
        bidPrice={bidPrice} setBidPrice={setBidPrice}
        salePrice={salePrice} setSalePrice={setSalePrice}
        handleNumberInput={handleInput}
      />

      <AcquisitionCost
        acquisitionHouseCount={acquisitionHouseCount} setAcquisitionHouseCount={setAcquisitionHouseCount}
        acquisitionTax={acquisitionTax} setAcquisitionTax={setAcquisitionTax}
        auctionFee={auctionFee} setAuctionFee={setAuctionFee}
        legalFee={legalFee} setLegalFee={setLegalFee}
        unpaidFee={unpaidFee} setUnpaidFee={setUnpaidFee}
        handleNumberInput={handleInput}
        onCalculateAcquisitionTax={handleCalcAcquisitionTax}
      />

      <HoldingCost
        holdingPeriod={holdingPeriod} setHoldingPeriod={setHoldingPeriod}
        interiorCost={interiorCost} setInteriorCost={setInteriorCost}
        moveInCleaning={moveInCleaning} setMoveInCleaning={setMoveInCleaning}
        monthlyManagementFee={monthlyManagementFee} setMonthlyManagementFee={setMonthlyManagementFee}
        ownershipTransferFee={ownershipTransferFee} setOwnershipTransferFee={setOwnershipTransferFee}
        evictionCost={evictionCost} setEvictionCost={setEvictionCost}
        loanRatio={loanRatio} setLoanRatio={setLoanRatio}
        loanRate={loanRate} setLoanRate={setLoanRate}
        loanInterest={loanInterest} setLoanInterest={setLoanInterest}
        earlyRepaymentRate={earlyRepaymentRate} setEarlyRepaymentRate={setEarlyRepaymentRate}
        earlyRepaymentFee={earlyRepaymentFee} setEarlyRepaymentFee={setEarlyRepaymentFee}
        managementFee={managementFee} setManagementFee={setManagementFee}
        handleNumberInput={handleInput}
        onCalculateLoanInterest={handleCalcLoanInterest}
        onCalculateEarlyRepaymentFee={handleCalcEarlyRepaymentFee}
        onCalculateOwnershipTransferFee={handleCalcOwnershipTransferFee}
      />

      <PublicPriceInfo
        publicPrice={publicPrice} setPublicPrice={setPublicPrice}
        guaranteeInsurance={guaranteeInsurance} setGuaranteeInsurance={setGuaranteeInsurance}
        houseCount={houseCount} setHouseCount={setHouseCount}
        propertyTax={propertyTax} setPropertyTax={setPropertyTax}
        comprehensiveRealEstateTax={comprehensiveRealEstateTax} setComprehensiveRealEstateTax={setComprehensiveRealEstateTax}
        handleNumberInput={handleInput}
        onCalculateGuaranteeInsurance={handleCalcGuaranteeInsurance}
        onCalculatePropertyTax={handleCalcPropertyTax}
        onCalculateComprehensiveRealEstateTax={handleCalcComprehensiveRealEstateTax}
      />

      <SaleCost
        houseType={houseType} setHouseType={setHouseType}
        brokerageFee={brokerageFee} setBrokerageFee={setBrokerageFee}
        capitalGainsTax={capitalGainsTax} setCapitalGainsTax={setCapitalGainsTax}
        localIncomeTax={localIncomeTax} setLocalIncomeTax={setLocalIncomeTax}
        handleNumberInput={handleInput}
        onCalculateBrokerageFee={handleCalcBrokerageFee}
        onCalculateCapitalGainsTax={handleCalcCapitalGainsTax}
      />

      <button className="calculate-btn" onClick={calculate}>
        계산하기
      </button>

      <ResultDisplay
        bidPrice={getNumericValue(bidPrice)}
        loanRatio={getNumericValue(loanRatio)}
        capitalGainsTax={getNumericValue(capitalGainsTax)}
        localIncomeTax={getNumericValue(localIncomeTax)}
        taxableIncome={getNumericValue(taxableIncome)}
        result={result}
      />
    </div>
  )
}

export default App
