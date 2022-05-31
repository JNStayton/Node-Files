const fs = require('fs');
const process = require('process');
const axios = require('axios');

//reads and prints data from a file; optionally (if outputFile is specified), copies data from path to path2
function cat(path, outputFile) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('ERROR:', err);
			process.exit(1);
		} else {
			console.log('DATA:', data);
			if (outputFile) {
				catWrite(data, outputFile);
			}
		}
	});
}

//reads and prints data from a url; optionally (if a path is specified), copies URL data to path
async function webCat(url, outputFile) {
	try {
		let response = await axios.get(url);
		console.log(response.data);
		if (outputFile) {
			catWrite(response.data, outputFile);
		}
	} catch (err) {
		console.log(`ERROR WITH ${url}:`);
		console.log(`STATUS CODE: ${err.response.status} - ${err.response.statusText}`);
		process.exit(1);
	}
}

//can provide '--out' text as a command line argument to output to a file rather than printing to the console
function catWrite(data, outputFile) {
	if (path) {
		fs.writeFile(outputFile, data, 'utf8', (err) => {
			if (err) {
				console.log(`Could not write to ${outputFile}: ${err}`);
				process.exit(1);
			}
		});
	} else {
		console.log(data);
	}
}

let path;
let outputFile;

//if '--out' is provided as the 3rd argument in the command line, path and outputFile are the 4th and 5th, otherwise path is the 3rd argument and there is no outputFile
if (process.argv[2] === '--out') {
	path = process.argv[3];
	outputFile = process.argv[4];
} else {
	path = process.argv[2];
}

//determines whether to call cat or webCat
if (path.includes('http')) {
	webCat(path, outputFile);
} else {
	cat(path, outputFile);
}
