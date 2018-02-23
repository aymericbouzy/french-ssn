import checkFormat from "./checkFormat"
import makeSSN from "../makeSSN"

it("is a string", () => {
  expect(() => checkFormat()).toThrow(
    "French Social Security Number must be a string",
  )
  expect(() => checkFormat(123)).toThrow(
    "French Social Security Number must be a string",
  )
  expect(() => checkFormat({})).toThrow(
    "French Social Security Number must be a string",
  )
  expect(() => checkFormat([1, 23, 34])).toThrow(
    "French Social Security Number must be a string",
  )
})

it("has 15 characters", () => {
  expect(() => checkFormat("12345671234567")).toThrow(
    "French Social Security Number must be 15 characters long",
  )
  expect(() => checkFormat("1234567812345678")).toThrow(
    "French Social Security Number must be 15 characters long",
  )
})

it("has only (mostly) digits", () => {
  expect(() => checkFormat(makeSSN({ year: "5a" }))).toThrow(
    "French Social Security Number only allows digits, except for the letters A and B in 7th position",
  )
})
