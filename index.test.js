describe("invalid SSN", () => {
  it("has more than 15 digits")
  it("has other characters than digits")
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
})
