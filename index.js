import getControlKey from "./getControlKey"
import parseRaw from "./parse"
import addDetails from "./addDetails"

export { getControlKey }
export const parse = ssn => addDetails(parseRaw(ssn))
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
