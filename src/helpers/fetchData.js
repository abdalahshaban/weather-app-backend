const mongoose = require("mongoose");
const cityModel = require('../models/cityModel')
const axios = require('axios')
const dbConfig = require('../config/DB');

module.exports = {
    async fetch(city) {
        console.log(city);
        const response = await axios.get(dbConfig.baseURL, {
            params: {
                q: city,
                appid: dbConfig.appid,
                units: 'metric',
            }
        }).then(async response => {
            if (response.data) {
                let doc = {
                    name: response.data.name.toLowerCase(),
                    mainWeather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    pressure: response.data.main.pressure,
                    humidity: response.data.main.humidity,
                    speedOfWind: response.data.wind.speed,
                    degOfWind: response.data.wind.deg,
                    country: response.data.sys.country,
                    sunrise: response.data.sys.sunrise,
                    sunset: response.data.sys.sunset
                }

                await cityModel.findOne({ name: doc.name }).then(result => {
                    if (result) {
                        cityModel.updateOne({ _id: result._id }, doc, (err, raw) => {
                            if (!err) {
                                console.log(`updated ${city}`)

                            }
                        })
                    } else {
                        cityModel.create(doc, () => {
                            console.log(`save ${city}`)

                        })
                    }
                })
                return doc
            }
        }).catch(err => {
            return err.response.data
        })

        return response
    }
}
