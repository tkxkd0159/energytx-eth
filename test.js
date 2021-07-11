import fs from 'fs';
import Web3 from 'web3';

import {main_addr,
    getUriMeta, getAssetContractOwner, getBalanceBatch, getEtokenTotalBalance,
    setURI, batchTransferFrom, mintAsset, mintBatchAsset, burnBatchAsset
} from "./lib/energy.mjs";


// setURI("https://tkxkd0159.github.io/ERC1155meta/token/{id}.json", main_addr);

const sub_addr = process.env.GAN_ADDR2;
const asset_addr = process.env.ASSET_ADDR;
const trade_addr = process.env.TRADE_ADDR;
const eth_to_wei = Math.pow(10, 18)

const web3 = new Web3("http://127.0.0.1:7545");
const asset_abi = JSON.parse(fs.readFileSync('./energy/build/contracts/EnergyAsset.json')).abi;
const asset_contract = new web3.eth.Contract(asset_abi, asset_addr);
const trade_abi = JSON.parse(fs.readFileSync('./energy/build/contracts/EnergyTrade.json')).abi;
const trade_contract = new web3.eth.Contract(trade_abi, trade_addr);


const TEST_TYPE = "get"

if (TEST_TYPE === "get") {

    const myuri = await getUriMeta(1, asset_contract);
    console.log(myuri);
    let balances = await getBalanceBatch([main_addr, main_addr, main_addr, main_addr, main_addr, main_addr, main_addr, main_addr, main_addr, main_addr],
                                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 12], main_addr, asset_contract);
    console.log(balances);
    // const asset_owner = await getAssetContractOwner(main_addr);
    // console.log(asset_owner);
    // const total_etoken_balance = await getEtokenTotalBalance(main_addr);
    // console.log(total_etoken_balance);
} else if (TEST_TYPE === "set") {
    let balances = await getBalanceBatch([main_addr, main_addr, sub_addr, sub_addr],[0, 1, 0, 1], main_addr);
    console.log(balances);
    let total_etoken_balance = await getEtokenTotalBalance(main_addr);
    console.log(total_etoken_balance);

    await batchTransferFrom(main_addr, sub_addr, [0], [33333]);
    balances = await getBalanceBatch([main_addr, main_addr, sub_addr, sub_addr],[0, 1, 0, 1], main_addr);
    console.log(balances);
    total_etoken_balance = await getEtokenTotalBalance(main_addr);
    console.log(total_etoken_balance);

    await mintBatchAsset(main_addr, [0], [1111111111], main_addr);
    balances = await getBalanceBatch([main_addr, main_addr, sub_addr, sub_addr],[0, 1, 0, 1], main_addr);
    console.log(balances);
    total_etoken_balance = await getEtokenTotalBalance(main_addr);
    console.log(total_etoken_balance);

    await burnBatchAsset(main_addr, [0], [88888888888888], main_addr);
    balances = await getBalanceBatch([main_addr, main_addr, sub_addr, sub_addr],[0, 1, 0, 1], main_addr);
    console.log(balances);
    total_etoken_balance = await getEtokenTotalBalance(main_addr);
    console.log(total_etoken_balance);
}
