// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicVoting {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
    }

    address public owner;
    uint256 public proposalCount;

    // Mapping to store proposals
    mapping(uint256 => Proposal) public proposals;

    // Mapping to store whether an address has already voted on a proposal
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    // Event to be emitted when a new proposal is created
    event ProposalCreated(uint256 id, string description);

    // Event to be emitted when a vote is cast
    event VoteCasted(uint256 proposalId, address voter);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    // Function to create a new proposal
    function createProposal(string memory _description) public onlyOwner {
        require(bytes(_description).length > 0, "Description cannot be empty");

        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _description, 0);
        emit ProposalCreated(proposalCount, _description);
    }

    // Function to vote on a proposal
    function vote(uint256 _proposalId) public {
        require(!hasVoted[msg.sender][_proposalId], "You have already voted on this proposal.");
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal ID.");

        hasVoted[msg.sender][_proposalId] = true;
        proposals[_proposalId].voteCount++;

        emit VoteCasted(_proposalId, msg.sender);
    }

    // Function to get the result of a proposal
    function getProposal(uint256 _proposalId) public view returns (uint256 id, string memory description, uint256 voteCount) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "Invalid proposal ID.");

        Proposal storage proposal = proposals[_proposalId];
        return (proposal.id, proposal.description, proposal.voteCount);
    }
}