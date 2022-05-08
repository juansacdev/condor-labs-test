const axios = require('axios').default
const { urlTarget } = require('./config')

const search = async ({ from, to, region, sort, pageSize, pageNumber }) => {
  const { data: countriesData } = await axios.get(urlTarget)

  const startAt = ((Number(pageNumber) - 1) * Number(pageSize))
  const endAt = (Number(pageNumber) * Number(pageSize))
  let dataFiltered

  if (from && to)
    dataFiltered = countriesData
      .filter(country => country.population >= Number(from) && country.population <= Number(to))
      .slice(startAt, endAt)

  if (region && sort) {
    dataFiltered = countriesData
      .filter(country => country.region === region)
      .sort((a, b) => {
        if (sort.name === 'desc') {
          if (a.name > b.name) return -1
          else return 1
        } else if (sort.name === 'asc') {
          if (a.name > b.name) return 1
          else return -1
        }
      })
      .slice(startAt, endAt)
  }

  return !dataFiltered ? countriesData.slice(startAt, endAt) : dataFiltered
}

module.exports = { search }
