import { useState } from 'react'
import './App.css'
import { getNumericValue } from './utils/formatters'
import {
  calculateAcquisitionTax as calcAcquisitionTax,
  calculateLoanInterest as calcLoanInterest,
  calculateEarlyRepaymentFee as calcEarlyRepaymentFee,
  calculateOwnershipTransferFee as calcOwnershipTransferFee,
  calculateGuaranteeInsurance as calcGuaranteeInsurance,
  calculatePropertyTax as calcPropertyTax,
  calculateComprehensiveRealEstateTax as calcComprehensiveRealEstateTax,
  calculateCapitalGainsTax as calcCapitalGainsTax,
  calculateBrokerageFee as calcBrokerageFee
} from './utils/calculators'
import BasicInfo from './components/BasicInfo'
import AcquisitionCost from './components/AcquisitionCost'
import HoldingCost from './components/HoldingCost'
import PublicPriceInfo from './components/PublicPriceInfo'
import SaleCost from './components/SaleCost'
import ResultDisplay from './components/ResultDisplay'

function App() {
  const [bidPrice, setBidPrice] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [acquisitionHouseCount, setAcquisitionHouseCount] = useState('1')
  const [acquisitionTax, setAcquisitionTax] = useState('')
  const [auctionFee, setAuctionFee] = useState(2800000)
  const [legalFee, setLegalFee] = useState(1000000)
  const [unpaidFee, setUnpaidFee] = useState('')
  const [interiorCost, setInteriorCost] = useState(10000000)
  const [moveInCleaning, setMoveInCleaning] = useState('')
  const [monthlyManagementFee, setMonthlyManagementFee] = useState('')
  const [ownershipTransferFee, setOwnershipTransferFee] = useState('')
  const [evictionCost, setEvictionCost] = useState('')
  const [holdingPeriod, setHoldingPeriod] = useState(24)
  const [loanRatio, setLoanRatio] = useState(65)
  const [loanRate, setLoanRate] = useState(4.5)
  const [loanInterest, setLoanInterest] = useState('')
  const [earlyRepaymentRate, setEarlyRepaymentRate] = useState(1)
  const [earlyRepaymentFee, setEarlyRepaymentFee] = useState('')
  const [managementFee, setManagementFee] = useState('')
  const [guaranteeInsurance, setGuaranteeInsurance] = useState('')
  const [publicPrice, setPublicPrice] = useState('')
  const [houseCount, setHouseCount] = useState('1')
  const [propertyTax, setPropertyTax] = useState('')
  const [comprehensiveRealEstateTax, setComprehensiveRealEstateTax] = useState('')
  const [houseType, setHouseType] = useState('individual')
  const [capitalGainsTax, setCapitalGainsTax] = useState('')
  const [localIncomeTax, setLocalIncomeTax] = useState('')
  const [taxableIncome, setTaxableIncome] = useState('')
  const [brokerageFee, setBrokerageFee] = useState('')

  const [result, setResult] = useState({
    totalInvestment: 0,
    totalCost: 0,
    totalSale: 0,
    netProfit: 0,
    profitRate: 0
  })

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

  const calculate = () => {
    const totalCost = getNumericValue(acquisitionTax) + getNumericValue(auctionFee) + 
      getNumericValue(legalFee) + getNumericValue(unpaidFee) +
      getNumericValue(interiorCost) + getNumericValue(moveInCleaning) +
      getNumericValue(ownershipTransferFee) + getNumericValue(evictionCost) + 
      getNumericValue(loanInterest) + getNumericValue(earlyRepaymentFee) + 
      getNumericValue(managementFee) +
      getNumericValue(propertyTax) + getNumericValue(comprehensiveRealEstateTax) + 
      getNumericValue(capitalGainsTax) + getNumericValue(localIncomeTax) + 
      getNumericValue(brokerageFee)

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

      <BasicInfo
        bidPrice={bidPrice}
        setBidPrice={setBidPrice}
        salePrice={salePrice}
        setSalePrice={setSalePrice}
        handleNumberInput={handleNumberInput}
      />

      <AcquisitionCost
        acquisitionHouseCount={acquisitionHouseCount}
        setAcquisitionHouseCount={setAcquisitionHouseCount}
        acquisitionTax={acquisitionTax}
        setAcquisitionTax={setAcquisitionTax}
        auctionFee={auctionFee}
        setAuctionFee={setAuctionFee}
        legalFee={legalFee}
        setLegalFee={setLegalFee}
        unpaidFee={unpaidFee}
        setUnpaidFee={setUnpaidFee}
        handleNumberInput={handleNumberInput}
        onCalculateAcquisitionTax={() => calcAcquisitionTax(bidPrice, acquisitionHouseCount, setAcquisitionTax)}
      />

      <HoldingCost
        holdingPeriod={holdingPeriod}
        setHoldingPeriod={setHoldingPeriod}
        interiorCost={interiorCost}
        setInteriorCost={setInteriorCost}
        moveInCleaning={moveInCleaning}
        setMoveInCleaning={setMoveInCleaning}
        monthlyManagementFee={monthlyManagementFee}
        setMonthlyManagementFee={setMonthlyManagementFee}
        ownershipTransferFee={ownershipTransferFee}
        setOwnershipTransferFee={setOwnershipTransferFee}
        evictionCost={evictionCost}
        setEvictionCost={setEvictionCost}
        loanRatio={loanRatio}
        setLoanRatio={setLoanRatio}
        loanRate={loanRate}
        setLoanRate={setLoanRate}
        loanInterest={loanInterest}
        setLoanInterest={setLoanInterest}
        earlyRepaymentRate={earlyRepaymentRate}
        setEarlyRepaymentRate={setEarlyRepaymentRate}
        earlyRepaymentFee={earlyRepaymentFee}
        setEarlyRepaymentFee={setEarlyRepaymentFee}
        managementFee={managementFee}
        setManagementFee={setManagementFee}
        handleNumberInput={handleNumberInput}
        onCalculateLoanInterest={() => calcLoanInterest(bidPrice, loanRatio, loanRate, holdingPeriod, setLoanInterest)}
        onCalculateEarlyRepaymentFee={() => calcEarlyRepaymentFee(bidPrice, loanRatio, earlyRepaymentRate, setEarlyRepaymentFee)}
        onCalculateOwnershipTransferFee={() => calcOwnershipTransferFee(monthlyManagementFee, holdingPeriod, setOwnershipTransferFee)}
      />

      <PublicPriceInfo
        publicPrice={publicPrice}
        setPublicPrice={setPublicPrice}
        guaranteeInsurance={guaranteeInsurance}
        setGuaranteeInsurance={setGuaranteeInsurance}
        houseCount={houseCount}
        setHouseCount={setHouseCount}
        propertyTax={propertyTax}
        setPropertyTax={setPropertyTax}
        comprehensiveRealEstateTax={comprehensiveRealEstateTax}
        setComprehensiveRealEstateTax={setComprehensiveRealEstateTax}
        handleNumberInput={handleNumberInput}
        onCalculateGuaranteeInsurance={() => calcGuaranteeInsurance(publicPrice, setGuaranteeInsurance)}
        onCalculatePropertyTax={() => calcPropertyTax(publicPrice, setPropertyTax)}
        onCalculateComprehensiveRealEstateTax={() => calcComprehensiveRealEstateTax(publicPrice, houseCount, setComprehensiveRealEstateTax)}
      />

      <SaleCost
        houseType={houseType}
        setHouseType={setHouseType}
        brokerageFee={brokerageFee}
        setBrokerageFee={setBrokerageFee}
        capitalGainsTax={capitalGainsTax}
        setCapitalGainsTax={setCapitalGainsTax}
        localIncomeTax={localIncomeTax}
        setLocalIncomeTax={setLocalIncomeTax}
        handleNumberInput={handleNumberInput}
        onCalculateBrokerageFee={() => calcBrokerageFee(salePrice, setBrokerageFee)}
        onCalculateCapitalGainsTax={() => calcCapitalGainsTax(
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
        )}
      />

      <button className="calculate-btn" onClick={calculate}>
        계산하기
      </button>

      <ResultDisplay
        bidPrice={bidPrice}
        salePrice={salePrice}
        loanRatio={loanRatio}
        capitalGainsTax={capitalGainsTax}
        localIncomeTax={localIncomeTax}
        taxableIncome={taxableIncome}
        result={result}
      />
    </div>
  )
}

export default App
