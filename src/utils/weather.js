const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b520bf5a5fab343ee6cf6fe3f98e63d4&query='+ latitude +',' +longitude + '&units=f'

    request ({url, json: true}, (error, { body } = {}) => {
        if (error){
            callback('Error!!!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                temperature: 'The current temparature is ' + body.current.temperature,
                feelslike: '. This feels like temparature ' + body.current.feelslike
            })
        }

    })

}

module.exports = weather
