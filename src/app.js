const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handle bars and view location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
             title: 'Weather App',
             name: 'Aman' 
         }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Aman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Aman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
            return res.send({
            error: 'Please provide a search term'
        }) }
       
    // call geocode
    const inp = req.query.address

    geocode (inp, (error, {latitude, longitude, location} = {}) => {
    
        if (error) {
            return res.send(error)
        }
        
        weather (latitude, longitude, (error, weatherData) => {
        
            if (error){
                return res.send({
                    error: error
                })
            }
            res.send ({
                location: location,
                weatherdata: weatherData
            })
            
        
        })
    
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
                error: 'Please provide a search term'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
    
    
    
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404 error',
        errorMessage: 'The help does not exist',
        name: 'Aman'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 error',
        errorMessage: 'The page does not exist',
        name: 'Aman'
    })
})

app.listen(3000, () => {

    console.log('Server is up on port 3000')
})



// default app.get (this is now set to index.html)
// app.get('', (req, res) => {
//         res.send('<h1> Weather App!! </h1>')
// })


// app.get('/help', (req, res) => {
//     //res.send('This is help page!')
//     app.use(express.static(helpPath))  
// })

// app.get('/about', (req, res) => {
//     res.send('This is the about page !!')  
// })
