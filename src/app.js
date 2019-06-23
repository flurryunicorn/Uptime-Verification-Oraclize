// // Import the page's CSS. Webpack will know what to do with it, 
// // as it's been configured by truffle-webpack
import './app.css';

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))

var va
var fbn
const gasAmt = 3e6

const abi = [{"constant":true,"inputs":[],"name":"offTimeValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"event","anonymous":false,"inputs":[{"indexed":false,"name":"description","type":"string"}],"name":"NewOraclizeQuery"},{"anonymous":false,"inputs":[{"indexed":false,"name":"value","type":"string"}],"name":"NewOffTimeValue","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_balance","type":"uint256"}],"name":"LogUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_myid","type":"bytes32"},{"indexed":true,"name":"_result","type":"string"}],"name":"__callback","type":"function","constant":false,"outputs":[],"payable":false,"stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"},{"name":"_proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_myid","type":"bytes32"},{"name":"_result","type":"string"},{"name":"_proof","type":"bytes"}],"name":"getBalance","outputs":[{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"update","outputs":[{"name":"_balance","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"update","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}]
const address = "0xB8FfC2f18Bac8AD6261028f520f10aF3f1adda88"
const contract = new web3.eth.Contract(abi, address)

contract.getPastEvents('NewOffTimeValue',{fromBlock: 0,toBlock: 'latest'},(err, events) => { va = events[0].returnValues[0] ; console.log(va); document.getElementById('total').innerHTML = va; })

web3.eth.personal.getAccounts().then(function(value){fbn = value[0]; console.log(fbn); web3.eth.getBalance(value[0], (err, wei) => {var balance = web3.utils.fromWei(wei, 'ether'); console.log(balance); document.getElementById('balance').innerHTML = parseFloat(balance).toFixed(6)}) })

function refresh() {
    contract.getPastEvents('NewOffTimeValue',{fromBlock: 0,toBlock: 'latest'},(err, events) => { va = events[0].returnValues[0] ; console.log(va); document.getElementById('total').innerHTML = va; })

    web3.eth.personal.getAccounts().then(function(value){fbn = value[0]; console.log(fbn); web3.eth.getBalance(value[0], (err, wei) => {var balance = web3.utils.fromWei(wei, 'ether'); console.log(balance); document.getElementById('balance').innerHTML = parseFloat(balance).toFixed(6)}) })

    contract.methods.update().send({from: fbn,gas: gasAmt})

}

setInterval(function () {refresh();}, 30000)