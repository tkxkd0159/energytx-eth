import { removeElementsByClass } from './utils.mjs'

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

(async function() {
    checkMetamask()
})();


const eth_btn = document.querySelector('.enableEthereumButton');
eth_btn.addEventListener('click', async () => {
    removeElementsByClass('.display')
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const chain_id = await ethereum.request({ method: 'eth_chainId' });

    let p = document.createElement('p');
    let p2 = document.createElement('p');
    p.setAttribute("class", "display")
    p2.setAttribute("class", "display")
    p.innerText = `Currnet account is ${accounts[0]}`
    p2.innerText = `chain ID is ${chain_id}`
    document.body.appendChild(p)
    document.body.appendChild(p2)
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