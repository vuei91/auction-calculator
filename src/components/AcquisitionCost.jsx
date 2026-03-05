const AcquisitionCost = ({
  acquisitionHouseCount,
  setAcquisitionHouseCount,
  acquisitionTax,
  setAcquisitionTax,
  auctionFee,
  setAuctionFee,
  legalFee,
  setLegalFee,
  unpaidFee,
  setUnpaidFee,
  handleNumberInput,
  onCalculateAcquisitionTax
}) => {
  return (
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
          <button type="button" className="auto-calc-btn" onClick={onCalculateAcquisitionTax}>
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
  )
}

export default AcquisitionCost
