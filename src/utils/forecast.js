const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7a91ffb3b9030fab8f089fda266d2db8/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to forecast service!')
        } else if (body.error) {
            callback('Forecast API Error [' + body.code + ']: ' + body.error)
        } else {
            callback(undefined, body.daily.summary + ' It\'s currently ' + body.currently.temperature + ' degrees out. Humidity,  ' + body.currently.humidity)
        }
    })
}

module.exports = forecast