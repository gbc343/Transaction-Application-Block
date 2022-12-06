import React, {useState, useEffect} from 'react';
import axios from "axios";

const Wallet = () => {


   const [walletList, setWalletList] = useState([]);

    useEffect(() => {
        async function fetchData(){
        axios.get('http://localhost:3001/account/balance?account=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
        .then(res => {
            const address = res.data;
            setWalletList(address);
        })
    }
    fetchData()
    }, [])

 

    return(
        
        <div className='shown text-left'>
            <h1>My Wallet</h1>
           
            <p><b>Address:</b> {walletList.account}</p>
            <p><b>Balance:</b> {walletList.balance}</p>
          
          
            

        </div>
    )
}

export default Wallet