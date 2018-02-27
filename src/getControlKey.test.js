import getControlKey from "./getControlKey"

it("returns the expected control key", () => {
  expect(getControlKey("2890478342163")).toBe("49")
  expect(getControlKey("2890478342212")).toBe("97")
})

it("pads the key with zeros", () => {
  expect(getControlKey("2890478342210")).toBe("02")
})

it("works for Corsica", () => {
  expect(getControlKey("289042A342163")).toBe("90")
  expect(getControlKey("289042B342163")).toBe("20")
})
