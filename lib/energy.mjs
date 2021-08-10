
import { makeFileName } from "./utils.mjs";

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
