const { expect } = require("chai")

describe("NFTMarketplace", async function(){
    let deployer, addr1, addr2, nft, marketplace
    let feePercent = 1
    beforeEach(async function() {
        //get Contract address
    const NFT = await ethers.getContractFactory("NFT")
    const Marketplace = await ethers.getContractFactory("Marketplace")
    //get signers
    [deployer, addr1, addr2] = await ethers.getSigners()
    //deploy contracts
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent)
    });
    describe("Deployment", function(){
        it("Should track name and symbol of the nft collection", async function(){
            expect(await nft.name()).to.equal("Rio NFT")
            expect(await nft.symbol()).to.equal("RIO")

        })
    })
})