//tools
import logo from './logo.png';
import './App.css';
import { Spinner } from 'react-bootstrap'

//packages
import { useState } from 'react'
import { ethers } from  "ethers"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


//data
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'

//files
import Navigation from './Navbar'
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'


 
function App() {
  const [ loading, setLoading ] = useState(true)
  const [ account, setAccount ] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})
  //Metamask Login/Connect
  const web3Handler = async() =>{
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
    setAccount(accounts[0])
    //Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //set signer
    const signer = provider.getSigner()
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {
    //get deployed copies of contract
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <BrowserRouter>
     <div className="App">
     <Navigation web3Handler={web3Handler} account={account}/>
     {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={
                <Home marketplace={marketplace} nft={nft} />
              } />
              <Route path="/create" element={
                <Create marketplace={marketplace} nft={nft} />
              } />
              <Route path="/my-listed-items" element={
                <MyListedItems marketplace={marketplace} nft={nft} account={account} />
              } />
              <Route path="/my-purchases" element={
                <MyPurchases marketplace={marketplace} nft={nft} account={account} />
              } />
            </Routes>
          )}
    </div>
    </BrowserRouter>
  );
}

export default App;
