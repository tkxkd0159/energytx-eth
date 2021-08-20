import { writeFile, readFile } from 'fs/promises';
import axios from "axios";
import FormData from "form-data";
import b58 from "bs58";

interface ETP {
    producer: string;
    description: string;
    timestamp: number;
    properties: {
        energy_type: string;
        location: string;
        start_time: number;
        end_time: number;
        maximum_suppliable: number;
        price_per_watt: number;
    }
    signature: string;
}

interface CET {
    consumer: string;
    description: string;
    timestamp: number;
    properties: {
        target_etp: string;
        energy_type: string;
        start_time: number;
        end_time: number;
        amount: number;
    }
    signature: string;
}

// writeETP("test.json", energy_cert)
async function writeETP(name: string, data: ETP) {
    let d = JSON.stringify(data)
    await writeFile(name, d)
}



const ipfs = axios.create({
    baseURL: 'http://127.0.0.1:5001/api/v0/',

})

async function addFileToIPFS(file_path: string, file_name?: string) {
    let data = await readFile(file_path)
    let form = new FormData();
    if (file_name) {
        form.append("file", data, file_name)
    }
    else {
        form.append("file", data)
    }
    let res = await ipfs.post('add', form, {headers: {...form.getHeaders()}, params: {"wrap-with-directory": true}})
    return res.data

}

async function readFileFromIPFS(ipfs_path: string) {
    let res = await ipfs.post('cat', undefined, {params: {arg: ipfs_path}})
    return res.data
}

// QmSgvgwxZGaBLqkGyWemEDqikCqU52XxsYLKtdy3vGZ8uq, cid : base58 encoding : 0x1220 => sha2, 32bytes
// 0x12207D5A99F603F231D53A4F39D1521F98D2E8BB279CF29BEBFD0687DC98458E7F89
// Use to store cid in contract as bytes32
function cidToHex(cid: string): string {
    let buf_hex_str = b58.decode(cid)
    let hex_str = buf_hex_str.toString('hex')
    let trunc_hex = hex_str.slice(4)
    return trunc_hex;
}

function hexToCid(hex_str: string): string {
    let prefix = "1220"
    let s = prefix + hex_str
    console.log(s)
    let bytes = Buffer.from(s, 'hex')
    let cid = b58.encode(bytes)
    return cid;
}



export { addFileToIPFS, readFileFromIPFS,
         ETP, writeETP, CET,
         cidToHex, hexToCid}
