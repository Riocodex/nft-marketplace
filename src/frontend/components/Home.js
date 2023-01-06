import {useState, useEffect} from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'


const Home = ({marketplace, nft}) => {
    const [items, setItems] = useState([])
    const loadMarketplaceItems = async () => {
        const itemCount = await marketplace.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++){
            const item = await marketplace.items(i)
            if(!item.sold){
                //get uri url from nft contract
                const uri = await nft.tokenUri(item.tokenId)
                //use uri to fetch the nft metadata stored on ipfs
                const response = await fetch(uri)
                const metadata = await response.json()
            }
        }
    }
  return (
      <div className="flex justify-center">

      </div>
  )
}

export default Home
