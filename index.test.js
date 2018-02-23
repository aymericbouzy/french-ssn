import { parse, getControlKey } from "./index"

const tap = arg => {
  console.log(arg)
  return arg
}

const makeSSN = ({
  gender = "2",
  year = "89",
  month = "04",
  place = "78342",
  rank = "163",
  controlKey,
}) => {
  const partial = `${gender}${year}${month}${place}${rank}`
  return `${partial}${controlKey || tap(getControlKey(partial))}`
}

describe("invalid SSN", () => {
  it("is a string", () => {
    expect(() => parse()).toThrow(
      "French Social Security Number must be a string",
    )
    expect(() => parse(123)).toThrow(
      "French Social Security Number must be a string",
    )
    expect(() => parse({})).toThrow(
      "French Social Security Number must be a string",
    )
    expect(() => parse([1, 23, 34])).toThrow(
      "French Social Security Number must be a string",
    )
  })

  it("has 15 characters", () => {
    expect(() => parse("12345671234567")).toThrow(
      "French Social Security Number must be 15 characters long",
    )
    expect(() => parse("1234567812345678")).toThrow(
      "French Social Security Number must be 15 characters long",
    )
  })

  it("has only (mostly) digits", () => {
    expect(() => parse(makeSSN({ year: "5a" }))).toThrow(
      "French Social Security Number only allows digits, except for the letters a and b in 7th position",
    )
  })

  it("has possible month of birth", () => {
    expect(() => parse(makeSSN({ month: "45" }))).toThrow(
      "Month appears to be incorrect",
    )
  })

  it("has possible gender", () => {
    expect(() => parse(makeSSN({ gender: "0" }))).toThrow(
      "Gender has to be among 1, 2, 3, 4, 7 and 8",
    )
  })
})

describe("correct SSN", () => {
  it("has a correct control key", () => {
    expect(() => parse(makeSSN({ controlKey: "23" }))).toThrow(
      "Control key does not match (expected 49)",
    )
  })
})

describe("result", () => {
  it("provides the gender", () => {
    ;[1, 3, 7].map(gender => {
      expect(parse(makeSSN({ gender })).gender).toBe("male")
    })
    ;[(2, 4, 8)].map(gender => {
      expect(parse(makeSSN({ gender })).gender).toBe("female")
    })
  })
  it("provides the title")
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
    it("works for Corsica (both upperCase and lowerCase)")
    it("works for Algeria before 1962")
    it("works with unknown birth month")
    it("works when controlKey is below 10")
  })
})
