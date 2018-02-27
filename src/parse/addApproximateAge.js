const makeApproximateAge = birthDate => {
  const now = new Date(Date.now())
  const monthsAge =
    (now.getFullYear() - birthDate.getFullYear()) * 12 +
    now.getMonth() -
    birthDate.getMonth()
  return Math.floor(monthsAge / 12)
}

export default data => {
  data.approximateAge = makeApproximateAge(data.birth.approximateDate)
}
