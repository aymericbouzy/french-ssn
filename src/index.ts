import getControlKey from "./getControlKey"
import parse from "./parse"
import make from "./makeSSN"
import format from "./format"

export { getControlKey, parse, make }
export const validate = (ssn: string | number) => {
  try {
    parse(ssn)
    return true
  } catch (error) {
    return false
  }
}

export default {
  getControlKey,
  parse,
  validate,
  make,
  format,
}
