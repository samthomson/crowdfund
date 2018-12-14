import Web3 from 'web3'
const envVars = require('./env')

let web3;
if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
    // we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider)
} else {
    // we are on the server Or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        envVars.deployUrl
    )
    web3 = new Web3(provider)
}


export default web3