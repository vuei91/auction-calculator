import { formatNumber, getNumericValue } from '../utils/formatters'

const ResultDisplay = ({
  bidPrice,
  salePrice,
  loanRatio,
  capitalGainsTax,
  localIncomeTax,
  taxableIncome,
  result
}) => {
  return (
    <div className="result">
      <h2>계산 결과</h2>
      <div className="result-item">
        <span>낙찰가:</span>
        <span className="amount">{formatNumber(getNumericValue(bidPrice))}원</span>
      </div>
      <div className="result-item">
        <span>매도가:</span>
        <span className="amount">{formatNumber(result.totalSale)}원</span>
      </div>
      <div className="result-item">
        <span>총 비용:</span>
        <span className="amount">{formatNumber(result.totalCost)}원</span>
      </div>
      <div className="result-item">
        <span>시세차익:</span>
        <span className="amount">{formatNumber(result.totalSale - getNumericValue(bidPrice))}원</span>
      </div>
      <div className="result-item">
        <span>과세표준:</span>
        <span className="amount">{formatNumber(getNumericValue(taxableIncome))}원</span>
      </div>
      <div className="result-item">
        <span>양도세:</span>
        <span className="amount">{formatNumber(getNumericValue(capitalGainsTax))}원</span>
      </div>
      <div className="result-item">
        <span>지방소득세:</span>
        <span className="amount">{formatNumber(getNumericValue(localIncomeTax))}원</span>
      </div>
      <div className="result-item highlight">
        <span>순수익:</span>
        <span className="amount" style={{ color: result.netProfit >= 0 ? '#4CAF50' : '#f44336' }}>
          {formatNumber(result.netProfit)}원
        </span>
      </div>
      <div className="result-item">
        <span>총 투자금액:</span>
        <span className="amount">{formatNumber(result.totalInvestment)}원</span>
      </div>
      <div className="result-item">
        <span>경락자금대출 ({loanRatio}%):</span>
        <span className="amount">
          {formatNumber(Math.round(getNumericValue(bidPrice) * (loanRatio / 100)))}원
        </span>
      </div>
      <div className="result-item">
        <span>현금투입:</span>
        <span className="amount">
          {formatNumber(getNumericValue(bidPrice) - Math.round(getNumericValue(bidPrice) * (loanRatio / 100)) + result.totalCost - getNumericValue(capitalGainsTax) - getNumericValue(localIncomeTax))}원
        </span>
      </div>
      <div className="result-item">
        <span>수익률:</span>
        <span className="amount" style={{ color: result.netProfit >= 0 ? '#4CAF50' : '#f44336' }}>
          {result.profitRate}%
        </span>
      </div>
    </div>
  )
}

export default ResultDisplay
