import checkControlKey from "./checkControlKey"
import checkFormat from "./parse/checkFormat"
import makeGender from "./parse/makeGender"
import makeMonth from "./parse/makeMonth"
import makeYear from "./parse/makeYear"
import makePlace from "./parse/makePlace"

const addTitle = () => {}
const addApproximateAge = () => {}
const addApproximateBirthDate = () => {}

export default ssn => {
  checkFormat(ssn)
  const result = { birth: {} }
  const re = /^((\d)(\d{2})(\d{2})(\d{5}|2[abAB]\d{3})(\d{3}))(\d{2})$/
  const parts = re.exec(ssn)
  if (!parts) {
    throw new Error("Unexpected error")
  }
  const [partialSsn, gender, year, month, place, , controlKey] = parts.slice(1)
  checkControlKey(partialSsn, controlKey)
  result.birth.month = makeMonth(month)
  result.gender = makeGender(gender)
  result.birth.year = makeYear(year)
  result.birth = {
    ...result.birth,
    ...makePlace(place, result.birth.year),
  }
  addTitle(result)
  addApproximateBirthDate(result)
  addApproximateAge(result)
  return result
}
