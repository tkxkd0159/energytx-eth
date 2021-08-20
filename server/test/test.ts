import { addFileToIPFS, readFileFromIPFS } from '../src/modules/ipfs'
import {provider, makeContract, makeSigner} from '../src/modules/ethers'

const uri = "https://ipfs.io/ipfs/{id}?filename={id}";

(async () => {

    if (process.env.E_CONTRACT === undefined) {
        console.log("Specify your contract address")
    }
    else {
        let energy_contract = makeContract(process.env.E_CONTRACT, "../contract/build/contracts/EnergyAsset.json")
        let cursor = await energy_contract.uri(0)
        console.log(cursor)
        if (process.env.MNEMONIC === undefined) {
            console.log("Specify your key")
        }
        else {
            let signer = makeSigner(process.env.MNEMONIC)
            const c_with_signer = energy_contract.connect(signer)
            console.log(signer.address)
            // c_with_signer.uri(0).then(console.log)
            // console.log(await signer.getAddress())
        }
    }

})();


