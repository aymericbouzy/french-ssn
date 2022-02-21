import { getParts } from "./parse"
import { getParts as getPlaceParts } from "./parse/makePlace"

export default (ssn: string | number) => {
  const { gender, year, month, place, rank, controlKey } = getParts(ssn)
  const { countyCode, code } = getPlaceParts(place)
  return [gender, year, month, countyCode, code, rank, controlKey].join(" ")
}
