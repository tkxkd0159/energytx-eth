// node --experimental-repl-await
// node -r dotenv/config testweb3.js

import fs from 'fs';
import Web3 from 'web3';

const TYPE = "local"
const eth_to_wei = Math.pow(10, 18)

if (TYPE == "remote") {
    const myaddr = process.env.RINKEBY_ADDR;
    let web3 = new Web3(Web3.givenProvider || "wss://rinkeby.infura.io/ws/v3/d1d5cddfa64244f68b1c0359d22a5491");
    web3.eth.getBalance(myaddr).then(console.log);
} else if (TYPE == "local") {
    const ActionSet = {
                        check: "accountCheck",
                        send: "sendtx",
                        call: "callContractWithoutSendingTX",
                        execute: "callContractMethod"
                        };
    const action = "callContractWithoutSendingTX"

    const myaddr = process.env.GAN_ADDR1;
    const subaddr = process.env.GAN_ADDR2;
    const sc_addr1 = process.env.SIMPLE_CONTRACT_ADDR
    const sc_addr2 = process.env.TOKEN_CONTRACT_ADDR
    let web3 = new Web3("http://127.0.0.1:7545");

    if (action == ActionSet.check) {
        web3.eth.getBalance(myaddr).then(console.log);
        web3.eth.getBlockNumber().then(num => {console.log(num)});
        let coinbase_addr = await web3.eth.getCoinbase();
        console.log(coinbase_addr);
    } else if (action == ActionSet.send) {
        web3.eth.sendTransaction({
            from: myaddr,
            to: subaddr,
            value: String(1.2*eth_to_wei)
        }).then((receipt)=>{console.log(receipt)});
    } else if (action == ActionSet.execute) {
        const myabi = JSON.parse(fs.readFileSync('./energy/build/contracts/SimpleStorage.json')).abi;
        const SimpleContract = new web3.eth.Contract(myabi, sc_addr1, {from: myaddr})
        SimpleContract.methods.set(333).send({from: myaddr}).then(console.log);
    } else if (action == ActionSet.call) {
        const myabi = JSON.parse(fs.readFileSync('./energy/build/contracts/EnergyToken.json')).abi;
        const myContract = new web3.eth.Contract(myabi, sc_addr2, {from: myaddr})
        myContract.methods.balanceOf(subaddr).call().then(console.log);
    }
}


