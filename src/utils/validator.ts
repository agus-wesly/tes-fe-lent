export function validateInput(
  newInput: string,
  minValue: number,
  maxValue: number
) {
  if (newInput === '') return null
  const converted = Number(newInput)
  if (newInput.includes('.') && !isNaN(converted)) return newInput

  if (isNaN(converted) || converted < minValue || converted > maxValue)
    throw new Error('Invalid input')
  return converted
}
