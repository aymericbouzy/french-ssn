import getControlKey from "./getControlKey"

export default (partialSsn, controlKey) => {
  const expectedControlKey = getControlKey(partialSsn)
  if (controlKey != expectedControlKey) {
    throw new Error(
      `Control key does not match (expected ${expectedControlKey})`,
    )
  }
}
