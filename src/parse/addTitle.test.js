import addTitle from "./addTitle"

it(`adds "M" if gender is male`, () => {
  const result = { gender: "male" }
  addTitle(result)
  expect(result).toEqual({
    gender: "male",
    title: "M",
  })
})
it(`adds "Mme" if gender is female`, () => {
  const result = { gender: "female" }
  addTitle(result)
  expect(result).toEqual({
    gender: "female",
    title: "Mme",
  })
})
