import between from "./between"
import countries from "../../data/countries.json"
import counties from "../../data/counties.json"
import unknown, { UnknownField } from "./unknown"

const makeGetInsee =
  ({ items, error }: { items: Record<string, string>; error?: string }) =>
  (
    insee: string,
  ):
    | { insee: string; name: string; unknown: undefined }
    | ({ insee: string } & UnknownField) => {
    const item = items[insee]
    if (!item) {
      return { insee, ...unknown(error) }
    }
    return { insee, name: item, unknown: undefined }
  }

const getCountry = makeGetInsee({ items: countries })
const getCounty = makeGetInsee({
  items: counties,
  error: "appears to be incorrect",
})

export interface Place {
  country: UnknownField | ReturnType<typeof getCountry>
  county: UnknownField | ReturnType<typeof getCounty>
  city: UnknownField | { insee: string }
}

const makePlace = ({
  country,
  county = unknown(),
  city = unknown(),
}: Partial<Place>): Place => {
  return {
    country: country || (county.unknown ? unknown() : getCountry("100")),
    county,
    city,
  }
}

const re = /^([0-8][0-9]|2[abAB]|9[0-69]|9[78][0-9])(\d+)$/

export const getParts = (insee: string) => {
  const result = re.exec(insee)
  if (!result) {
    throw new Error(`Unkown error`)
  }
  const [countyCode, code] = result.slice(1)
  return { countyCode, code }
}

export default (insee: string, year?: number) => {
  const { countyCode, code } = getParts(insee)
  if (countyCode === "99") {
    return makePlace({
      country: getCountry(code),
    })
  }
  if (year) {
    if (between(91, Number(countyCode), 94) && year <= 1962) {
      return makePlace({
        country: getCountry("352"),
        city: { insee },
      })
    }
    if (countyCode === "95" && year <= 1964) {
      return makePlace({
        country: getCountry("350"),
        city: { insee },
      })
    }
    if (countyCode === "96" && year <= 1964) {
      return makePlace({
        country: getCountry("351"),
        city: { insee },
      })
    }
  }
  return makePlace({
    county: getCounty(countyCode),
    city: { insee },
  })
}
