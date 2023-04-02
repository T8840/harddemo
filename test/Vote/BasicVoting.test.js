
const { expect } = require("chai");

describe("BasicVoting", function () {
    let BasicVoting, basicVoting, owner, addr1, addr2, addr3;

    beforeEach(async () => {
        // Get the ContractFactory and Signers
        BasicVoting = await ethers.getContractFactory("BasicVoting");
        [owner, addr1, addr2, addr3, _] = await ethers.getSigners();

        // Deploy the contract
        basicVoting = await BasicVoting.deploy();
        await basicVoting.deployed();
    });

    it("Should create a new proposal", async () => {
        const description = "Proposal 1";
        await basicVoting.connect(owner).createProposal(description);

        const proposal = await basicVoting.getProposal(1);
        expect(proposal.description).to.equal(description);
    });

    it("Should vote on a proposal", async () => {
        const description = "Proposal 1";
        await basicVoting.connect(owner).createProposal(description);

        await basicVoting.connect(addr1).vote(1);

        const proposal = await basicVoting.getProposal(1);
        expect(proposal.voteCount).to.equal(1);
    });

    it("Should not allow voting on a non-existent proposal", async () => {
        await expect(basicVoting.connect(addr1).vote(999)).to.be.revertedWith("Invalid proposal ID.");
    });

    it("Should not create a proposal with an empty description", async () => {
        await expect(basicVoting.connect(owner).createProposal("")).to.be.revertedWith("Description cannot be empty");
    });

    it("Should allow multiple signers to vote on a proposal", async () => {
        const description = "Proposal 1";
        await basicVoting.connect(owner).createProposal(description);

        await basicVoting.connect(addr1).vote(1);
        await basicVoting.connect(addr2).vote(1);
        await basicVoting.connect(addr3).vote(1);

        const proposal = await basicVoting.getProposal(1);
        expect(proposal.voteCount).to.equal(3);
    });

    it("Should not allow a signer to vote twice on the same proposal", async () => {
        const description = "Proposal 1";
        await basicVoting.connect(owner).createProposal(description);
    
        await basicVoting.connect(addr1).vote(1);
        await expect(basicVoting.connect(addr1).vote(1)).to.be.revertedWith("You have already voted on this proposal.");
    });

    it("Should allow voting on multiple proposals", async () => {
        const description1 = "Proposal 1";
        const description2 = "Proposal 2";
        await basicVoting.connect(owner).createProposal(description1);
        await basicVoting.connect(owner).createProposal(description2);

        await basicVoting.connect(addr1).vote(1);
        await basicVoting.connect(addr2).vote(1);
        await basicVoting.connect(addr3).vote(2);

        const proposal1 = await basicVoting.getProposal(1);
        const proposal2 = await basicVoting.getProposal(2);
        expect(proposal1.voteCount).to.equal(2);
        expect(proposal2.voteCount).to.equal(1);
    });
});
