/* global ethereum */

import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
import Swal from 'sweetalert2'

import { removeElementsBySelector } from './utils.js'

let provider;
let signer;
let accounts;
const ERROR_CHK = ethers.utils.Logger.errors;

async function checkMetamask() {
    const provider = await detectEthereumProvider();
    if (provider) {
        try {
            if (provider !== window.ethereum) {
                console.error('Do you have multiple wallets installed?');
            }
            else if (accounts === undefined) {
                accounts = await ethereum.request({ method: "eth_requestAccounts" });
            }
            return true;
        }
        catch (e) {
            if (e.code === -32002) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    html: '<em>wallet_requestPermissions</em> is pending. Please check your metamask extension',
                    showConfirmButton: false,
                    timer: 3000
                  })
            }
            return false;
        }
    }
    else {
        console.log('Please install MetaMask!');
        return false;
    }
}

// https://infura.io/docs/ethereum/json-rpc
(async function() {
    if (await checkMetamask()) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);  // metamask API
        signer = provider.getSigner();
    }
})();


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
ethereum.on('accountsChanged', async (accounts) => {
    await Swal.fire({
        title: 'Updated!',
        html: `Current account : <b>${accounts[0]}</b>`,
        icon: 'success',
        confirmButtonText: 'OK'
      })
    window.location.reload();

})

const permission_btn = document.querySelector('#b_permission');
permission_btn.addEventListener('click', async () => {
    removeElementsBySelector('.display')
    try {
        let permissions = await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });

        if (permissions.find((p) => p.parentCapability === 'eth_accounts')) {
            let account_ls = permissions[0]["caveats"][1]["value"]
            let res = ""
            account_ls.forEach((p) => {
                res += p
                res += "\n"
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                html: '<h4>Connect to Metamask successfully!</h4><br>' +
                      `Got permissions for <b>${res}<b>`,
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
);

export { ethers, provider, signer, ERROR_CHK, accounts }