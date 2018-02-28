import between from "./between"
import countries from "../../data/countries.json"
import cities from "../../data/cities.json"
import counties from "../../data/counties.json"
import algerianCities from "../../data/algerianCities.json"
import unknown from "./unknown"

const makeGetInsee = ({
  items,
  merge = (insee, name) => ({ insee, name }),
  error,
}) => insee => {
  const item = items[insee]
  if (!item) {
    return { insee, ...unknown(error) }
  }
  return merge(insee, item)
}

const makeGetCity = ({ cities }) =>
  makeGetInsee({
    items: cities,
    merge: (insee, city) => {
      const [postalCode, name] = city
      return { postalCode, name, insee }
    },
  })

const getCountry = makeGetInsee({ items: countries })
const getCounty = makeGetInsee({
  items: counties,
  error: "appears to be incorrect",
})
const getCity = makeGetCity({ cities })
const getAlgerianCity = makeGetCity({
  cities: algerianCities,
})
const getTunisianCity = makeGetCity({
  cities: {},
})
const getmoroccanCity = makeGetCity({
  cities: {},
})

const makePlace = ({ country, county = unknown(), city = unknown() }) => {
  return {
    country: country || (county.unknown ? unknown() : getCountry("100")),
    county,
    city,
  }
}

export default (insee, year) => {
  const result = /^([0-8][0-9]|2[abAB]|9[0-69]|9[78][0-9])(\d+)$/.exec(insee)
  if (!result) {
    throw new Error(`Unkown error`)
  }
  const [countyCode, code] = result.slice(1)
  if (countyCode === "99") {
    return makePlace({
      country: getCountry(code),
    })
  }
  if (year) {
    if (between(91, countyCode, 94) && year <= 1962) {
      return makePlace({
        country: getCountry("352"),
        city: getAlgerianCity(insee),
      })
    }
    if (countyCode === "95" && year <= 1964) {
      return makePlace({
        country: getCountry("350"),
        city: getTunisianCity(insee),
      })
    }
    if (countyCode === "96" && year <= 1964) {
      return makePlace({
        country: getCountry("351"),
        city: getmoroccanCity(insee),
      })
    }
  }
  return makePlace({
    county: getCounty(countyCode),
    city: getCity(insee),
  })
}
