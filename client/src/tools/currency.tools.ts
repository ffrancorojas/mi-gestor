export const parseCurrencyValue = (value: string) => {
  const sanitizedValue = value.trim().replace(/[^\d,.-]/g, '')
  const isNegative = sanitizedValue.startsWith('-')
  const unsignedValue = sanitizedValue.replace(/-/g, '')
  const lastCommaIndex = unsignedValue.lastIndexOf(',')
  const lastDotIndex = unsignedValue.lastIndexOf('.')
  const hasBothSeparators = lastCommaIndex >= 0 && lastDotIndex >= 0
  const dotDecimalDigits = lastDotIndex >= 0 ? unsignedValue.length - lastDotIndex - 1 : 0
  const decimalSeparatorIndex = hasBothSeparators
    ? Math.max(lastCommaIndex, lastDotIndex)
    : lastCommaIndex >= 0
      ? lastCommaIndex
      : dotDecimalDigits > 0 && dotDecimalDigits <= 2
        ? lastDotIndex
        : -1

  if (!unsignedValue) return null

  const integerPart = (
    decimalSeparatorIndex >= 0 ? unsignedValue.slice(0, decimalSeparatorIndex) : unsignedValue
  ).replace(/[.,]/g, '')
  const decimalPart =
    decimalSeparatorIndex >= 0
      ? unsignedValue.slice(decimalSeparatorIndex + 1).replace(/[.,]/g, '')
      : ''
  const numericValue = Number(`${isNegative ? '-' : ''}${integerPart || '0'}.${decimalPart}`)

  return Number.isFinite(numericValue) ? numericValue : null
}

export const formatCurrencyValue = (value: string) => {
  const numericValue = parseCurrencyValue(value)

  if (numericValue === null) return value

  return numericValue.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: 'always',
  })
}
