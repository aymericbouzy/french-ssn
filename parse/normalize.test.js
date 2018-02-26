import normalize from "./normalize"
import makeSSN from "../makeSSN"

it("is a string", () => {
  expect(() => normalize()).toThrow(
    "French Social Security Number must be a string",
  )
  expect(() => normalize({})).toThrow(
    "French Social Security Number must be a string",
  )
  expect(() => normalize([1, 23, 34])).toThrow(
    "French Social Security Number must be a string",
  )
})

it("has 15 characters", () => {
  expect(() => normalize("12345671234567")).toThrow(
    "French Social Security Number must be 15 characters long",
  )
  expect(() => normalize("1234567812345678")).toThrow(
    "French Social Security Number must be 15 characters long",
  )
})

it("has only (mostly) digits", () => {
  expect(() => normalize(makeSSN({ year: "5a" }))).toThrow(
    "French Social Security Number only allows digits, except for the letters A and B in 7th position",
  )
})

it("accepts spaces", () => {
  expect(normalize("2 55 08 14 168 025 12")).toBe("255081416802512")
})

it("accepts all sorts of things", () => {
  expect(normalize("SSN: 2 55,08 2B.168    025 12qgls")).toBe("255082B16802512")
})

it("accepts numbers", () => {
  expect(normalize(255081416802512)).toBe("255081416802512")
})
