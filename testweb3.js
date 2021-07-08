// node --experimental-repl-await
// node -r dotenv/config testweb3.js

import Web3 from 'web3';

const TYPE = "local"

if (TYPE == "remote") {
    const myaddr = process.env.RINKEBY_ADDR;
    let web3 = new Web3(Web3.givenProvider || "wss://rinkeby.infura.io/ws/v3/d1d5cddfa64244f68b1c0359d22a5491");
    web3.eth.getBalance(myaddr).then(console.log);
} else if (TYPE == "local") {
    const myaddr = "0xb8f9Fc9f225420bEaEA773E679F4991370b9DBA0"
    let web3 = new Web3("http://127.0.0.1:7545");
    web3.eth.getBalance(myaddr).then(console.log);
}


