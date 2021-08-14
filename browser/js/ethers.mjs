const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;
(async () => {
    await provider.send("eth_requestAccounts", []);  // metamask API
    signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
})();

const btn = document.querySelector('#button1');
btn.addEventListener('click', function() {

    getBalance()   // 기다리면 안되고 얘 혼자 돌아야되니 비동기 함수이지만 콜백에서 await 하지 않음

    provider.getBlockNumber().then((res)=>{
        let pElem = document.createElement('p');
        pElem.textContent = `now is ${res}`;
        document.body.appendChild(pElem);
    })
})

const btn2 = document.querySelector('#button2');
btn2.addEventListener('click', function() {
    SendTX()
}
)
async function getBalance(){
    const res = await fetch('http://127.0.0.1:3000/balance', {method: "GET"});
    const data = await res.text();
    let p = document.createElement('p');
    p.textContent = `New From ts is ${data}`;
    document.body.appendChild(p);
}

async function SendTX() {
    signer.sendTransaction({
        to: "0x094616C023c2C06033cd51e568D95e7605235D32",
        value: ethers.utils.parseEther("1.0")
    });
}