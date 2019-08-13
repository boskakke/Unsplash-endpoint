
const request = require('request')
const token = process.env.UNSPLASH_TOKEN

const unsplash = (terms, orientation, callback) => {
	const encodedSearchTerms = encodeURIComponent(terms)
	
	let url = 'https://api.unsplash.com/search/photos?query=' + encodedSearchTerms + '&client_id='+ token + '&per_page=100&order_by=popular'

	if(orientation) {
		url += '&orientation=' + orientation
	}

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
