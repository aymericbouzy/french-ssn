import checkControlKey from "./checkControlKey"

it("has a correct control key", () => {
  expect(() => checkControlKey("2780569339089", "23")).toThrow(
    "Control key does not match (expected 41)",
  )
})

it("accepts number ending in 98", () => {
  expect(() => checkControlKey("2780569339089", "98")).not.toThrow()
})
