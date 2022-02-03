const millisecondsCountInOneDay = 1000 * 60 * 60 * 24

const dateBetween = (start, end) => {
  const date = new Date(start.valueOf())
  date.setUTCDate(
    date.getUTCDate() +
      Math.round(
        (end.valueOf() - start.valueOf()) / millisecondsCountInOneDay / 2,
      ),
  )
  return date
}

const makeApproximateBirthDate = ({ year, month: { index: month } }) => {
  const date = new Date(Date.UTC(year, 0, 1))
  if (month) {
    date.setUTCMonth(month - 1)
    const endOfMonth = new Date(date.valueOf())
    endOfMonth.setUTCMonth(month)
    return dateBetween(date, endOfMonth)
  }
  const endOfYear = new Date(date.valueOf())
  endOfYear.setUTCFullYear(year + 1)
  return dateBetween(date, endOfYear)
}

export default (data) => {
  data.birth.approximateDate = makeApproximateBirthDate(data.birth)
}
