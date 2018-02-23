import getControlKey from "./getControlKey"
import pad from "./pad"

const lengths = [1, 2, 2, 5, 3]

export default ({
  gender = "2",
  year = "89",
  month = "04",
  place = "78342",
  rank = "163",
  controlKey,
}) => {
  const partial = [gender, year, month, place, rank]
    .map((value, index) => pad(value, lengths[index]))
    .join("")
  return `${partial}${controlKey || getControlKey(partial)}`
}
