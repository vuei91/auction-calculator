interface HoldingCostProps {
  holdingPeriod: number | string
  setHoldingPeriod: (v: number | string) => void
  interiorCost: number | string
  setInteriorCost: (v: number | string) => void
  moveInCleaning: number | string
  setMoveInCleaning: (v: number | string) => void
  monthlyManagementFee: number | string
  setMonthlyManagementFee: (v: number | string) => void
  ownershipTransferFee: number | string
  setOwnershipTransferFee: (v: number | string) => void
  evictionCost: number | string
  setEvictionCost: (v: number | string) => void
  loanRatio: number | string
  setLoanRatio: (v: number | string) => void
  loanRate: number | string
  setLoanRate: (v: number | string) => void
  loanInterest: number | string
  setLoanInterest: (v: number | string) => void
  earlyRepaymentRate: number | string
  setEarlyRepaymentRate: (v: number | string) => void
  earlyRepaymentFee: number | string
  setEarlyRepaymentFee: (v: number | string) => void
  managementFee: number | string
  setManagementFee: (v: number | string) => void
  handleNumberInput: (value: string, setter: (v: number | string) => void, allowDecimal?: boolean) => boolean
  onCalculateLoanInterest: () => void
  onCalculateEarlyRepaymentFee: () => void
  onCalculateOwnershipTransferFee: () => void
}

const HoldingCost = ({
  holdingPeriod, setHoldingPeriod,
  interiorCost, setInteriorCost,
  moveInCleaning, setMoveInCleaning,
  monthlyManagementFee, setMonthlyManagementFee,
  ownershipTransferFee, setOwnershipTransferFee,
  evictionCost, setEvictionCost,
  loanRatio, setLoanRatio,
  loanRate, setLoanRate,
  loanInterest, setLoanInterest,
  earlyRepaymentRate, setEarlyRepaymentRate,
  earlyRepaymentFee, setEarlyRepaymentFee,
  managementFee, setManagementFee,
  handleNumberInput,
  onCalculateLoanInterest,
  onCalculateEarlyRepaymentFee,
  onCalculateOwnershipTransferFee,
}: HoldingCostProps) => {
  return (
    <div className="section">
      <h2>보유 비용</h2>
      <div className="input-group">
        <label htmlFor="holdingPeriod">보유 예상 기간 (개월)</label>
        <input id="holdingPeriod" type="number" value={holdingPeriod} onChange={(e) => handleNumberInput(e.target.value, setHoldingPeriod)} min="1" step="1" />
        <small className="help-text">대출이자 및 양도소득세 계산에 사용됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="interiorCost">인테리어 비용 (원)</label>
        <input id="interiorCost" type="number" value={interiorCost} onChange={(e) => handleNumberInput(e.target.value, setInteriorCost)} min="0" />
      </div>
      <div className="input-group">
        <label htmlFor="moveInCleaning">입주청소 비용 (원)</label>
        <input id="moveInCleaning" type="number" value={moveInCleaning || ''} onChange={(e) => handleNumberInput(e.target.value, setMoveInCleaning)} min="0" placeholder="0" />
      </div>
      <div className="input-group">
        <label htmlFor="monthlyManagementFee">월 관리비 (원)</label>
        <input id="monthlyManagementFee" type="number" value={monthlyManagementFee || ''} onChange={(e) => handleNumberInput(e.target.value, setMonthlyManagementFee)} min="0" placeholder="0" />
        <small className="help-text">보유기간 동안의 관리비 계산에 사용됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="ownershipTransferFee">
          소유권이후 관리비 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateOwnershipTransferFee}>자동계산</button>
        </label>
        <input id="ownershipTransferFee" type="number" value={ownershipTransferFee || ''} onChange={(e) => handleNumberInput(e.target.value, setOwnershipTransferFee)} min="0" placeholder="0" />
        <small className="help-text">월 관리비 × 보유기간으로 자동 계산됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="evictionCost">명도비 (원)</label>
        <input id="evictionCost" type="number" value={evictionCost || ''} onChange={(e) => handleNumberInput(e.target.value, setEvictionCost)} min="0" placeholder="0" />
        <small className="help-text">점유자 퇴거 및 이사 비용</small>
      </div>
      <div className="input-group">
        <label htmlFor="loanRatio">경락잔금대출 비율 (%)</label>
        <input id="loanRatio" type="number" value={loanRatio} onChange={(e) => handleNumberInput(e.target.value, setLoanRatio)} min="0" max="90" step="1" />
        <small className="help-text">낙찰금액의 최대 90%</small>
      </div>
      <div className="input-group">
        <label htmlFor="loanRate">대출 금리 (%)</label>
        <input id="loanRate" type="number" value={loanRate} onChange={(e) => handleNumberInput(e.target.value, setLoanRate, true)} min="4" max="10" step="0.1" />
        <small className="help-text">연 4~10% 범위</small>
      </div>
      <div className="input-group">
        <label htmlFor="loanInterest">
          경락잔금대출이자 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateLoanInterest}>자동계산</button>
        </label>
        <input id="loanInterest" type="number" value={loanInterest || ''} onChange={(e) => handleNumberInput(e.target.value, setLoanInterest)} min="0" placeholder="0" />
        <small className="help-text">대출비율, 금리, 보유기간 기준으로 자동 계산됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="earlyRepaymentRate">대출중도상환 수수료율 (%)</label>
        <input id="earlyRepaymentRate" type="number" value={earlyRepaymentRate} onChange={(e) => handleNumberInput(e.target.value, setEarlyRepaymentRate, true)} min="0" max="3" step="0.1" />
        <small className="help-text">보통 0~3% 범위</small>
      </div>
      <div className="input-group">
        <label htmlFor="earlyRepaymentFee">
          대출중도상환 수수료 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateEarlyRepaymentFee}>자동계산</button>
        </label>
        <input id="earlyRepaymentFee" type="number" value={earlyRepaymentFee || ''} onChange={(e) => handleNumberInput(e.target.value, setEarlyRepaymentFee)} min="0" placeholder="0" />
        <small className="help-text">대출금액 × 중도상환 수수료율</small>
      </div>
      <div className="input-group">
        <label htmlFor="managementFee">관리비 (원)</label>
        <input id="managementFee" type="number" value={managementFee || ''} onChange={(e) => handleNumberInput(e.target.value, setManagementFee)} min="0" placeholder="0" />
      </div>
    </div>
  )
}

export default HoldingCost
