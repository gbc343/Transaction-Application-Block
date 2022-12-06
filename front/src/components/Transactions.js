import React, {useState, useEffect} from 'react'
import axios from "axios";

const Transactions = () => {
const [transactions,setTransactions] = useState([]);

    useEffect( () => {
         async function fetchData() {
        await axios.get('http://localhost:3001/transaction/history')
        .then(res => {
            const addresss = res.data;
            console.log(addresss)
            setTransactions(addresss);
        })
    }
    fetchData();
    },[])


        return (
         <div classname="shown border">
            <h1>Transaction History</h1>
        
            {transactions.map((transaction)=> {
            return( 
            <div div className=" border text-left" key={transaction.source}>
                <p><b>Transaction Hash:</b> {transaction.receiptHash}</p>
                <p><b>Status:</b> {transaction.status}</p>
                <p><b>Timestamp:</b> {transaction.createdAt}</p>
                <p><b>From: </b>{transaction.source}</p>
                <p><b>To:</b> {transaction.destination}</p>
                <p><b>Value:</b> {transaction.amount}</p>
            </div>)
           
         })}
         </div>
        );
    
}

export default Transactions;