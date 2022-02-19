import checkControlKey from "./checkControlKey"
import normalize from "./normalize"
import makeGender, { Gender } from "./parse/makeGender"
import makeMonth, { Month } from "./parse/makeMonth"
import makeYear from "./parse/makeYear"
import makePlace from "./parse/makePlace"
import addTitle from "./parse/addTitle"
import addApproximateBirthDate from "./parse/addApproximateBirthDate"
import addApproximateAge from "./parse/addApproximateAge"
import addProvisional from "./parse/addProvisional"

const re = /^((\d)(\d{2})(\d{2})(\d{5}|2[abAB]\d{3})(\d{3}))(\d{2})$/

export const getParts = (ssn: string | number) => {
  ssn = normalize(ssn)
  const parts = re.exec(ssn)
  if (!parts) {
    throw new Error("Unexpected error")
  }
  const [partialSsn, gender, year, month, place, rank, controlKey] =
    parts.slice(1)
  return { partialSsn, gender, year, month, place, rank, controlKey }
}

export default (ssn: string | number) => {
  const {
    partialSsn,
    gender,
    year,
    month,
    place,
    // eslint-disable-next-line no-unused-vars
    rank,
    controlKey,
  } = getParts(ssn)
  // FIXME
  const result: any = { birth: {} }

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
  addProvisional(result, Number(gender), controlKey)
  return result
}
