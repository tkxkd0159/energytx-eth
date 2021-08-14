import { BigNumber, ethers } from "ethers";

// const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/d1d5cddfa64244f68b1c0359d22a5491")
const INFURA_ID = "d1d5cddfa64244f68b1c0359d22a5491"
const provider = ethers.getDefaultProvider("goerli", {infura: INFURA_ID})
async function getBalance(){
    const addr = "0xCFe590435A372E4eBa869a53B82C8C64352F21FD"
    let res: BigNumber = await provider.getBalance(addr);
    const balance: number|string = parseInt(res._hex)
    return balance.toString()
}

export {getBalance}