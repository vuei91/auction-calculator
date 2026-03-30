import type { HouseType } from '../types'

interface SaleCostProps {
  houseType: HouseType
  setHouseType: (v: HouseType) => void
  brokerageFee: number | string
  setBrokerageFee: (v: number | string) => void
  capitalGainsTax: number | string
  setCapitalGainsTax: (v: number | string) => void
  localIncomeTax: number | string
  setLocalIncomeTax: (v: number | string) => void
  handleNumberInput: (value: string, setter: (v: number | string) => void, allowDecimal?: boolean) => boolean
  onCalculateBrokerageFee: () => void
  onCalculateCapitalGainsTax: () => void
}

const SaleCost = ({
  houseType, setHouseType,
  brokerageFee, setBrokerageFee,
  capitalGainsTax, setCapitalGainsTax,
  localIncomeTax, setLocalIncomeTax,
  handleNumberInput,
  onCalculateBrokerageFee,
  onCalculateCapitalGainsTax,
}: SaleCostProps) => {
  return (
    <div className="section">
      <h2>매도 비용</h2>
      <div className="input-group">
        <label htmlFor="brokerageFee">
          중개수수료 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateBrokerageFee}>자동계산</button>
        </label>
        <input id="brokerageFee" type="number" value={brokerageFee || ''} onChange={(e) => handleNumberInput(e.target.value, setBrokerageFee)} min="0" placeholder="0" />
        <small className="help-text">판매금액 기준으로 자동 계산됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="houseType">주택 유형</label>
        <select id="houseType" value={houseType} onChange={(e) => setHouseType(e.target.value as HouseType)}>
          <option value="individual">일반 개인</option>
          <option value="business">매매사업자</option>
        </select>
        <small className="help-text">양도소득세 계산에 사용됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="capitalGainsTax">
          양도소득세 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateCapitalGainsTax}>자동계산</button>
        </label>
        <input id="capitalGainsTax" type="number" value={capitalGainsTax || ''} onChange={(e) => handleNumberInput(e.target.value, setCapitalGainsTax)} min="0" placeholder="0" />
        <small className="help-text">중개수수료 계산 후 자동 계산해주세요</small>
      </div>
      <div className="input-group">
        <label htmlFor="localIncomeTax">지방소득세 (원)</label>
        <input id="localIncomeTax" type="number" value={localIncomeTax || ''} onChange={(e) => handleNumberInput(e.target.value, setLocalIncomeTax)} min="0" placeholder="0" />
        <small className="help-text">양도소득세의 10% (자동계산 시 함께 계산됨)</small>
      </div>
    </div>
  )
}

export default SaleCost
