const { ethers } = require("ethers");

const weightedVotingABI = [
  // WeightedVoting contract ABI
];

const tokenABI = [
  // MyToken contract ABI
];

const weightedVotingAddress = "your_weighted_voting_contract_address";
const tokenAddress = "your_token_contract_address";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const wallet = new ethers.Wallet("your_private_key", provider);

const weightedVotingContract = new ethers.Contract(weightedVotingAddress, weightedVotingABI, wallet);
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

async function airdropTokens(amount) {
  const tx = await tokenContract.transfer(wallet.address, amount);
  await tx.wait();
  console.log(`Airdropped ${amount} tokens`);
}

async function vote(proposalId) {
  const balance = await tokenContract.balanceOf(wallet.address);
  const tx = await weightedVotingContract.vote(proposalId, balance);
  await tx.wait();
  console.log("Voted on proposal!");
}

(async () => {
  // Airdrop 100 tokens to the wallet
  await airdropTokens(100);

  // Vote on proposal with ID 1 and use the token balance as weight
  await vote(1);
})();
