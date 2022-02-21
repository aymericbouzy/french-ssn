import unknown, { UnknownField } from "./unknown"

export type Gender =
  | UnknownField
  | {
      name: string
      title: "M" | "Mme"
    }

export default (genderAsString: string): Gender => {
  const gender = Number(genderAsString)
  switch (gender) {
    case 1:
    case 3:
    case 7:
      return { name: "male", title: "M" }
    case 2:
    case 4:
    case 8:
      return { name: "female", title: "Mme" }
    default:
      return unknown("has to be among 1, 2, 3, 4, 7 and 8")
  }
}
