const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW1hbmNoYWRoYSIsImEiOiJja2o5bG9sc3M1NzFnMnVyeHkxYnVwMzBkIn0.27g8lfLVvs_uElxYS8dfig&limit=1%27'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Error!!!', )
        } else if (body.features.length === 0) {
            callback ({
                error: 'Incorrect place name provided'})
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
             })
        }
    })   
}

module.exports = geocode

// geocode ('Philadelphia', (error, data) => {
//     console.log('error: ' , error)
//     console.log(data)

// })