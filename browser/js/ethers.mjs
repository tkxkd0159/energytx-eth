import { removeElementsByClass } from './utils.mjs'
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
(async () => {
    await provider.send("eth_requestAccounts", []);  // metamask API
    signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
})();

const btn = document.querySelector('#button1');
btn.addEventListener('click', function() {
    removeElementsByClass('.display')

    getBalance()   // 기다리면 안되고 얘 혼자 돌아야되니 비동기 함수이지만 콜백에서 await 하지 않음

    provider.getBlockNumber().then((res)=>{
        let p = document.createElement('p');
        p.setAttribute("class", "display")
        p.innerText = `Current block number is ${res}`;
        document.body.appendChild(p);
    })
})

async function getBalance(){
    const target_address = document.querySelector('#from_addr').value
    const res = await fetch(`http://127.0.0.1:8080/balance?addr=${target_address}`, {method: "GET"});
    const data = await res.text();
    let p = document.createElement('p');
    p.setAttribute("class", "display")
    p.innerText = `Balance is ${data}`;
    document.body.appendChild(p);
}

const btn2 = document.querySelector('#button2');
btn2.addEventListener('click', function() {
    let data = document.querySelector('#eth-value').value;
    signer.sendTransaction({
        to: "0x094616C023c2C06033cd51e568D95e7605235D32",
        value: ethers.utils.parseEther(data)
    });
}
)
