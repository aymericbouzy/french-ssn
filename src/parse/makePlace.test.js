import makePlace from "./makePlace"

describe("birth country", () => {
  it("is born in France", () => {
    expect(makePlace("78403").country).toEqual({
      insee: "100",
      name: "France",
    })
  })

  it("is born abroad", () => {
    expect(makePlace("99351")).toEqual({
      country: {
        insee: "351",
        name: "Tunisie",
      },
      county: {
        unknown: true,
      },
      city: {
        unknown: true,
      },
    })
  })

  it("works for Algerian people before 1962", () => {
    ;["91112", "92519", "93101", "94423"].map(insee => {
      expect(makePlace(insee, 1962).country).toEqual({
        insee: "352",
        name: "Algérie",
      })
      expect(makePlace(insee, 1963).country).toEqual({
        insee: "100",
        name: "France",
      })
    })
  })

  it("works for Morocan people before 1964", () => {
    expect(makePlace("95101", 1964).country).toEqual({
      insee: "350",
      name: "Maroc",
    })
    expect(makePlace("95101", 1965).country).toEqual({
      insee: "100",
      name: "France",
    })
  })

  it("works for Tunisian people before 1964", () => {
    expect(makePlace("96101", 1964).country).toEqual({
      insee: "351",
      name: "Tunisie",
    })
    expect(makePlace("96101", 1965).country).toEqual({ unknown: true })
  })

  it("works for DOM", () => {
    expect(makePlace("97801").country).toEqual({
      insee: "100",
      name: "France",
    })
  })
})

it("00, 20 and 96 county codes have an unknown country", () => {
  ;["00", "20", "96"].map(countyCode => {
    expect(makePlace(`${countyCode}101`, 1980)).toEqual({
      city: { insee: `${countyCode}101` },
      country: { unknown: true },
      county: {
        insee: countyCode,
        unknown: true,
        error: "appears to be incorrect",
      },
    })
  })
})

it("includes the county name when born in France", () => {
  expect(makePlace("78304").county).toEqual({
    insee: "78",
    name: "Yvelines",
  })

  expect(makePlace("97801").county).toEqual({
    insee: "978",
    name: "Saint-Martin",
  })
})

it("works for Corsica", () => {
  expect(makePlace("2A048").county).toEqual({
    insee: "2A",
    name: "Corse-du-Sud",
  })
  expect(makePlace("2A048").city).toEqual({
    insee: "2A048",
  })
})

it("includes the city when born in France", () => {
  expect(makePlace("78396").city).toEqual({
    insee: "78396",
  })
})

it("includes the city when born in Algeria before 1962", () => {
  expect(makePlace("91112", 1956).city).toEqual({
    insee: "91112",
  })

  expect(makePlace("91112", 1978).city).toEqual({
    insee: "91112",
  })
})

it("throws if input is not a string of 5 digits", () => {
  expect(() => makePlace()).toThrow("Unkown error")
})
