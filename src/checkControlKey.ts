import getControlKey from "./getControlKey"

export default (partialSsn: string | number, controlKey: string) => {
  if (controlKey !== "98") {
    const expectedControlKey = getControlKey(partialSsn)
    if (controlKey != expectedControlKey) {
      throw new Error(
        `Control key does not match (expected ${expectedControlKey})`,
      )
    }
  }
}
