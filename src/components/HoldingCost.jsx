const HoldingCost = ({
  holdingPeriod,
  setHoldingPeriod,
  interiorCost,
  setInteriorCost,
  moveInCleaning,
  setMoveInCleaning,
  monthlyManagementFee,
  setMonthlyManagementFee,
  ownershipTransferFee,
  setOwnershipTransferFee,
  evictionCost,
  setEvictionCost,
  loanRatio,
  setLoanRatio,
  loanRate,
  setLoanRate,
  loanInterest,
  setLoanInterest,
  earlyRepaymentRate,
  setEarlyRepaymentRate,
  earlyRepaymentFee,
  setEarlyRepaymentFee,
  managementFee,
  setManagementFee,
  handleNumberInput,
  onCalculateLoanInterest,
  onCalculateEarlyRepaymentFee,
  onCalculateOwnershipTransferFee
}) => {
  return (
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
        <label>입주청소 비용 (원)</label>
        <input
          type="number"
          value={moveInCleaning || ''}
          onChange={(e) => handleNumberInput(e.target.value, setMoveInCleaning)}
          min="0"
          placeholder="0"
        />
      </div>
      <div className="input-group">
        <label>월 관리비 (원)</label>
        <input
          type="number"
          value={monthlyManagementFee || ''}
          onChange={(e) => handleNumberInput(e.target.value, setMonthlyManagementFee)}
          min="0"
          placeholder="0"
        />
        <small className="help-text">보유기간 동안의 관리비 계산에 사용됩니다</small>
      </div>
      <div className="input-group">
        <label>
          소유권이후 관리비 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateOwnershipTransferFee}>
            자동계산
          </button>
        </label>
        <input
          type="number"
          value={ownershipTransferFee || ''}
          onChange={(e) => handleNumberInput(e.target.value, setOwnershipTransferFee)}
          min="0"
          placeholder="0"
        />
        <small className="help-text">월 관리비 × 보유기간으로 자동 계산됩니다</small>
      </div>
      <div className="input-group">
        <label>명도비 (원)</label>
        <input
          type="number"
          value={evictionCost || ''}
          onChange={(e) => handleNumberInput(e.target.value, setEvictionCost)}
          min="0"
          placeholder="0"
        />
        <small className="help-text">점유자 퇴거 및 이사 비용</small>
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
          max="10"
          step="0.1"
        />
        <small className="help-text">연 4~10% 범위</small>
      </div>
      <div className="input-group">
        <label>
          경락잔금대출이자 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateLoanInterest}>
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
        <label>대출중도상환 수수료율 (%)</label>
        <input
          type="number"
          value={earlyRepaymentRate}
          onChange={(e) => handleNumberInput(e.target.value, setEarlyRepaymentRate, true)}
          min="0"
          max="3"
          step="0.1"
        />
        <small className="help-text">보통 0~3% 범위</small>
      </div>
      <div className="input-group">
        <label>
          대출중도상환 수수료 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateEarlyRepaymentFee}>
            자동계산
          </button>
        </label>
        <input
          type="number"
          value={earlyRepaymentFee || ''}
          onChange={(e) => handleNumberInput(e.target.value, setEarlyRepaymentFee)}
          min="0"
          placeholder="0"
        />
        <small className="help-text">대출금액 × 중도상환 수수료율</small>
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
  )
}

export default HoldingCost
