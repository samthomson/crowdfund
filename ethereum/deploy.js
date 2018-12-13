const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')

const envVars = require('./env')

const provider = new HDWalletProvider(
    envVars.mneumonic,
    envVars.deployUrl
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    const deployAccount = accounts[0]

    console.log(`we will be deploying with public key ${deployAccount}`)

    const deployResult = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
    .deploy(
        {
            data: compiledFactory.bytecode
        }
    )
    .send({
        gas: '1000000',
        from: deployAccount
    })

    console.log(`contract deployed to ${deployResult.options.address}`)
}

deploy()