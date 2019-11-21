export default (data, gender, controlKey) => {
  data.provisional = gender > 2 || controlKey == 98
}
