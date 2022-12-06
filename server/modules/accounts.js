var Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");
const transactionModel = require('./transactions')

  let accounts = [];
  const getAddresses =  async () => {
    if (accounts.length === 0){
  console.log(`sendTransaction method called..`); 
  accounts = await web3.eth.getAccounts();
    }
    console.log(accounts);
    return accounts;
};



const getBalance = async (a) => {
const account =  web3.eth.getBalance(a);
return account;
}

const saveTransaction = (source, destination, amount, status, gasUsed, receiptHash) => {
    console.log(`saveTransaction source: ${source}, destination: ${destination}, amount: ${amount}`)
    let txn = new transactionModel({
        source: source,
        destination: destination,
        amount: amount,
        status: status,
        gasUsed: gasUsed,
        receiptHash: receiptHash
    });
    txn.save()
    .then((data)=>{
        console.log(`Txn ${source} ${destination} ${amount} save to DB on ${new Date().toISOString()}`);
      })
      .catch((err)=>{
        console.log(`ERROR: ${err}`);
      });
}


const sendTransaction = async (source, destination, value) => {
    // using the promise
    return await web3.eth.sendTransaction({
      from: source,
      to: destination,
      value: value
  })
  .then(function(receipt){
      console.log(`Transaction sent successful ${JSON.stringify(receipt, null, 4)}`)
      saveTransaction(source, destination, value, 'SUCCESS', receipt.gasUsed, receipt.transactionHash)
      return Promise.resolve(receipt)
  })
.catch(function (err) {
      console.log(`Transaction errror ${err}`)
      saveTransaction(source, destination, amount, 'FAILED', null, null)
      return Promise.reject(err)
  })
}






module.exports = {
  getAddresses,
  getBalance,
  sendTransaction

}


