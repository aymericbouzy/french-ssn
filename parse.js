import getControlKey from "./getControlKey"
import checkFormat from "./parse/checkFormat"
import makeGender from "./parse/makeGender"
import makeMonth from "./parse/makeMonth"
import makeYear from "./parse/makeYear"

export default ssn => {
  checkFormat(ssn)
  const result = { birth: {} }
  const re = /^((\d)(\d{2})(\d{2})(\d{5}|2[abAB]\d{3})(\d{3}))(\d{2})$/
  const parts = re.exec(ssn)
  if (!parts) {
    throw new Error("Unexpected error")
  }
  const [partialSsn, gender, year, month, , , controlKey] = parts.slice(1)
  const expectedControlKey = getControlKey(partialSsn)
  if (controlKey != expectedControlKey) {
    throw new Error(
      `Control key does not match (expected ${expectedControlKey})`,
    )
  }
  result.birth.month = makeMonth(month)
  result.gender = makeGender(gender)
  result.birth.year = makeYear(year)
  return result
}
