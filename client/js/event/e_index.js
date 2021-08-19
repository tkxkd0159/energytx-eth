/* global ethereum */
import Swal from 'sweetalert2'
import "animate.css"
import { removeElementsBySelector, makeDisplayElement, hexToNum } from '../utils.js'
import { ethers, accounts } from '../metamask.js'

const eth_btn = document.querySelector('#b_enable_eth');
eth_btn.addEventListener('click', async () => {
    removeElementsBySelector('.display')
    let d = document.querySelector('.display-home-value')

    let chain_id = await ethereum.request({ method: "eth_chainId", params: [] });
    if (accounts === undefined) {
        removeElementsBySelector('.display')
        let caution = document.querySelector('#caution-home')
        let p = document.createElement('p');
        p.setAttribute("class", "alert alert-info h3 display")
        p.setAttribute("role", "alert")
        p.innerText = "If you want to get more informations, connect to Metamask";
        caution.appendChild(p);
    }
    else {
        let balance = await ethereum.request({ method: "eth_getBalance","params":[accounts[0], "latest"]})
        balance = ethers.utils.formatEther(balance)
        makeDisplayElement(`Currnet account is ${accounts[0]}`, d)
        makeDisplayElement(`My balance is ${balance}`, d)
    }
    let block_number = await ethereum.request({ method: "eth_blockNumber", params: []})

    makeDisplayElement(`chain ID is ${chain_id}`, d)
    makeDisplayElement(`Current block number is ${hexToNum(block_number)}`, d)
});


const permission_btn = document.querySelector('#b_permission');
permission_btn.addEventListener('click', async () => {
    removeElementsBySelector('.display')
    try {
        let permissions = await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
        if (permissions.find((p) => p.parentCapability === 'eth_accounts')) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                html: '<b>eth_accounts permission successfully requested!</b>',
                showConfirmButton: true,
                timer: 3000
              })
        }

    }
    catch(e) {
        if (e.code === -32002) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                html: '<em>wallet_requestPermissions</em> is pending. Please check your metamask extension',
                showConfirmButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
              })
        }
        else if (e.code == 4001) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                html: `<b>${e.message}</b>`,
                showConfirmButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
              })
        }
        }
    }

    // let d = document.querySelector('.display-home-value')
    // makeDisplayElement(`Currnet account is ${accounts[0]}`, d)
    // makeDisplayElement(`My balance is ${balance}`, d)
    // makeDisplayElement(`chain ID is ${chain_id}`, d)
    // makeDisplayElement(`urrent block number is ${hexToNum(block_number)}`, d)
);