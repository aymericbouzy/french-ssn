import makeYear from "./makeYear"

it("works for various years", () => {
  Date.now = jest.fn(() => new Date("2023"))
  expect(makeYear("92")).toBe(1992)
  expect(makeYear("23")).toBe(2023)
  expect(makeYear("24")).toBe(1924)
  expect(makeYear("00")).toBe(2000)
  expect(makeYear("07")).toBe(2007)
  Date.now = jest.fn(() => new Date("2018"))
  expect(makeYear("23")).toBe(1923)
})
