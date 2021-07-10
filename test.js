import {main_addr,
    getUriMeta, getAssetContractOwner, getBalanceBatch, getEtokenTotalBalance,
    setURI, batchTransferFrom, mintAsset, mintBatchAsset, burnBatchAsset
} from "./lib/energy.mjs";

const sub_addr = process.env.GAN_ADDR2;

// setURI("https://tkxkd0159.github.io/ERC1155meta/token/{id}.json", main_addr);

const TEST_TYPE = "set"

if (TEST_TYPE === "get") {
    const myuri = await getUriMeta(1);
    console.log(myuri);
    let balances = await getBalanceBatch([main_addr, main_addr],[0, 1], main_addr);
    console.log(balances);
    const asset_owner = await getAssetContractOwner(main_addr);
    console.log(asset_owner);
    const total_etoken_balance = await getEtokenTotalBalance(main_addr);
    console.log(total_etoken_balance);
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
