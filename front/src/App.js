import logo from './logo.svg';
import React from 'react'
import './App.css';
import {BrowserRouter,Route, Routes, Link} from "react-router-dom";
import Transactions from './components/Transactions';
import Addresses from './components/Addresses';
import Transfers from './components/Transfers';
import Navigation from './components/Navigation';
import Wallet from './components/Wallet';

function App() {
  return (
      
    <BrowserRouter>
    
        <Navigation/>
       <Routes>
          <Route path="/" element={<Transactions />} exact/>
          <Route path="addresses" element={<Addresses />}/>
          <Route path="wallet" element={<Wallet />}/>
          <Route path="/transfers" element={<Transfers/>}/>
          <Route component={Error}/>

        </Routes>
    
    
    </BrowserRouter>
    
  );
}

export default App;