import between from "./between"
import unknown, { UnknownField } from "./unknown"

const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
]

export type Month =
  | UnknownField
  | {
      name: string
      index: number
      unknown: undefined
    }

export default (monthAsString: string): Month => {
  const month = Number(monthAsString)
  if (between(1, month, 12)) {
    return {
      name: months[month - 1],
      index: month,
      unknown: undefined,
    }
  }
  if (between(30, month, 42) || between(50, month, 99) || month === 20) {
    return unknown()
  }
  return unknown("appears to be incorrect")
}
