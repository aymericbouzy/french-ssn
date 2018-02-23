import getControlKey from "./getControlKey"
import parse from "./parse"

export { getControlKey, parse }
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
}
