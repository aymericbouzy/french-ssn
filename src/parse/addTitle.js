const titles = {
  male: "M",
  female: "Mme",
}

export default data => {
  data.title = titles[data.gender]
}
