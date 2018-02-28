import unknown from "./unknown"

export default gender => {
  gender = parseInt(gender)
  switch (gender) {
    case 1:
    case 3:
    case 7:
      return "male"
    case 2:
    case 4:
    case 8:
      return "female"
    default:
      return unknown("has to be among 1, 2, 3, 4, 7 and 8")
  }
}
