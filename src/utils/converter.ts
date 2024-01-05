export function dmsToDecimal({
  degrees,
  minutes,
  seconds,
}: {
  degrees: number | string
  minutes: number | string
  seconds: number | string
}) {
  const decimalLatitude =
    Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600

  return parseFloat(decimalLatitude.toFixed(6))
}

export function decimalToDMS(latitude: number | string) {
  const absLatitude = Math.abs(Number(latitude))
  const degrees = Math.floor(absLatitude)
  const minutesDecimal = (absLatitude - degrees) * 60
  const minutes = Math.floor(minutesDecimal)
  const seconds = Math.round((minutesDecimal - minutes) * 60 * 10) / 10

  const sign = Number(latitude) < 0 ? -1 : 1

  return {
    degrees: sign * degrees,
    minutes,
    seconds,
  }
}
