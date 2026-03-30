export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getNumericValue = (value: string | number | null | undefined): number => {
  if (value === '' || value === null || value === undefined) return 0
  return Number(value)
}

/**
 * 숫자 입력 핸들러. 음수를 거부하고, allowDecimal에 따라 정수/소수점 구분 처리.
 * 유효한 값이면 setter를 호출하고 true 반환, 아니면 false 반환.
 */
export const handleNumberInput = (
  value: string,
  setter: (v: number | string) => void,
  allowDecimal = false
): boolean => {
  if (value === '') {
    setter('')
    return true
  }
  const numValue = allowDecimal ? parseFloat(value) : parseInt(value)
  if (!isNaN(numValue) && numValue >= 0) {
    setter(numValue)
    return true
  }
  return false
}
