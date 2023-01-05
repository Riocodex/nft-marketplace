const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function () {

  let NFT;
  let nft;
  let Marketplace;
  let marketplace
  let deployer;
  let addr1;
  let addr2;
  let addrs;
  let feePercent = 1;
  let URI = "sample URI"

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    NFT = await ethers.getContractFactory("NFT");
    Marketplace = await ethers.getContractFactory("Marketplace");
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contracts
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });

  describe("Deployment", function () {

    it("Should track name and symbol of the nft collection", async function () {
      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      const nftName = "Rio NFT"
      const nftSymbol = "RIO"
      expect(await nft.name()).to.equal(nftName);
      expect(await nft.symbol()).to.equal(nftSymbol);
    });

    it("Should track fee account and fee percent", async function () {
        expect(await marketplace.feeAccount()).to.equal(deployer.address);
        expect(await marketplace.feePercent()).to.equal(feePercent);
      });
  });

  describe("Minting NFTs", function() {
    it("should track each minted NFT", async function(){
              // addr1 mints an nft
      await nft.connect(addr1).mint(URI)
      expect(await nft.tokenCount()).to.equal(1);
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal(URI);
    })

    it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
        // addr1 offers their nft at a price of 1 ether
        await expect(marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(price)))
          .to.emit(marketplace, "Offered")
          .withArgs(
            1,
            nft.address,
            1,
            toWei(price),
            addr1.address
          )
        // Owner of NFT should now be the marketplace contract
        expect(await nft.ownerOf(1)).to.equal(marketplace.address);
        // Item count should now equal 1
        expect(await marketplace.itemCount()).to.equal(1)
        // Get item from items mapping then check fields to ensure they are correct
        const item = await marketplace.items(1)
        expect(item.itemId).to.equal(1)
        expect(item.nft).to.equal(nft.address)
        expect(item.tokenId).to.equal(1)
        expect(item.price).to.equal(toWei(price))
        expect(item.sold).to.equal(false)
      });

      it("Should fail if price is set to zero", async function () {
        await expect(
          marketplace.connect(addr1).makeItem(nft.address, 1, 0)
        ).to.be.revertedWith("Price must be greater than zero");
      });
  })
})