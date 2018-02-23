const between = (lower, value, upper) => lower <= value && value <= upper

const padKey = key => (key < 10 ? `0${key}` : `${key}`)

export const getControlKey = partialSsn => {
  return padKey(97 - parseInt(partialSsn.replace(/[abAB]/, "0")) % 97)
}

export const parse = ssn => {
  const result = {}
  if (typeof ssn !== "string") {
    throw new Error("French Social Security Number must be a string")
  }
  if (ssn.length !== 15) {
    throw new Error("French Social Security Number must be 15 characters long")
  }
  if (!/^\d{6}[0-9abAB]\d{8}$/.test(ssn)) {
    throw new Error(
      "French Social Security Number only allows digits, except for the letters a and b in 7th position",
    )
  }
  const re = /^(\d)(\d{2})(\d{2})(\d{5}|2[abAB]\d{3})(\d{3})(\d{2})$/
  const parts = re.exec(ssn)
  if (!parts) {
    throw new Error()
  }
  const [_, gender, year, month, place, rank, controlKey] = parts
  if (between(1, month, 12)) {
    result.month = month
  } else if (
    between(30, month, 42) ||
    between(50, month, 99) ||
    month === "20"
  ) {
    result.month = "unkown"
  } else {
    throw new Error("Month appears to be incorrect")
  }
  switch (gender) {
    case "1":
    case "3":
    case "7":
      result.gender = "male"
      break
    case "2":
    case "4":
    case "8":
      result.gender = "female"
      break
    default:
      throw new Error("Gender has to be among 1, 2, 3, 4, 7 and 8")
  }
  const partialSsn = `${gender}${year}${month}${place}${rank}`
  const expectedControlKey = getControlKey(partialSsn)
  if (controlKey != expectedControlKey) {
    throw new Error(
      `Control key does not match (expected ${expectedControlKey})`,
    )
  }
  return result
}
