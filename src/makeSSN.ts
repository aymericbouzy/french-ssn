import getControlKey from "./getControlKey"
import pad from "./pad"

const lengths = [1, 2, 2, 5, 3]

export interface SsnInput {
  gender?: string | number
  year?: string | number
  month?: string | number
  place?: string | number
  rank?: string | number
  controlKey?: string | number
}

export default ({
  gender = "2",
  year = "89",
  month = "04",
  place = "78650",
  rank = "163",
  controlKey,
}: SsnInput) => {
  const partial = [gender, year, month, place, rank]
    .map((value, index) => pad(value, lengths[index]))
    .join("")
  return `${partial}${controlKey || getControlKey(partial)}`
}
