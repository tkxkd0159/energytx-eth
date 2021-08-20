import path from 'path';
import express from 'express';
import cors from 'cors';

import {  addFileToIPFS, readFileFromIPFS, ETP, CET, writeETP, cidToHex } from './modules/ipfs'
import { makeSigner } from './modules/ethers';

const app = express();
app.use(cors())
const port = 7777

app.use('/static', express.static(path.join(__dirname, '..', 'lib')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('base')
});

// app.get('/balance', async (req, res) => {
//     const addr = req.query.addr as string
//     let b: string = await getBalance(addr)
//     res.send(b)
// }
// )

app.post('/etp', async (req, res) => {
    let data  = req.body;
    let timestamp = Math.floor(Date.now() / 1000)

    let c: ETP = {
        producer: data['p_address'],
        description: data['description'],
        timestamp: timestamp,
        properties: {
            energy_type: data['energy_type'],
            location: data['location'],
            start_time: data['start_t'],
            end_time: data['end_t'],
            maximum_suppliable: data['mse'],
            price_per_watt: data['ppw']
        },
        signature: ""
    };
    let signer = makeSigner(process.env.MNEMONIC as string);
    let buffer = JSON.stringify(c);
    let signature = await signer.signMessage(buffer);
    c.signature = signature;
    let file_path = "./ipfs/"+c.producer+"_"+timestamp+".json";
    await writeETP(file_path, c)
    let ipfs_res: string = await addFileToIPFS(file_path)
    ipfs_res = ipfs_res.slice(0, ipfs_res.indexOf('}') + 1)
    let ipfs_hash = JSON.parse(ipfs_res)['Hash']
    let decode_ipfs_hash = cidToHex(ipfs_hash)

    res.redirect(`http://127.0.0.1:5500/views/1_deploy.html?cid=${ipfs_hash}&decode=${decode_ipfs_hash}`)
})



app.listen(port, () => console.log(`Listening to ${port}`))