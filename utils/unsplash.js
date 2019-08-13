
const request = require('request')
const token = process.env.UNSPLASH_TOKEN
// const token = '9b9603c98307ae7b84fd17200a862dd8f80c4bc3f84281bd3990623c9d3a3c83'

const unsplash = (search, callback) => {
	const url = 'https://api.unsplash.com/search/photos?query=' + encodeURIComponent(search) + '&client_id='+ token + '&per_page=5&order_by=popular'

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
