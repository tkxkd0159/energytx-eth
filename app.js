import express from 'express';
import path from 'path';
import fs from 'fs';
import Web3 from 'web3';

import { makeErcMeta } from './lib/utils.mjs';
import { mintAsset } from './lib/energy.mjs';

const __dirname = path.resolve();

const main_addr = process.env.GAN_ADDR1;
const sub_addr = process.env.GAN_ADDR2;
const asset_addr = process.env.ASSET_ADDR;
const trade_addr = process.env.TRADE_ADDR;
const eth_to_wei = Math.pow(10, 18)

const web3 = new Web3("http://127.0.0.1:7545");
const asset_abi = JSON.parse(fs.readFileSync('./energy/build/contracts/EnergyAsset.json')).abi;
const asset_contract = new web3.eth.Contract(asset_abi, asset_addr);
const trade_abi = JSON.parse(fs.readFileSync('./energy/build/contracts/EnergyTrade.json')).abi;
const trade_contract = new web3.eth.Contract(trade_abi, trade_addr);

function initApiServer() {
    const app = express();
    const port = 3000;
    const token_path = '../ERC1155meta/token/';

    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.get('/', (req, res) => {
        res.render('base', {type: "tx"});
    });


    app.route('/register')
      .get(function (req, res) {
        res.render('base', {type: "register"})
      })
      .post(function (req, res) {
        let data  = req.body;

        (async function () {
          let [meta_obj, file_nums] = await makeErcMeta(token_path, data["from_"],
          data["start_"], data["Period"],
          data["Power"], data['Price']);
          mintAsset(data["from_"], file_nums, 1, data["from_"], asset_contract);
          console.log(meta_obj);
          console.log(file_nums);
          res.redirect('/register');
        })();
      })


      app.listen(port, () => {
        console.log(`My app listening at http://localhost:${port}`)
      })
}

(function () {
    initApiServer();
})();
