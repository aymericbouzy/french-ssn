export default ssn => {
  if (typeof ssn !== "string") {
    throw new Error("French Social Security Number must be a string")
  }
  if (ssn.length !== 15) {
    throw new Error("French Social Security Number must be 15 characters long")
  }
  if (!/^\d{6}[0-9abAB]\d{8}$/.test(ssn)) {
    throw new Error(
      "French Social Security Number only allows digits, except for the letters A and B in 7th position",
    )
  }
}
