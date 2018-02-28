import makeGender from "./makeGender"

it("returns the gender", () => {
  ;[1, 3, 7].map(gender => {
    expect(makeGender(gender.toString())).toEqual({ name: "male" })
  })
  ;[(2, 4, 8)].map(gender => {
    expect(makeGender(gender.toString())).toEqual({ name: "female" })
  })
})

it("has possible gender", () => {
  expect(makeGender("0")).toEqual({
    unknown: true,
    error: "has to be among 1, 2, 3, 4, 7 and 8",
  })
})
