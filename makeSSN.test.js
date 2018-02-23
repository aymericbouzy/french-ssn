import makeSSN from "./makeSSN"

it("auto fills control key", () => {
  expect(
    makeSSN({
      gender: 2,
      year: 78,
      month: 5,
      place: "69339",
      rank: "089",
    }),
  ).toBe("278056933908941")
})

it("allows custom control key (for tests)", () => {
  expect(
    makeSSN({
      gender: 2,
      year: 78,
      month: 5,
      place: "69339",
      rank: "089",
      controlKey: 23,
    }),
  ).toBe("278056933908923")
})
