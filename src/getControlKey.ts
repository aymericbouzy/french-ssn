import pad from "./pad"
import normalize from "./normalize"

const makeInt = (string: string) => {
  let penalties = 0
  string = string.replace(/a/gi, () => {
    penalties += 1000000
    return "0"
  })
  string = string.replace(/b/gi, () => {
    penalties += 2000000
    return "0"
  })
  return parseInt(string) - penalties
}

export default (partialSsn: string | number) => {
  const number = makeInt(normalize(partialSsn, { length: 13 }))
  return pad(97 - (number % 97), 2)
}
