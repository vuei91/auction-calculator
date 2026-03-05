const BasicInfo = ({ bidPrice, setBidPrice, salePrice, setSalePrice, handleNumberInput }) => {
  return (
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
  )
}

export default BasicInfo
