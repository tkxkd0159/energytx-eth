import { removeElementsByClass, makeDisplayElement, hexToNum } from './utils.mjs'

async function checkMetamask() {
    const provider = await detectEthereumProvider();
    if (provider) {
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
    }
    else {
        console.log('Please install MetaMask!');
    }
}

// https://infura.io/docs/ethereum/json-rpc
(async function() {
    checkMetamask()
})();


const eth_btn = document.querySelector('#b_enable_eth');
eth_btn.addEventListener('click', async () => {
    removeElementsByClass('.display')
    let accounts = await ethereum.request({ method: "eth_requestAccounts" });
    let chain_id = await ethereum.request({ method: "eth_chainId", params: [] });
    // let block_number = await ethereum.request({ "method":"eth_getBalance","params":["0xCFe590435A372E4eBa869a53B82C8C64352F21FD", "latest"]})
    let block_number = await ethereum.request({ method: "eth_blockNumber", params: []})

    let d = document.querySelector('.display-home-value')
    makeDisplayElement(`Currnet account is ${accounts[0]}`, d)
    makeDisplayElement(`chain ID is ${chain_id}`, d)
    makeDisplayElement(`Current block number is ${hexToNum(block_number)}`, d)
});


// Catch events in Metamask
ethereum.on('chainChanged', async (chain_id) => {
    await Swal.fire({
        title: 'Updated!',
        text: `Current chain ID : ${chain_id}`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    window.location.reload();
});
ethereum.on('accountsChanged', (accounts) => {
    Swal.fire({
        title: 'Updated!',
        html: `Current account : <b>${accounts[0]}</b>`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
})