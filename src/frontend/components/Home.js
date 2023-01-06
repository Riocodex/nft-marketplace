import {useState, useEffect} from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'


const Home = ({marketplace, nft}) => {
    const [items, setItems] = useState([])
    const loadMarketplaceItems = async () => {
        const itemCount = await marketplace.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++){
            
        }
    }
  return (
      <div className="flex justify-center">

      </div>
  )
}

export default Home
