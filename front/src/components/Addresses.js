import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react'
import axios from "axios";

const Addresses = () => {
  const [adresses,setAddresses] = useState([]);

  useEffect( () =>{
    async function fetchData() {
    await axios.get('http://localhost:3001/account/addresses')
    .then(res => {
    setAddresses(res.data);
    })
  }
  fetchData();
  },[])
  

    return(
      <div className="shown text-left">
      <h1>Blockchain Node Addresses</h1>
      {adresses.map((adressess)=> 
      {
        return(
           <ol >
            <Link to="/transfers" state={{address:adressess}}> <b>{adressess}</b></Link>
          </ol>
            
        )
      })}
      </div>
    )
    

}

export default Addresses;