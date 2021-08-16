import { addFileToIPFS, readFileFromIPFS } from './modules/ipfs'


(async () => {
    let data = await readFileFromIPFS('QmaeToP8UEPA9BsvHAtZFaGmKWoQzN1ja3G1wcsVUVPEMz')
    console.log(data)
})();
