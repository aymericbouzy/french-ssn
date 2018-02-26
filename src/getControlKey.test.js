import getControlKey from "./getControlKey"

it("returns the expected control key", () => {
  expect(getControlKey("2890478342163")).toBe("49")
  expect(getControlKey("2890478342212")).toBe("97")
})

it("pads the key with zeros", () => {
  expect(getControlKey("2890478342210")).toBe("02")
})
