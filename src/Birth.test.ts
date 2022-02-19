import Birth from "./Birth"

describe("Birth", () => {
  describe("approximate date", () => {
    const makeDate = (year: number, month: number, day: number) =>
      new Date(Date.UTC(year, month - 1, day)).toISOString()

    it("computes approximate birth date", () => {
      expect(new Birth("04", "83", "78551").approximateDate.toISOString()).toBe(
        makeDate(1983, 4, 16),
      )
    })

    describe("february", () => {
      it("computes approximate birth date", () => {
        expect(
          new Birth("02", "83", "78551").approximateDate.toISOString(),
        ).toBe(makeDate(1983, 2, 15))
      })
    })

    describe("august", () => {
      it("computes approximate birth date", () => {
        expect(
          new Birth("08", "83", "78551").approximateDate.toISOString(),
        ).toBe(makeDate(1983, 8, 17))
      })
    })

    describe("month is missing", () => {
      it("computes approximate birth date", () => {
        expect(
          new Birth("20", "83", "99999").approximateDate.toISOString(),
        ).toBe(makeDate(1983, 7, 3))
      })
    })
  })

  describe("approximate age", () => {
    it("computes approximate age", () => {
      Date.now = jest.fn(() => new Date("2018-01-02").valueOf())

      expect(new Birth("01", "80", "78551").approximateAge).toBe(38)
    })

    describe("birthDate is soon to come", () => {
      it("adds approximate age", () => {
        Date.now = jest.fn(() => new Date("2018-01-02").valueOf())

        expect(new Birth("02", "80", "78551").approximateAge).toBe(37)
      })
    })
  })
})
