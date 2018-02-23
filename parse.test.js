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
        }),
      ),
    ).toEqual({
      gender: "female",
      birth: {
        year: 1989,
        month: {
          name: "avril",
          index: 4,
        },
      },
    })
  })
})

describe("born abroad", () => {
  it("provides the birth country code")
})

describe("corner cases", () => {
  it("works for Corsica (both upperCase and lowerCase)")
  it("works for Algeria before 1962")
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
})
