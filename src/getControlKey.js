import pad from "./pad"
import normalize from "./normalize"

export default partialSsn => {
  const number = parseInt(
    normalize(partialSsn, { length: 13 }).replace(/[abAB]/, "0"),
  )
  return pad(97 - number % 97, 2)
}
