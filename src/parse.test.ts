import parse from "./parse"
import makeSSN from "./makeSSN"

describe("born in France", () => {
  it("returns expected result", () => {
    Date.now = jest.fn(() => new Date("2018").valueOf())
    expect(
      parse(
        makeSSN({
          gender: "2",
          month: 4,
          year: 89,
          place: "78650",
        }),
      ),
    ).toEqual({
      provisional: false,
      gender: {
        name: "female",
        title: "Mme",
      },
      approximateAge: 28,
      birth: {
        year: 1989,
        month: {
          name: "avril",
          index: 4,
        },
        approximateDate: expect.any(Date),
        city: {
          insee: "78650",
        },
        country: {
          insee: "100",
          name: "France",
        },
        county: {
          insee: "78",
          name: "Yvelines",
        },
      },
    })
  })
})

describe("provisional number", () => {
  it("is provisional if gender is greater than 2", () => {
    const ssn = parse(makeSSN({ gender: 3 }))
    expect(ssn.provisional).toBe(true)
  })

  it("is provisional if controlKey is 98", () => {
    const ssn = parse(makeSSN({ controlKey: 98 }))
    expect(ssn.provisional).toBe(true)
  })

  it("is not provisional otherwise", () => {
    const ssn = parse(makeSSN({ gender: 1 }))
    expect(ssn.provisional).toBe(false)
  })
})

describe("corner cases", () => {
  it("works with unknown birth month", () => {
    expect(
      parse(
        makeSSN({
          month: 20,
        }),
      ),
    ).toEqual(
      expect.objectContaining({
        birth: expect.objectContaining({
          month: {
            unknown: true,
          },
        }),
      }),
    )
  })

  it("throws an error if weird format", () => {
    expect(() => parse(makeSSN({ place: "7b231" }))).toThrow("Unexpected error")
  })
})
