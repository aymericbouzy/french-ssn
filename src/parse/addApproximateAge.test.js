import addApproximateAge from "./addApproximateAge"

it("adds approximate age", () => {
  Date.now = jest.fn(() => "2018-01-02")

  const data = {
    birth: {
      approximateDate: new Date("1980-01-01"),
    },
  }
  addApproximateAge(data)
  expect(data.approximateAge).toBe(38)
})

describe("birthDate is soon to come", () => {
  it("adds approximate age", () => {
    Date.now = jest.fn(() => "2018-01-02")

    const data = {
      birth: {
        approximateDate: new Date("1980-02-01"),
      },
    }
    addApproximateAge(data)
    expect(data.approximateAge).toBe(37)
  })
})
