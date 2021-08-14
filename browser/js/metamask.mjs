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
    const chain_id = await ethereum.request({ method: 'eth_chainId' });
    console.log(`chain ID is ${chain_id}`)
    return chain_id
}

(async function() {
    checkMetamask()
})();


const eth_btn = document.querySelector('.enableEthereumButton');
eth_btn.addEventListener('click', async () => {
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(`Currnet account is ${accounts[0]}`)
});


