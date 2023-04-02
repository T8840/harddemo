const { ethers } = require("ethers");

// Replace with your own provider URL and private key
const providerUrl = "http://localhost:8545";
const privateKey = "0x...";

// Replace with your contract's ABI and address
const contractAbi = [...];
const contractAddress = "0x...";

async function main() {
    // Initialize the provider and signer
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const signer = new ethers.Wallet(privateKey, provider);

    // Connect to the deployed contract
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    // Create a new proposal
    const proposalDescription = "Proposal 1";
    const createProposalTx = await contract.createProposal(proposalDescription);
    await createProposalTx.wait();
    console.log(`Created proposal: "${proposalDescription}"`);

    // Vote on the proposal
    const proposalId = 1;
    const voteTx = await contract.vote(proposalId);
    await voteTx.wait();
    console.log(`Voted on proposal ${proposalId}`);

    // Get the proposal result
    const proposal = await contract.getProposal(proposalId);
    console.log(`Proposal ${proposalId}: ${proposal.description} with ${proposal.voteCount} votes`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
