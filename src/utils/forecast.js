const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    
    const url =`http://api.weatherstack.com/current?access_key=cdfefba4f81812b0200790fd7070e5b6&query=${longitude},${latitude}&units=m`;

    request({url: url, json: true}, (error, { body }) => {

        if(error){
            console.log('unable to connect to weather service', error);
        }else if(body.error) {
            console.log('unable to find location');
        }else{
            callback(undefined, {
                current: body.current.weather_descriptions[0],
                feelslike: body.current.feelslike
            })
        }
    
    })
}

 

module.exports = forecast;