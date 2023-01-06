import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const Create = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="row"></div>
    </div>
  )
}

export default Create
