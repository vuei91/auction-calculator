interface BasicInfoProps {
  bidPrice: number | string
  setBidPrice: (v: number | string) => void
  salePrice: number | string
  setSalePrice: (v: number | string) => void
  handleNumberInput: (value: string, setter: (v: number | string) => void, allowDecimal?: boolean) => boolean
}

const BasicInfo = ({ bidPrice, setBidPrice, salePrice, setSalePrice, handleNumberInput }: BasicInfoProps) => {
  return (
    <div className="section">
      <h2>기본 정보</h2>
      <div className="input-group">
        <label htmlFor="bidPrice">낙찰금액 (원)</label>
        <input
          id="bidPrice"
          type="number"
          value={bidPrice || ''}
          onChange={(e) => handleNumberInput(e.target.value, setBidPrice)}
          min="0"
          placeholder="0"
        />
      </div>
      <div className="input-group">
        <label htmlFor="salePrice">판매예상금액 (원)</label>
        <input
          id="salePrice"
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
