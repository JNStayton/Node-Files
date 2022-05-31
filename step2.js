const fs = require('fs');
const process = require('process');
const axios = require('axios');

//reads and prints data from a file
function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('ERROR:', err);
			process.exit(1);
		}
		console.log('DATA:', data);
	});
}

//reads and prints data from a url
async function webCat(url) {
	try {
		let response = await axios.get(url);
		console.log(response.data);
	} catch (err) {
		console.log(`ERROR WITH ${url}:`);
		console.log(`STATUS CODE: ${err.response.status} - ${err.response.statusText}`);
		process.exit(1);
	}
}

//determines whether to call cat or webCat
let path = process.argv[2];
if (path.includes('http')) {
	webCat(path);
} else {
	cat(path);
}
