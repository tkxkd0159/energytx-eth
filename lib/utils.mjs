import fs from 'fs';
import Web3 from 'web3';


const web3 = new Web3("http://127.0.0.1:7545");

async function _getSignFromData(dataToSign, caller, password="password") {
    let res;
    try {
        res = await web3.eth.sign(dataToSign, caller, password);
    } catch(e) {
        console.log(e);
    }
    return res;
}

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
async function makeErcMeta(token_path, from_, start_, target_mins, total_power, price) {
	let file_nums = fs.readdirSync(token_path).length;
	let next_file_name = makeFileName(file_nums);

	let year_ = parseInt(start_.slice(0, 4));
	let month_ = parseInt(start_.slice(4, 6));
	let day_ = parseInt(start_.slice(6, 8));
	let hour_ = parseInt(start_.slice(8, 10));
	let minute_ = parseInt(start_.slice(10, 12));
	let start_date = new Date(year_, month_, day_, hour_, minute_);
	let start_ts = Math.floor(Date.parse(start_date)/1000);
	let valid_period = parseInt(target_mins) * 60;
	let end_ts = start_ts + valid_period;
	let erc_meta = {
		"Name": `Energy NFT by ${from_}`,
		"Description": "Certificate of Energy Trading Agreement",
		"Properties": {
			"Start_time": `${start_ts}`,
			"End_time": `${end_ts}`,
			"Power to provide \(W\)": `${total_power}`,
			"Price per Watt \(ETT\)": `${price}`,
			"Signature": "0"
		}
	}
	let sign_ = await _getSignFromData(JSON.stringify(erc_meta), from_)
	erc_meta['Properties']['Signature'] = sign_;
	fs.writeFileSync(`${token_path}${next_file_name}.json`, JSON.stringify(erc_meta));

	return [erc_meta, file_nums];
}

export {makeErcMeta, makeFileName}