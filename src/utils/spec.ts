/**
 * 202511 -> 2025-11
 * @param value
 */
export const formatYYYYMM = (value: string) => {
  const numbers = value.replace(/[^\d]/g, '').slice(0, 6)
  if (numbers.length <= 4) return numbers
  return `${numbers.slice(0, 4)}-${numbers.slice(4)}`
}

/**
 * onBlur 될 때, 20255 -> 2025-05 로 포멧팅
 * @param value
 */
export const padMonth = (value: string | undefined | null) => {
  if (!value) return ''
  if (!value.includes('-')) return value
  const [year, month] = value.split('-')
  if (month && month.length === 1) {
    return `${year}-0${month}`
  }
  return value
}
