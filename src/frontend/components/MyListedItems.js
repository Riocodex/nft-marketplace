import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'



const MyListedItems = ({marketplace, nft, account}) => {
    const [loading, setLoading] = useState(true)
    const [listedItems, setListedItems] = useState([])
    const [soldItems, setSoldItems] = useState([])

    const loadListedItems = async() =>{
        //load all sold items that the user listed
        const itemCount = await marketplace.itemCount()
        let listedItems = []
        let soldItems = []
        for (let indx = 1; indx <= itemCount; indx++) {
            const i = await marketplace.items(indx)
        }
    }
    useEffect(() =>{
        loadListedItems()
    },[])
  return (
    <div className="flex justify-center">
      
    </div>
  )
}

export default MyListedItems
