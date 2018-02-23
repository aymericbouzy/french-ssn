import makePlace from "./makePlace"

describe("birth country", () => {
  it("is born in France", () => {
    expect(makePlace("78403").country).toEqual({
      code: 100,
      name: "France",
    })
  })

  it("is born abroad", () => {
    expect(makePlace("99351").country).toEqual({
      code: 351,
      name: "Tunisie",
    })
  })

  it("works for Algerian people before 1962", () => {
    ;["91", "92", "93", "94"].map(countyCode => {
      const place = `${countyCode}101`
      expect(makePlace(place, 1962).country).toEqual({
        code: 352,
        name: "Algérie",
      })
      expect(makePlace(place, 1963).country).toEqual({
        code: 100,
        name: "France",
      })
    })
  })

  it("works for Morocan people before 1964", () => {
    expect(makePlace("95101", 1964).country).toEqual({
      code: 350,
      name: "Maroc",
    })
    expect(makePlace("95101", 1965).country).toEqual({
      code: 100,
      name: "France",
    })
  })

  it("works for Tunisian people before 1964", () => {
    expect(makePlace("96101", 1964).country).toEqual({
      code: 351,
      name: "Tunisie",
    })
    expect(makePlace("96101", 1965).country).toEqual({
      code: 100,
      name: "France",
    })
  })

  it("works for DOM", () => {
    expect(makePlace("97801").country).toEqual({
      code: 100,
      name: "France",
    })
  })
})

it("rejects 00 and 20 county codes", () => {
  ;["00, 20"].map(countyCode => {
    expect(() => makePlace(`${countyCode}101`)).toThrow(
      `Le département ${countyCode} n'existe pas.`,
    )
  })
})

it("includes the county name when born in France", () => {
  expect(makePlace("78304").county).toEqual({
    index: 78,
    name: "Yvelines",
  })

  expect(makePlace("97801").county).toEqual({
    index: 978,
    name: "Saint-Martin",
  })
})

it("includes the city when born in France", () => {
  expect(makePlace("78396").city).toEqual({
    index: "78396",
    name: "LE MESNIL LE ROI",
  })
})

it("includes the city when born in Algeria before 1962", () => {
  expect(makePlace("91112", 1956).city).toEqual({
    index: "91112",
    name: "Aïn-Taya",
  })

  expect(makePlace("91112", 1978).city).toEqual({
    index: "91112",
    name: "BROUY",
  })
})
