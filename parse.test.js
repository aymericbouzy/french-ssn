import parse from "./parse"
import makeSSN from "./makeSSN"

describe("invalid SSN", () => {})

describe("correct SSN", () => {
  it("has a correct control key", () => {
    expect(() => parse(makeSSN({ controlKey: "23" }))).toThrow(
      "Control key does not match (expected 49)",
    )
  })
})

describe("result", () => {
  describe("born in France", () => {
    it("provides the birth county code")
    it("provides the birth city insee code")
  })

  describe("born abroad", () => {
    it("provides the birth country code")
  })

  describe("corner cases", () => {
    it("works for Corsica (both upperCase and lowerCase)")
    it("works for Algeria before 1962")
    it("works with unknown birth month")
  })
})
