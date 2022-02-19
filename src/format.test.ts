import format from "./format"

it("formats SSN", () => {
  expect(format("255081416802538")).toBe("2 55 08 14 168 025 38")
})
