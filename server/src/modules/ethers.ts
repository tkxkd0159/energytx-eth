import { BigNumber, ethers } from "ethers";
import fs from "fs"

const provider = ethers.getDefaultProvider("goerli", {infura: process.env.INFURA_KEY})

async function getBalance(addr: string){
    try {
        let a: string = addr.replace('0x', '');
        if (a.length !== 40) {
            throw "It must be 20 bytes except prefix"
        }

        let res: BigNumber = await provider.getBalance(a);
        const balance: number|string = parseInt(res._hex)
        return balance.toString()
    } catch (e) {
        return `Your address is wrong ${e}`
    }

}

function makeContract(contract_addr: string, abi_path: string): ethers.Contract {
    let abi = JSON.parse(fs.readFileSync(abi_path).toString()).abi;
    let c = new ethers.Contract(contract_addr, abi, provider)
    return c
}

function makeSigner(pvt_key: string): ethers.Wallet {
    let s = new ethers.Wallet(pvt_key)
    s = s.connect(provider)
    return s
}

export {getBalance,
        provider, makeSigner, makeContract}