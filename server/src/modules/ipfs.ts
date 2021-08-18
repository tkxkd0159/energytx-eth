import axios from "axios"
import FormData from "form-data"

import {Cert, writeCert, readFile} from "./io"



// writeCert("test.json", energy_cert)

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
    console.log(res.data)

}

async function readFileFromIPFS(ipfs_path: string) {
    let res = await ipfs.post('cat', undefined, {params: {arg: ipfs_path}})
    return res.data
}

export { addFileToIPFS, readFileFromIPFS }



