const fs = require('fs')
const Web3= require('web3')

const eth_to_wei = Math.pow(10, 18)


const node1 = "0x909e35Ad26acAda51609C23774D6267F8aFf6d36"
const node2 = "0x5Ac345fFa4B4eF9634DB94a3Ac493c24E57b5DF5"
const node3 = "0x4d929B0E7e7246Bb540Fb3175b1202Fb6D0B53C2"

const caddr = "0xc364D5d417E64Af07F6E90d97E7B226db90db936"
const web3 = new Web3("ws://127.0.0.1:8546")
const myabi = JSON.parse(fs.readFileSync('./build/contracts/SimpleStorage.json')).abi;
const Contract = new web3.eth.Contract(myabi, caddr, {from: node1})
Contract.methods.set(666).send({from: node1}).then(console.log);
Contract.methods.get().call({from: node1}).then(console.log);