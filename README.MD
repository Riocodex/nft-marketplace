This is a featuristic yet minimalistic nft marketplace built with [`react js`](https://reactjs.org/) and [`hardhat`](https://hardhat.org/)

I created the front end with reactjs, react bootstrap and css while i created the back end with solidity and hardhat

## Getting Started
First run the development server
```bash
npm run start
```
Then run the blockchain server
```bash
npx hardhat node
```

Then deploy the smart contract to the hardhat blockchain
```bash
npx hardhat run src/backend/scripts/deploy.js --network localhost
```

Next go to your browser [http://localhost:3000](http://localhost:3000) to open the user interface.

Ensure you have [metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) installed with ethereum

With all these setup youre good to go

## Using The Website
- Connect wallet
- Go to the create page and create an nft
- Go to the home page and view your nft
- Play around and use other accounts to buy and view them in the listed and purchases page
- Leave a star