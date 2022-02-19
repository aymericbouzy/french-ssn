import checkControlKey from "./checkControlKey"
import normalize from "./normalize"
import makeGender, { Gender } from "./parse/makeGender"
import Birth from "./Birth"

const re = /^((\d)(\d{2})(\d{2})(\d{5}|2[abAB]\d{3})(\d{3}))(\d{2})$/

export const getParts = (ssn: string | number) => {
  ssn = normalize(ssn)
  const parts = re.exec(ssn)
  if (!parts) {
    throw new Error("Unexpected error")
  }
  const [partialSsn, gender, year, month, place, rank, controlKey] =
    parts.slice(1)
  return { partialSsn, gender, year, month, place, rank, controlKey }
}

class Ssn {
  readonly birth: Birth
  readonly gender: Gender
  readonly provisional: boolean

  constructor(ssn: string | number) {
    const {
      partialSsn,
      gender,
      year,
      month,
      place,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      rank,
      controlKey,
    } = getParts(ssn)
    checkControlKey(partialSsn, controlKey)

    this.gender = makeGender(gender)
    this.birth = new Birth(month, year, place)
    this.provisional = isProvisional(gender, controlKey)
  }

  toJSON() {
    const { gender, provisional } = this
    const { approximateAge, ...birth } = this.birth.toJSON()

    return {
      birth,
      gender,
      provisional,
      approximateAge,
    }
  }
}

function isProvisional(gender: string, controlKey: string) {
  return Number(gender) > 2 || controlKey === "98"
}

export default (ssn: string | number) => {
  return new Ssn(ssn).toJSON()
}
