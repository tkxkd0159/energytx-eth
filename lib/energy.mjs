import { makeFileName } from "./utils.mjs";

const DEBUG = false;
const main_addr = process.env.GAN_ADDR1;

if (DEBUG) {
    const sub_addr = process.env.GAN_ADDR2;
    const asset_addr = process.env.ASSET_ADDR;
    const trade_addr = process.env.TRADE_ADDR;
    const eth_to_wei = Math.pow(10, 18);

    const web3 = new Web3("http://127.0.0.1:7545");
    const asset_abi = JSON.parse(
        fs.readFileSync("./energy/build/contracts/EnergyAsset.json")
    ).abi;
    const asset_contract = new web3.eth.Contract(asset_abi, asset_addr);
    const trade_abi = JSON.parse(
        fs.readFileSync("./energy/build/contracts/EnergyTrade.json")
    ).abi;
    const trade_contract = new web3.eth.Contract(trade_abi, trade_addr);
}

async function getUriMeta(id, contract) {
    let file_name = makeFileName(id);
    let res;
    try {
        res = await contract.methods.uri(id).call();
    } catch (e) {
        console.log(e);
    }
    let real_uri = res.replace("{id}", file_name);
    return real_uri;
}

async function setURI(uri, from_, contract) {
    let res;
    try {
        res = await contract.methods.setURI(uri).send({ from: from_ });
    } catch (e) {
        console.log(e);
    }
    if (DEBUG == true) {
        console.log(res);
    }
}

async function getBalanceBatch(accounts, ids, from_, contract) {
    let res;
    try {
        res = await contract.methods
            .balanceOfBatch(accounts, ids)
            .call({ from: from_ });
    } catch (e) {
        console.log(e);
    }
    return res;
}

async function batchTransferFrom(from_, to_, ids, amounts, contract, data = "0x0") {
    let res;
    try {
        res = await contract.methods
            .safeBatchTransferFrom(from_, to_, ids, amounts, data)
            .send({ from: from_ });
    } catch (e) {
        console.log(e);
    }
    if (DEBUG == true) {
        console.log(res);
    }
}

async function mintAsset(to_, id, amount, caller, contract, data = "0x0") {
    let res;
    try {
        res = await contract.methods
            .mint(to_, id, amount, data)
            .send({ from: caller });
    } catch (e) {
        console.log(e);
    }
    if (DEBUG == true) {
        console.log(res);
    }
    return 0;
}

async function mintBatchAsset(to_, ids, amounts, caller, contract, data = "0x0") {
    let res;
    try {
        res = await contract.methods
            .mintBatch(to_, ids, amounts, data)
            .send({ from: caller });
    } catch (e) {
        console.log(e);
    }
    if (DEBUG == true) {
        console.log(res);
    }
}

async function burnBatchAsset(from_, ids, amounts, caller, contract) {
    let res;
    try {
        res = await contract.methods
            .burnBatch(from_, ids, amounts)
            .send({ from: caller });
    } catch (e) {
        console.log(e);
    }
    if (DEBUG == true) {
        console.log(res);
    }
}

async function getAssetContractOwner(caller, contract) {
    let res;
    try {
        res = await contract.methods
            .getAssetOwner()
            .call({ from: caller });
    } catch (e) {
        console.log(e);
    }
    return res;
}

async function getEtokenTotalBalance(caller, contract) {
    let res;
    try {
        res = await contract.methods
            .getEtokenBalance()
            .call({ from: caller });
    } catch (e) {
        console.log(e);
    }
    return res;
}

export {
    main_addr,
    getUriMeta,
    getAssetContractOwner,
    getBalanceBatch,
    getEtokenTotalBalance,
    setURI,
    batchTransferFrom,
    mintAsset,
    mintBatchAsset,
    burnBatchAsset,
};
