//nodemon src/app.js -e js,hbs  -update server automatically including js and hbs files
//Download npm package postman-request  - npm i postman-request


const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const express = require('express');
//const { get } = require('http');
const hbs = require('hbs');

const app = express();

//Define paths for express config
const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');
hbs.registerPartials(PARTIALS_PATH);

//setup handlebars engine and views location
app.set('view engine', 'hbs'); //handlebars templating engine
app.set('views', VIEWS_PATH);

//setup static directory to serve
app.use(express.static(PUBLIC_DIR_PATH)); // Displays index.html 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jan Siska'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jan Siska'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Jan Siska'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { longitude,latitude,location } = {}) => {
        if(error) return res.send({error: error});

        forecast( latitude, longitude , (error,forecastData) => {
            const { current, feelslike} = forecastData;
            if(error) return res.send({
                error: error
            });
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });

        })

    })
    
});

// if(place){
//     geocode(place, (error, { longitude,latitude,location } = {}) => {
//         if(error) return console.log(error);
//         //const { longitude,latitude,location } = data;
//         forecast( latitude, longitude , (error,forecastData) => {
//             const { current, feelslike} = forecastData;
//             if(error) return console.log(error);
//             console.log(location);
//             console.log(current);
//             console.log(feelslike);
//         })
//     })
// }else{
//     console.log(`Provide a location !!`);
// }


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products : []
    })
})

app.get('/weather/today', (req, res) => {
    res.send('Weather page today!!');
});

app.get('/help/*', (req, res) => {
    res.render('404',  {
        message: 'Help article not found',
        title: '404',
        name: 'Jan Siska'
        

    });
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Jan Siska'
    });
})


app.listen(3000, () => {
    console.log('server is up on port 3000');
});