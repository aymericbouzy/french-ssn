const padKey = key => (key < 10 ? `0${key}` : `${key}`)

export default partialSsn => {
  return padKey(97 - parseInt(partialSsn.replace(/[abAB]/, "0")) % 97)
}
