import addProvisional from "./addProvisional"

it("adds provisional true when gender is greater than 2", () => {
  const result = {}
  addProvisional(result, 3)
  expect(result).toEqual({ provisional: true })
})

it("adds provisional false when gender is lower than 2", () => {
  const result = {}
  addProvisional(result, 2)
  expect(result).toEqual({ provisional: false })
})
