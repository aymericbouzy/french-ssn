import pad from "./pad"

it("adds missing zeros", () => {
  expect(pad(2, 5)).toBe("00002")
  expect(pad(45, 2)).toBe("45")
})

it("allows strings with leading zeros", () => {
  expect(pad("089", 3)).toBe("089")
})
