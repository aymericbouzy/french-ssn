// FIXME
export default (data: any, gender: number, controlKey: number | string) => {
  data.provisional = gender > 2 || controlKey == 98
}
