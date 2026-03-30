import { formatNumber } from '../utils/formatters'
import type { TotalResult } from '../types'

interface ResultDisplayProps {
  bidPrice: number
  loanRatio: number
  capitalGainsTax: number
  localIncomeTax: number
  taxableIncome: number
  result: TotalResult
}

const ResultDisplay = ({
  bidPrice,
  loanRatio,
  capitalGainsTax,
  localIncomeTax,
  taxableIncome,
  result,
}: ResultDisplayProps) => {
  const profitColor = result.netProfit >= 0 ? '#4CAF50' : '#f44336'

  return (
    <div className="result">
      <h2>계산 결과</h2>
      <div className="result-item">
        <span>낙찰가:</span>
        <span className="amount">{formatNumber(bidPrice)}원</span>
      </div>
      <div className="result-item">
        <span>매도가:</span>
        <span className="amount">{formatNumber(bidPrice + result.marketGain)}원</span>
      </div>
      <div className="result-item">
        <span>총 비용:</span>
        <span className="amount">{formatNumber(result.totalCost)}원</span>
      </div>
      <div className="result-item">
        <span>시세차익:</span>
        <span className="amount">{formatNumber(result.marketGain)}원</span>
      </div>
      <div className="result-item">
        <span>과세표준:</span>
        <span className="amount">{formatNumber(taxableIncome)}원</span>
      </div>
      <div className="result-item">
        <span>양도세:</span>
        <span className="amount">{formatNumber(capitalGainsTax)}원</span>
      </div>
      <div className="result-item">
        <span>지방소득세:</span>
        <span className="amount">{formatNumber(localIncomeTax)}원</span>
      </div>
      <div className="result-item highlight">
        <span>순수익:</span>
        <span className="amount" style={{ color: profitColor }}>
          {formatNumber(result.netProfit)}원
        </span>
      </div>
      <div className="result-item">
        <span>총 투자금액:</span>
        <span className="amount">{formatNumber(result.totalInvestment)}원</span>
      </div>
      <div className="result-item">
        <span>경락자금대출 ({loanRatio}%):</span>
        <span className="amount">{formatNumber(result.loanAmount)}원</span>
      </div>
      <div className="result-item">
        <span>현금투입:</span>
        <span className="amount">{formatNumber(result.cashInvestment)}원</span>
      </div>
      <div className="result-item">
        <span>수익률:</span>
        <span className="amount" style={{ color: profitColor }}>
          {result.profitRate}%
        </span>
      </div>
    </div>
  )
}

export default ResultDisplay
