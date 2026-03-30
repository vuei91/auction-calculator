import type { PublicPriceHouseCount } from '../types'

interface PublicPriceInfoProps {
  publicPrice: number | string
  setPublicPrice: (v: number | string) => void
  guaranteeInsurance: number | string
  setGuaranteeInsurance: (v: number | string) => void
  houseCount: PublicPriceHouseCount
  setHouseCount: (v: PublicPriceHouseCount) => void
  propertyTax: number | string
  setPropertyTax: (v: number | string) => void
  comprehensiveRealEstateTax: number | string
  setComprehensiveRealEstateTax: (v: number | string) => void
  handleNumberInput: (value: string, setter: (v: number | string) => void, allowDecimal?: boolean) => boolean
  onCalculateGuaranteeInsurance: () => void
  onCalculatePropertyTax: () => void
  onCalculateComprehensiveRealEstateTax: () => void
}

const PublicPriceInfo = ({
  publicPrice, setPublicPrice,
  guaranteeInsurance, setGuaranteeInsurance,
  houseCount, setHouseCount,
  propertyTax, setPropertyTax,
  comprehensiveRealEstateTax, setComprehensiveRealEstateTax,
  handleNumberInput,
  onCalculateGuaranteeInsurance,
  onCalculatePropertyTax,
  onCalculateComprehensiveRealEstateTax,
}: PublicPriceInfoProps) => {
  return (
    <div className="section">
      <h2>공시가격 정보</h2>
      <div className="input-group">
        <label htmlFor="publicPrice">공시가격 (원)</label>
        <input id="publicPrice" type="number" value={publicPrice || ''} onChange={(e) => handleNumberInput(e.target.value, setPublicPrice)} min="0" placeholder="0" />
        <small className="help-text">보증보험료 및 종부세 계산에 사용됩니다 (보통 시세의 70% 수준)</small>
      </div>
      <div className="input-group">
        <label htmlFor="guaranteeInsurance">
          보증보험료 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateGuaranteeInsurance}>자동계산</button>
        </label>
        <input id="guaranteeInsurance" type="number" value={guaranteeInsurance || ''} onChange={(e) => handleNumberInput(e.target.value, setGuaranteeInsurance)} min="0" placeholder="0" />
        <small className="help-text">공시가격 × 1.26으로 자동 계산됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="publicHouseCount">주택 수</label>
        <select id="publicHouseCount" value={houseCount} onChange={(e) => setHouseCount(e.target.value as PublicPriceHouseCount)}>
          <option value="1">1주택</option>
          <option value="2">2주택</option>
          <option value="3">3주택 이상</option>
        </select>
        <small className="help-text">재산세 및 종부세 계산에 사용됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="propertyTax">
          재산세 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculatePropertyTax}>자동계산</button>
        </label>
        <input id="propertyTax" type="number" value={propertyTax || ''} onChange={(e) => handleNumberInput(e.target.value, setPropertyTax)} min="0" placeholder="0" />
        <small className="help-text">공시가격 기준으로 자동 계산됩니다 (모든 주택 대상)</small>
      </div>
      <div className="input-group">
        <label htmlFor="comprehensiveRealEstateTax">
          종합부동산세 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateComprehensiveRealEstateTax}>자동계산</button>
        </label>
        <input id="comprehensiveRealEstateTax" type="number" value={comprehensiveRealEstateTax || ''} onChange={(e) => handleNumberInput(e.target.value, setComprehensiveRealEstateTax)} min="0" placeholder="0" />
        <small className="help-text">고가 주택에만 부과 (1주택 12억, 2주택 9억, 3주택 6억 초과)</small>
      </div>
    </div>
  )
}

export default PublicPriceInfo
