import pad from "./pad"

export default partialSsn => {
  return pad(97 - parseInt(partialSsn.replace(/[abAB]/, "0")) % 97, 2)
}
