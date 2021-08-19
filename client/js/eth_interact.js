import { removeElementsBySelector, makeDisplayElement, loadingBarStart, loadingBarStop } from './utils.js'
import { ethers, signer, ERROR_CHK, ec_with_singer } from "./metamask.js"


const btn1 = document.querySelector('#eth_get_test');
const btn2 = document.querySelector('#eth_post_test');




btn1.addEventListener('click', async () => {
    let addr = await signer.getAddress()
    console.log(addr)
});
btn2.addEventListener('click', async () => {
    loadingBarStart()
    let a = new Promise(resolve => {setTimeout(function(){resolve(10)}, 2000)})
    await a
    let id = await ec_with_singer.getMaxId()
    let uri = await ec_with_singer.uri(0)
    loadingBarStop()
});
