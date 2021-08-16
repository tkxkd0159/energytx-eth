import { addFileToIPFS, readFileFromIPFS } from './modules/ipfs'
import {provider, makeContract, makeSigner} from './modules/ethers'

const uri = "https://ipfs.io/ipfs/{id}?filename={id}";

(async () => {

    if (process.env.E_CONTRACT === undefined) {
        console.log("Specify your contract address")
    }
    else {
        let energy_contract = makeContract(process.env.E_CONTRACT, "../contract/build/contracts/EnergyAsset.json")
        let cursor = await energy_contract.uri(0)
        console.log(cursor)
        if (process.env.GOERLI_1 === undefined) {
            console.log("Specify your key")
        }
        else {
            let signer = makeSigner(process.env.GOERLI_1)
            const c_with_signer = energy_contract.connect(signer)
            c_with_signer.uri(0).then(console.log)
            console.log(await signer.getAddress())
        }
    }

})();

// (async () => {
//     let data = await readFileFromIPFS('QmaeToP8UEPA9BsvHAtZFaGmKWoQzN1ja3G1wcsVUVPEMz')
//     console.log(data)
// })();
