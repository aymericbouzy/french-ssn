import makeMonth, { Month } from "./parse/makeMonth"
import makePlace, { Place } from "./parse/makePlace"
import makeYear from "./parse/makeYear"

export default class Birth {
  readonly month: Month
  readonly year: number
  readonly country: Place["country"]
  readonly county: Place["county"]
  readonly city: Place["city"]

  constructor(month: string, year: string, place: string) {
    this.month = makeMonth(month)
    this.year = makeYear(year)

    const { country, county, city } = makePlace(place, this.year)

    this.country = country
    this.county = county
    this.city = city
  }

  get approximateDate() {
    return makeApproximateBirthDate(this)
  }

  get approximateAge() {
    return makeApproximateAge(this.approximateDate)
  }

  toJSON() {
    const {
      month,
      year,
      country,
      county,
      city,
      approximateDate,
      approximateAge,
    } = this

    return {
      month,
      year,
      country,
      county,
      city,
      approximateDate,
      approximateAge,
    }
  }
}

const millisecondsCountInOneDay = 1000 * 60 * 60 * 24

const dateBetween = (start: Date, end: Date) => {
  const date = new Date(start.valueOf())
  date.setUTCDate(
    date.getUTCDate() +
      Math.round(
        (end.valueOf() - start.valueOf()) / millisecondsCountInOneDay / 2,
      ),
  )
  return date
}

const makeApproximateBirthDate = ({ year, month }: Birth) => {
  const date = new Date(Date.UTC(year, 0, 1))
  if (!month.unknown) {
    date.setUTCMonth(month.index - 1)
    const endOfMonth = new Date(date.valueOf())
    endOfMonth.setUTCMonth(month.index)
    return dateBetween(date, endOfMonth)
  }
  const endOfYear = new Date(date.valueOf())
  endOfYear.setUTCFullYear(year + 1)
  return dateBetween(date, endOfYear)
}

const makeApproximateAge = (birthDate: Date) => {
  const now = new Date(Date.now())
  const monthsAge =
    (now.getFullYear() - birthDate.getFullYear()) * 12 +
    now.getMonth() -
    birthDate.getMonth()
  return Math.floor(monthsAge / 12)
}
