const fs = require('fs');
const process = require('process');

//given a path, print out what is inside that path
function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('ERROR:', err);
			process.kill(1);
		}
		console.log('DATA:', data);
	});
}

//allows command line input of path
cat(process.argv[2]);
