const titles = {
  male: "M",
  female: "Mme",
}

export default (data) => {
  data.gender.title = titles[data.gender.name]
}
