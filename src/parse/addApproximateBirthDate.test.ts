import addApproximateBirthDate from "./addApproximateBirthDate"

const makeDate = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month - 1, day)).toISOString()
it("adds approximate birth date", () => {
  const data = {
    birth: {
      year: 1983,
      month: {
        index: 4,
      },
    },
  }
  addApproximateBirthDate(data)
  // @ts-ignore FIXME
  expect(data.birth.approximateDate.toISOString()).toBe(makeDate(1983, 4, 16))
})

describe("february", () => {
  it("adds approximate birth date", () => {
    const data = {
      birth: {
        year: 1983,
        month: {
          index: 2,
        },
      },
    }
    addApproximateBirthDate(data)
    // @ts-ignore FIXME
    expect(data.birth.approximateDate.toISOString()).toBe(makeDate(1983, 2, 15))
  })
})

describe("august", () => {
  it("adds approximate birth date", () => {
    const data = {
      birth: {
        year: 1983,
        month: {
          index: 8,
        },
      },
    }
    addApproximateBirthDate(data)
    // @ts-ignore FIXME
    expect(data.birth.approximateDate.toISOString()).toBe(makeDate(1983, 8, 17))
  })
})

describe("month is missing", () => {
  it("adds approximate birth date", () => {
    const data = {
      birth: {
        year: 1983,
        month: {
          unkown: true,
        },
      },
    }
    addApproximateBirthDate(data)
    // @ts-ignore FIXME
    expect(data.birth.approximateDate.toISOString()).toBe(makeDate(1983, 7, 3))
  })
})
