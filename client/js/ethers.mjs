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

async function getBalance(){
    const target_address = document.querySelector('#from_addr').value
    if (target_address === "") {
        makeDisplayElement("Please enter the target address")
        return
    }

    const res = await fetch(`http://127.0.0.1:${CDN_PORT}/balance?addr=${target_address}`, {method: "GET"});
    const data = await res.text();
    if (data.startsWith('Your')) {
        makeDisplayElement(data)
    }
    else {
        makeDisplayElement(`Balance is ${data}`)
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
