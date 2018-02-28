import getControlKey from "./getControlKey"
import parse from "./parse"
import make from "./makeSSN"

export { getControlKey, parse, make }
export const validate = ssn => {
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
}
