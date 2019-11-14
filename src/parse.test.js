import parse from "./parse"
import makeSSN from "./makeSSN"

describe("born in France", () => {
  it("returns expected result", () => {
    Date.now = jest.fn(() => new Date("2018"))
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

describe("corner cases", () => {
  it("works with unknown birth month", () => {
    expect(
      parse(
        makeSSN({
          month: 20,
        }),
        "hello",
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
