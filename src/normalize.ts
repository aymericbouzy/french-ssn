export default (ssn: string | number, { length = 15 } = {}) => {
  if (typeof ssn === "number") {
    ssn = ssn.toString()
  }
  if (typeof ssn !== "string") {
    throw new Error(`Input must be a string or a ${length} digits number`)
  }
  ssn = ssn.replace(/[^0-9ab]/gi, "")
  if (ssn.length !== length) {
    throw new Error(`Input must be ${length} characters long`)
  }
  if (!/^\d{6}[0-9abAB]\d*$/.test(ssn)) {
    throw new Error(
      "French Social Security Number only allows digits, except for the letters A and B in 7th position",
    )
  }
  return ssn
}
