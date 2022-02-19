const titles = {
  male: "M",
  female: "Mme",
}

// FIXME
export default (data: any) => {
  // @ts-ignore FIXME
  data.gender.title = titles[data.gender.name]
}
