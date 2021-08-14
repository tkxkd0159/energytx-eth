
import {posTest} from './test.mjs'

console.log(posTest())
// this returns the provider, or null if it wasn't detected
function startApp(provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
    }
// Access the decentralized web!
}

async function metaStart() {
    const provider = await detectEthereumProvider();
    if (provider) {
        startApp(provider); // Initialize your app
    } else {
        console.log('Please install MetaMask!');
    }

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    return chainId


}
metaStart().then(console.log)