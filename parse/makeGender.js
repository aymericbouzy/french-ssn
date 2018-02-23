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
      throw new Error("Gender has to be among 1, 2, 3, 4, 7 and 8")
  }
}
