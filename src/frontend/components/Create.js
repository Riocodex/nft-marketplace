import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const Create = () => {
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    //file to upload data whenever therses a change to the input file
    const uploadToIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
          try {
            const result = await client.add(file)
            console.log(result)
            setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
          } catch (error){
            console.log("ipfs image upload error: ", error)
          }
        }
      }
      const createNFT = async () => {
        if (!image || !price || !name || !description) return
        try{
          const result = await client.add(JSON.stringify({image, price, name, description}))
          mintThenList(result)
        } catch(error) {
          console.log("ipfs uri upload error: ", error)
        }
      }

      const mintThenList = async (result) => {
        const uri = `https://ipfs.infura.io/ipfs/${result.path}`
        // mint nft 
        await(await nft.mint(uri)).wait()
        // get tokenId of new nft 
        const id = await nft.tokenCount()
        // approve marketplace to send nft
        await(await nft.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
        const listingPrice = ethers.utils.parseEther(price.toString())
        await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
      }


  return (
    <div className="container-fluid mt-5">
      <div className="row"></div>
    </div>
  )
}

export default Create
