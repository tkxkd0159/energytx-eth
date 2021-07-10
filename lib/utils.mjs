import fs from 'fs';

function makeFileName(file_nums) {
	let target_file_number = file_nums.toString(16);
	let prefix_padding = "0".repeat(64 - target_file_number.length);
	let target_file_name = `${prefix_padding}${target_file_number}`;

	return target_file_name;
}

/**
 * Make ERC1155 meta data.
 * @param {string} token_path The number to raise.
 * @param {string} from_ The power, must be a natural number.
 * @param {number} target_mins total minutes to use
 * @param {number} total_power Total_power
 * @param {number} price Price per Watt
 * @returns {object} ERC1155 meta data
 */
function makeErcMeta(token_path, from_, target_mins, total_power, price) {
	let file_nums = fs.readdirSync(token_path).length;
	let next_file_name = makeFileName(file_nums)
	let start_ts = Math.floor(Date.now()/1000);
	let valid_period = target_mins * 60;
	let end_ts = start_ts + valid_period;
	let erc_meta = {
		"name": `Energy NFT by ${from_}`,
		"description": "Certificate of Energy Trading Agreement",
		"properties": {
			"start_time": `${start_ts}`,
			"end_time": `${end_ts}`,
			"Power to provide \(W\)": `${total_power}`,
			"Price per Watt \(ETT\)": `${price}`
		}
	}
	fs.writeFileSync(`${token_path}${next_file_name}.json`, JSON.stringify(erc_meta));

	return erc_meta;
}

export {makeErcMeta, makeFileName}

// function getMinutes() {
//     return new Promise(resolve => {
//         const rl = readline.createInterface({
//             input:  process.stdin,
//             output: process.stdout
//         });

//         rl.question("Enter how many minutes you want to use your energy.\n", (answer) => {
//             resolve(answer);
//             rl.close();
//         });
//     });
// }

// function getPower() {
//     return new Promise(resolve => {
//         const rl = readline.createInterface({
//             input:  process.stdin,
//             output: process.stdout
//         });

//         rl.question("Enter how much energy you want to use (kW).\n", (answer) => {
//             resolve(answer);
//             rl.close();
//         });
//     });
// }

// const target_mins = await getMinutes();
// const target_power = await getPower();
// console.log(target_mins, target_power);


// let start_ts = Math.floor(Date.now()/1000);  // UTC+0
// let valid_period = target_mins * 60;
// let end_ts = start_ts + valid_period;
// let target_time = new Date(end_ts * 1000);
