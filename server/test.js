var Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");
const getaacounts = async (a) => {

  console.log(`sendTransaction method called..`);
  const accounts= await web3.eth.getBalance(a);
  console.log(accounts);
  console.log()
    
};

getaacounts("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");