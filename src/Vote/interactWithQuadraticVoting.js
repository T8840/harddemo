const { ethers } = require("ethers");

// Replace with your own provider URL
const providerUrl = "http://localhost:8545";
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Replace with the private key of the address that will interact with the contract
const privateKey = "0x...";
const wallet = new ethers.Wallet(privateKey, provider);

// Replace with the ABI and address of the deployed QuadraticVoting contract
const contractAbi = [...];
const contractAddress = "0x...";

const quadraticVotingContract = new ethers.Contract(contractAddress, contractAbi, wallet);

async function createProposal(description) {
  const tx = await quadraticVotingContract.createProposal(description);
  await tx.wait();
  console.log(`Proposal created: ${description}`);
}

async function vote(proposalId, votes) {
  const tx = await quadraticVotingContract.vote(proposalId, votes);
  await tx.wait();
  console.log(`Voted ${votes} votes on proposal ID: ${proposalId}`);
}

async function allocateCredits(recipient, amount) {
  const tx = await quadraticVotingContract.allocateCredits(recipient, amount);
  await tx.wait();
  console.log(`Allocated ${amount} credits to address: ${recipient}`);
}

// Example usage
(async () => {
  await createProposal("Example proposal");
  const recipient = "0x...";
  await allocateCredits(recipient, 1000);
  await vote(0, 4);
})();
