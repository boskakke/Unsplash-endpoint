const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const unsplash = require('../utils/unsplash')



const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
//app.use(express.static(publicDirectoryPath))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Doe'
    })
})

app.get('/unsplash', (req, res) => {

  if(!req.query.terms) {
      return res.send( {
          error: 'You must provide search terms!'
      })
  }

	unsplash(req.query.terms, req.query.orientation,  (error, data) => {
    res.send(data)
	})

})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
