const SaleCost = ({
  houseType,
  setHouseType,
  brokerageFee,
  setBrokerageFee,
  capitalGainsTax,
  setCapitalGainsTax,
  localIncomeTax,
  setLocalIncomeTax,
  handleNumberInput,
  onCalculateBrokerageFee,
  onCalculateCapitalGainsTax
}) => {
  return (
    <div className="section">
      <h2>매도 비용</h2>
      <div className="input-group">
        <label>
          중개수수료 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateBrokerageFee}>
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
          <button type="button" className="auto-calc-btn" onClick={onCalculateCapitalGainsTax}>
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
        <small className="help-text">중개수수료 계산 후 자동 계산해주세요</small>
      </div>
      <div className="input-group">
        <label>지방소득세 (원)</label>
        <input
          type="number"
          value={localIncomeTax || ''}
          onChange={(e) => handleNumberInput(e.target.value, setLocalIncomeTax)}
          min="0"
          placeholder="0"
        />
        <small className="help-text">양도소득세의 10% (자동계산 시 함께 계산됨)</small>
      </div>
    </div>
  )
}

export default SaleCost
