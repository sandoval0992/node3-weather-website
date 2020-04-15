const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Set up handlerbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'My Weather App',
        author: 'Ivan Sandoval'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title : 'About me',
        author: 'Ivan Sandoval',
        imagePath : '/img/sandoval.jpg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'If you need support, please send an email to: weatherappsupport@gmail.com',
        title : 'Help!',
        author: 'Ivan Sandoval'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if(!address){        
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(address,(error, {latitude, longitude, location} = {}) => {
        if(error){return res.send({error : error})}

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){return res.send({error:error})} 

            res.send({
                location : location,
                address : address,
                forecast : forecastData
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term.'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title : '404',
        errorMessage : 'Help article not found.',
        author: 'Ivan Sandoval'
    })    
})

app.get('*', (req, res) => {
    res.render('error', {
        title : '404',
        errorMessage : 'Page not found.',
        author: 'Ivan Sandoval'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})