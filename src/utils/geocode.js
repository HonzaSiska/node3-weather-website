const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2lza2FqYW4iLCJhIjoiY2ttYzZqaGE2MXRjMDJwbGF2ZnNpbjhhciJ9.8p_ISJoDdtmeEYjDfb2uTw`;

    request({url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0) {
            callback( 'No match for the search', undefined)
        }else{
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const place_name = body.features[0].place_name;
            //console.log(`latitude: ${latitude}, longitude: ${longitude}`);
            
            callback(undefined, { 
                latitude: latitude,
                longitude: longitude, 
                location: place_name 
            }); 
            
        }   
    })
};

module.exports = geocode;