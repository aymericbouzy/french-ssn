const getLength = string => {
  if (typeof string === "number") {
    return Math.ceil(Math.log(string) / Math.log(10))
  }
  if (typeof string === "string") {
    return string.length
  }
  throw new Error("Cannot pad", string)
}

export default (string, length) => {
  return `${"0".repeat(length - getLength(string))}${string}`
}
