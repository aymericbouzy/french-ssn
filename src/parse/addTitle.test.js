import addTitle from "./addTitle"

it(`adds "M" if gender is male`, () => {
  const result = { gender: { name: "male" } }
  addTitle(result)
  expect(result).toEqual({
    gender: {
      name: "male",
      title: "M",
    },
  })
})
it(`adds "Mme" if gender is female`, () => {
  const result = { gender: { name: "female" } }
  addTitle(result)
  expect(result).toEqual({
    gender: {
      name: "female",
      title: "Mme",
    },
  })
})

it(`does not add title if gender is unknown`, () => {
  const result = { gender: { unknown: true } }
  addTitle(result)
  expect(result).toEqual({
    gender: {
      unknown: true,
    },
  })
})
