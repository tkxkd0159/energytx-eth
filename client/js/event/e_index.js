/* global ethereum */

import { removeElementsByClass, makeDisplayElement, hexToNum } from '../utils.js'
import { ethers, accounts } from '../metamask.js'

const eth_btn = document.querySelector('#b_enable_eth');
eth_btn.addEventListener('click', async () => {
    removeElementsByClass('.display')
    let chain_id = await ethereum.request({ method: "eth_chainId", params: [] });
    let balance = await ethereum.request({ method: "eth_getBalance","params":[accounts[0], "latest"]})
    balance = ethers.utils.formatEther(balance)
    let block_number = await ethereum.request({ method: "eth_blockNumber", params: []})

    let d = document.querySelector('.display-home-value')
    makeDisplayElement(`Currnet account is ${accounts[0]}`, d)
    makeDisplayElement(`My balance is ${balance}`, d)
    makeDisplayElement(`chain ID is ${chain_id}`, d)
    makeDisplayElement(`urrent block number is ${hexToNum(block_number)}`, d)
});