export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getNumericValue = (value) => {
  return value === '' || value === null || value === undefined ? 0 : Number(value)
}
