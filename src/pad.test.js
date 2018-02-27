import pad from "./pad"

it("adds missing zeros", () => {
  expect(pad(2, 5)).toBe("00002")
  expect(pad(45, 2)).toBe("45")
})

it("allows strings with leading zeros", () => {
  expect(pad("089", 3)).toBe("089")
})

it("works for powers of 10", () => {
  expect(pad(1, 2)).toBe("01")
  expect(pad(10, 2)).toBe("10")
})

it("throws on input that is not a number or a string", () => {
  expect(() => pad(undefined, 2)).toThrow("Cannot pad")
})
