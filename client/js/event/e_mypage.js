/* global ethereum */
import Swal from 'sweetalert2'
import "animate.css"

import { removeElementsBySelector, makeDisplayElement, loadingBarStart, loadingBarStop } from '../utils.js'
import { ethers, provider, signer, accounts, ERROR_CHK, ec_with_singer } from '../metamask.js'


const btn = document.querySelector('#b_get_b');
btn.addEventListener('click', async function() {
    removeElementsBySelector('.display')
    let d = document.querySelector('.display-home-value')
    let res = await provider.getBalance(accounts[0]);
    let balance = ethers.utils.formatEther(res)
    Swal.fire({
        icon: 'info',
        title: 'Your Balance',
        html: `Current account : <b>${accounts[0]}</b>` + `<br><br> <b>${balance}</b> ETH`,
        showClass: {
            popup: 'animate__animated animate__bounceInDown'
          },
        hideClass: {
            popup: 'animate__animated animate__bounceOutUp'
          }
      })

})

const btn1 = document.querySelector('#b_send_t');
btn1.addEventListener('click', async function() {
    let to_ = document.querySelector('#to_address').value;
    if (to_ === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter the address to send ETH!'
          })
          return;
    }
    let data = document.querySelector('#eth-value').value;

    if (data === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter the quantity of the ETH!'
          })
          return;
    }
    try {
        let res = await signer.sendTransaction({
            to: to_,
            value: ethers.utils.parseEther(data)
        });
        console.log(res)
    }
    catch(e) {
        if (e.code === ERROR_CHK.INVALID_ARGUMENT) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${e.reason} at ${e.argument}`
              })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${e.reason||e.message}`
              })
        }

    }

})

const btn2 = document.querySelector('#etp_get');
const btn3 = document.querySelector('#eth_post_test');


btn2.addEventListener('click', async () => {
    let etps = await ec_with_singer.getMyETP(accounts[0])
    let display_html = ""
    etps.forEach((etp)=>{display_html+=(etp+"<br>")})
    Swal.fire({
        position: 'center',
        title: 'My ETP list',
        icon: 'info',
        width: 800,
        html: `<b>${display_html}</b>`,
        showConfirmButton: true,
        showClass: {
            popup: 'animate__animated animate__rotateIn'
          },
        hideClass: {
            popup: 'animate__animated animate__rotateOut'
          }
      })
});
btn3.addEventListener('click', async () => {
    loadingBarStart()
    let a = new Promise(resolve => {setTimeout(function(){resolve(10)}, 2000)})
    await a
    loadingBarStop()
});