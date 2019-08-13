
const request = require('request')
const token = process.env.UNSPLASH_TOKEN

const unsplash = (search, callback) => {
	const url = 'https://api.unsplash.com/search/photos?query=' + encodeURIComponent(search) + '&client_id='+ token + '&per_page=100&order_by=popular'

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			return console.log(error)
		} else if (!response.body.results ) {
			return console.log(response.body.errors[0])
		} 
		
		callback('', response.body.results)
		
	})
}


module.exports = unsplash
