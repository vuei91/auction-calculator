import type { AcquisitionHouseCount } from '../types'

interface AcquisitionCostProps {
  acquisitionHouseCount: AcquisitionHouseCount
  setAcquisitionHouseCount: (v: AcquisitionHouseCount) => void
  acquisitionTax: number | string
  setAcquisitionTax: (v: number | string) => void
  auctionFee: number | string
  setAuctionFee: (v: number | string) => void
  legalFee: number | string
  setLegalFee: (v: number | string) => void
  unpaidFee: number | string
  setUnpaidFee: (v: number | string) => void
  handleNumberInput: (value: string, setter: (v: number | string) => void, allowDecimal?: boolean) => boolean
  onCalculateAcquisitionTax: () => void
}

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
  onCalculateAcquisitionTax,
}: AcquisitionCostProps) => {
  return (
    <div className="section">
      <h2>취득 비용</h2>
      <div className="input-group">
        <label htmlFor="houseCount">주택 수</label>
        <select
          id="houseCount"
          value={acquisitionHouseCount}
          onChange={(e) => setAcquisitionHouseCount(e.target.value as AcquisitionHouseCount)}
        >
          <option value="1">1주택</option>
          <option value="2-normal">2주택 (비조정지역)</option>
          <option value="2-regulated">2주택 (조정지역)</option>
          <option value="3">3주택 이상</option>
        </select>
        <small className="help-text">취득세 계산에 사용됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="acquisitionTax">
          취득세 (원)
          <button type="button" className="auto-calc-btn" onClick={onCalculateAcquisitionTax}>
            자동계산
          </button>
        </label>
        <input
          id="acquisitionTax"
          type="number"
          value={acquisitionTax || ''}
          onChange={(e) => handleNumberInput(e.target.value, setAcquisitionTax)}
          min="0"
          placeholder="0"
        />
        <small className="help-text">낙찰금액 기준으로 자동 계산됩니다</small>
      </div>
      <div className="input-group">
        <label htmlFor="auctionFee">경매집행비용 (원)</label>
        <input
          id="auctionFee"
          type="number"
          value={auctionFee}
          onChange={(e) => handleNumberInput(e.target.value, setAuctionFee)}
          min="0"
        />
      </div>
      <div className="input-group">
        <label htmlFor="legalFee">법무비 (원)</label>
        <input
          id="legalFee"
          type="number"
          value={legalFee}
          onChange={(e) => handleNumberInput(e.target.value, setLegalFee)}
          min="0"
        />
      </div>
      <div className="input-group">
        <label htmlFor="unpaidFee">미납관리비 (원)</label>
        <input
          id="unpaidFee"
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
