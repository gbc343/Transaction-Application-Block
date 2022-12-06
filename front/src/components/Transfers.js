import React, { useState, useEffect} from 'react'
import {Link, useLocation} from "react-router-dom";
import {DEFAULT_DESTINATION_ADDRESS} from "../constants";
import axios from "axios";

const Transfers = (props) => {

    const location = useLocation()
    console.log(location)
     const[state, setState] = useState('')
     const [isShown, setIsShown] = useState();
     const [num, setNum] = useState('');
     const [reciept, setReciept] = useState({});


     useEffect(() =>{
      if(location.state){
        var str = ''
        str = location.state.address
        console.log(str)
        setState(str)
        console.log(state)
      }
      setIsShown(false);
    }, [])


    const handleClick = (e) => {
      console.log(`handle input change ${e.target.value}`);
      setNum(e.target.value);
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`transfer submit handler..`);
    const response = await axios.post(
      "http://localhost:3001/transaction/send",
      {
        source: state,
        destination: DEFAULT_DESTINATION_ADDRESS,
        amount: num,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
      setReciept(response);
   if(reciept.length!==0){
        setIsShown(component => !component);
    }else{
       setIsShown(false)
    }
  };
    
    return(
       <div className='shown text-left'>
        <h1>Transfer</h1>
          <form onSubmit={handleSubmit}>
                <p>
                  <b>From:</b> {state}
                </p>
                <p>
                  <b>To:</b> {DEFAULT_DESTINATION_ADDRESS}{" "}
                </p>
                <p>    
                  <b>Amount</b> {" "}  
                    <input
                      type="textbox"
                       width={10}
                       value={num}
                       onChange={handleClick}
                        />{" "}
                  </p>    
              <button type="submit">submit</button>

          </form>
       

      {isShown && (
        <div>
          <h1>Reciept </h1>
          <p>Transaction Hash:{reciept.data.transactionHash}</p>
          <p>Block Hash: {reciept.data.blockHash}</p>
          <p>Block Number: {reciept.data.blockNumber}</p>
          <p>From: {state}</p>
          <p>To: {DEFAULT_DESTINATION_ADDRESS}</p>
          <p>Gas Used: {reciept.data.gasUsed}</p>
        </div>
      )}

    </div>
    )
}

export default Transfers