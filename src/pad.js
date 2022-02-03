const getLength = (string) => {
  if (typeof string === "number") {
    string = string.toString()
  }
  if (typeof string === "string") {
    return string.length
  }
  throw new Error("Cannot pad", string)
}

export default (string, length) => {
  return `${"0".repeat(length - getLength(string))}${string}`
}
