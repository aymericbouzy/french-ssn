import makeMonth from "./makeMonth"

it("has possible month of birth", () => {
  expect(() => makeMonth("45")).toThrow("Month appears to be incorrect")
})
it("provides the month of birth", () => {
  expect(makeMonth("03")).toEqual({ index: 3, name: "mars" })
})
