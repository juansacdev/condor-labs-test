require('dotenv').config()

module.exports = {
  urlTarget: process.env.URL_TARGET || 'https://hiring.condorlabs.io/api/countries/all'
}