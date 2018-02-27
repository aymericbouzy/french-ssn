import makePlace from "./makePlace"

describe("birth country", () => {
  it("is born in France", () => {
    expect(makePlace("78403").country).toEqual({
      insee: "100",
      name: "France",
    })
  })

  it("is born abroad", () => {
    expect(makePlace("99351").country).toEqual({
      insee: "351",
      name: "Tunisie",
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
    expect(() => makePlace("96101", 1965).country).toThrow(
      "Il ne semble pas y avoir de département ayant le code Insee 96",
    )
  })

  it("works for DOM", () => {
    expect(makePlace("97801").country).toEqual({
      insee: "100",
      name: "France",
    })
  })
})

it("rejects 00 and 20 county codes", () => {
  ;["00", "20"].map(countyCode => {
    expect(() => makePlace(`${countyCode}101`)).toThrow(
      `Il ne semble pas y avoir de département ayant le code Insee ${countyCode}`,
    )
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
    name: "CALCATOGGIO",
    postalCode: "20111",
  })
})

it("includes the city when born in France", () => {
  expect(makePlace("78396").city).toEqual({
    insee: "78396",
    name: "LE MESNIL-LE-ROI",
    postalCode: "78600",
  })
})

it("includes the city when born in Algeria before 1962", () => {
  expect(makePlace("91112", 1956).city).toEqual({
    insee: "91112",
    name: "Aïn-Taya",
    postalCode: null,
  })

  expect(makePlace("91112", 1978).city).toEqual({
    insee: "91112",
    name: "BROUY",
    postalCode: "91150",
  })
})

it("throws if input is not a string of 5 digits", () => {
  expect(() => makePlace()).toThrow("Unkown error")
})
