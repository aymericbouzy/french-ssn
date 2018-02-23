import makeGender from "./makeGender"

it("returns the gender", () => {
  ;[1, 3, 7].map(gender => {
    expect(makeGender(gender.toString())).toBe("male")
  })
  ;[(2, 4, 8)].map(gender => {
    expect(makeGender(gender.toString())).toBe("female")
  })
})

it("has possible gender", () => {
  expect(() => makeGender("0")).toThrow(
    "Gender has to be among 1, 2, 3, 4, 7 and 8",
  )
})