import between from "./between"
import countries from "./countries.json"
import cities from "./cities.json"
import counties from "./counties.json"
import algerianCities from "./algerianCities.json"
// import tunisianCities from "./tunisianCities.json"
// import moroccanCities from "./moroccanCities.json"

const makeGetInsee = ({
  items,
  name,
  merge = (insee, name) => ({ insee, name }),
  skipError = false,
}) => insee => {
  const item = items[insee]
  if (!item && !skipError) {
    throw new Error(
      `Il ne semble pas y avoir de ${name} ayant le code Insee ${insee}`,
    )
  }
  return merge(insee, item)
}

const makeGetCity = ({ cities, name }) =>
  makeGetInsee({
    items: cities,
    name,
    merge: (insee, city = []) => {
      const [postalCode, name] = city
      return { postalCode, name, insee }
    },
    skipError: true,
  })

const getCountry = makeGetInsee({ items: countries, name: "pays" })
const getCounty = makeGetInsee({ items: counties, name: "département" })
const getCity = makeGetCity({ cities, name: "commune" })
const getAlgerianCity = makeGetCity({
  cities: algerianCities,
  name: "commune algérienne",
})
const getTunisianCity = makeGetCity({
  cities: {},
  name: "commune tunisienne",
})
const getmoroccanCity = makeGetCity({
  cities: {},
  name: "commune marocaine",
})

export default (insee, year) => {
  const result = /^([0-8][0-9]|2[abAB]|9[0-69]|9[78][0-9])(\d+)$/.exec(insee)
  if (!result) {
    throw new Error(`Unkown error`)
  }
  const [countyCode, code] = result.slice(1)
  if (countyCode === "99") {
    return {
      country: getCountry(code),
    }
  }
  if (year) {
    if (between(91, countyCode, 94) && year <= 1962) {
      return { country: getCountry("352"), city: getAlgerianCity(insee) }
    }
    if (countyCode === "95" && year <= 1964) {
      return { country: getCountry("350"), city: getTunisianCity(insee) }
    }
    if (countyCode === "96" && year <= 1964) {
      return { country: getCountry("351"), city: getmoroccanCity(insee) }
    }
  }
  return {
    country: getCountry("100"),
    county: getCounty(countyCode),
    city: getCity(insee),
  }
}
