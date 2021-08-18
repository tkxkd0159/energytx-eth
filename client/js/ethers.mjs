import { removeElementsByClass, makeDisplayElement, CDN_PORT } from './utils.mjs'

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
(async () => {
    await provider.send("eth_requestAccounts", []);  // metamask API
    signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
})();

const btn = document.querySelector('#b_get_b');
btn.addEventListener('click', function() {
    removeElementsByClass('.display')
    getBalance()
})

async function getBalance() {
    let d = document.querySelector('.display-home-value')
    const target_address = document.querySelector('#from_addr').value

    if (target_address === "") {
        makeDisplayElement("Please enter the target address", d)
        return
    }

    try {
        let a = target_address.replace('0x', '');
        if (a.length !== 40) {
            throw "It must be 20 bytes except prefix"
        }

        let res = await provider.getBalance(a);
        let balance = parseInt(res._hex).toString()
        makeDisplayElement(`Balance is ${balance}`, d)
    } catch (e) {
        makeDisplayElement(`Your address is wrong \n ${e}`, d)
    }
}

const btn2 = document.querySelector('#b_send_t');
btn2.addEventListener('click', function() {
    let data = document.querySelector('#eth-value').value;
    signer.sendTransaction({
        to: "0x094616C023c2C06033cd51e568D95e7605235D32",
        value: ethers.utils.parseEther(data)
    });
}
)
