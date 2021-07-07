import fs from 'fs';
import got from 'got';

(async () => {
	try {
		const response = await got('http://127.0.0.1:3000/book');
		console.log(response.body);
		//=> '<!doctype html> ...'
	} catch (error) {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	}
})();

let myjson = fs.readFileSync('./sample.json');
myjson = JSON.parse(myjson);
console.log(myjson, "Loaded");

(async () => {
	const {body} = await got.post('http://127.0.0.1:3000/book', {
		json: myjson,
		responseType: 'json'
	});

	console.log(body);
	//=> {hello: 'world'}
})();