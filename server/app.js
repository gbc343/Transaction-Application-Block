var cors = require('cors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const express = require('express');
const bodyParser = require("body-parser");


const app = express();

const transactions = require('./modules/transactions')
const accounts = require('./modules/accounts')


let connectionString = "mongodb://localhost:27017/blockchain-explorer";;
mongoose.connect(connectionString);

//connection to mongoose
mongoose
 .connect(connectionString, { useNewUrlParser: true } )
 .then( () => { console.log("Mongoose connected successfully to Mongo DB"); },
   error => { console.log("Mongoose could not connected to database: " + error); }
 );

 app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

 app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.get('/account/addresses', async (req, res) => {
    var list = await accounts.getAddresses();
    res.send(list);
    console.log('Sent list of items');

});

app.get('/account/balance', async (req, res) => {
     var account = req.query.account;
     if(!account){
         account = "0x4jkfjio4jifko4joifj99fgjdf5jifjgifjj33jdijieipo6"
     }
    await  accounts.getBalance(account)
     .then(balance => {
        console.log(`account balance called: ${account}: ${balance}`)
        res.send({account ,balance});
     })
     .catch(err => {
      console.log(err)
      res.send(`eror was ${err}`)
     })
     
});

app.get('/transaction/history', (req, res) => {
     transactions.find((error, document) => {
      if(error) console.log(error)
      else{
        const data = document;
        res.send(data);
      }
     })
});

app.post('/transaction/send', async (req,res) => {
    console.log(`POST called =====>>>>> ${JSON.stringify(req.body)}`);

    const source = req.body.source;
    const destination = req.body.destination;
    const value = req.body.amount;
    console.log(req.body)
    if (!source) return res.status(400).send("missing source");
    if (!destination) return res.status(400).send("missing destination");
    if (!value) return res.status(400).send("missing value");

    res.send(await accounts.sendTransaction(source, destination, value));

})
 
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));