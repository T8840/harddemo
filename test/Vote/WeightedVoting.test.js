const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WeightedVoting", function () {
  let WeightedVotingToken, myToken, WeightedVoting, weightedVoting, owner, addr1, addr2;

  beforeEach(async () => {
    WeightedVotingToken = await ethers.getContractFactory("WeightedVotingToken");
    myToken = await WeightedVotingToken.deploy(1000);
    await myToken.deployed();

    WeightedVoting = await ethers.getContractFactory("WeightedVoting");
    weightedVoting = await WeightedVoting.deploy(myToken.address);
    await weightedVoting.deployed();

    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  it("Should create a proposal and vote with token balance as weight", async function () {
    // Airdrop tokens to addr1 and addr2
    await myToken.transfer(addr1.address, 100);
    await myToken.transfer(addr2.address, 200);

    // Create a proposal
    await weightedVoting.connect(addr1).createProposal("Proposal 1");

    // Vote on proposal
    const tokenBalanceAddr1 = await myToken.balanceOf(addr1.address);
    const tokenBalanceAddr2 = await myToken.balanceOf(addr2.address);

    await weightedVoting.connect(addr1).vote(0, true); // true for yes vote
    await weightedVoting.connect(addr2).vote(0, true); // true for yes vote
    

    // Check proposal votes
    const proposal = await weightedVoting.getProposal(0);
    expect(proposal.yesVotes).to.equal(tokenBalanceAddr1.add(tokenBalanceAddr2));
    expect(proposal.noVotes).to.equal(0);
  });

  it("Should not allow voting on an invalid proposal", async function () {
    await expect(weightedVoting.connect(addr1).vote(999, true)).to.be.revertedWith("Invalid proposal ID");
  });
  
  it("Should not allow voting without token balance", async function () {
    await weightedVoting.connect(addr1).createProposal("Proposal 1");
    await expect(weightedVoting.connect(addr1).vote(0, true)).to.be.revertedWith("You have no voting power");
    });
  

  it("Should not allow double voting on the same proposal", async function () {
    await myToken.transfer(addr1.address, 100);
    await weightedVoting.connect(addr1).createProposal("Proposal 1");
    await weightedVoting.connect(addr1).vote(0, true);
    await expect(weightedVoting.connect(addr1).vote(0, true)).to.be.revertedWith("You have already voted on this proposal");
  });
  
  it("Should create a proposal and vote with token balance as weight for No votes", async function () {
    await myToken.transfer(addr1.address, 100);
    await myToken.transfer(addr2.address, 200);
    await weightedVoting.connect(addr1).createProposal("Proposal 1");
    const tokenBalanceAddr1 = await myToken.balanceOf(addr1.address);
    const tokenBalanceAddr2 = await myToken.balanceOf(addr2.address);
    await weightedVoting.connect(addr1).vote(0, false); // false for no vote
    await weightedVoting.connect(addr2).vote(0, false); // false for no vote
    const proposal = await weightedVoting.getProposal(0);
    expect(proposal.noVotes).to.equal(tokenBalanceAddr1.add(tokenBalanceAddr2));
    expect(proposal.yesVotes).to.equal(0);
  });
  

});
