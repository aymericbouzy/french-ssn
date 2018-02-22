import { parsor } from "./index"

describe("invalid SSN", () => {
  it("is a string", () => {
    expect(() => parsor()).toThrow(
      "French Social Security Number must be a string",
    )
    expect(() => parsor(123)).toThrow(
      "French Social Security Number must be a string",
    )
    expect(() => parsor({})).toThrow(
      "French Social Security Number must be a string",
    )
    expect(() => parsor([1, 23, 34])).toThrow(
      "French Social Security Number must be a string",
    )
  })

  it("has 15 characters", () => {
    expect(() => parsor("12345671234567")).toThrow(
      "French Social Security Number must be 15 characters long",
    )
    expect(() => parsor("1234567812345678")).toThrow(
      "French Social Security Number must be 15 characters long",
    )
  })

  it("has only (mostly) digits", () => {
    expect(() => parsor("12345123451234a")).toThrow(
      "French Social Security Number only allows digits, except for the letters a and b in 7th position",
    )
  })
})

describe("correct SSN", () => {
  it("has a correct check")
})

describe("result", () => {
  it("provides the title")
  it("provides the gender")
  it("provides the year of birth")
  it("provides the month of birth")
  it("provides the date of birth (1 month approximate)")

  describe("born in France", () => {
    it("provides the birth county code")
    it("provides the birth county name")
    it("provides the birth city insee code")
    it("provides the birth city name")
    it("provides the birth city postal code")
  })

  describe("born abroad", () => {
    it("provides the birth country code")
    it("provides the birth country name")
  })

  describe("corner cases", () => {
    it("works for Corsica (both cases)")
    it("works for Algeria before 1962")
  })
})
