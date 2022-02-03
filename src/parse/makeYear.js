export default (year) => {
  const currentYear = new Date(Date.now()).getFullYear()
  const x = currentYear % 100
  const y = ((year - x + 99) % 100) + 1
  return currentYear - 100 + y
}
