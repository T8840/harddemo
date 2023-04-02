// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WeightedVoting {
    struct Proposal {
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        mapping(address => bool) hasVoted;
    }

    IERC20 public token;
    Proposal[] public proposals;

    constructor(IERC20 _token) {
        token = _token;
    }

    function createProposal(string memory _description) public {
        Proposal storage newProposal = proposals.push();
        newProposal.description = _description;
        newProposal.yesVotes = 0;
        newProposal.noVotes = 0;
    }


    function vote(uint256 _proposalId, bool _vote) public {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        uint256 weight = token.balanceOf(msg.sender);
        require(weight > 0, "You have no voting power");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.hasVoted[msg.sender], "You have already voted on this proposal");

        if (_vote) {
            proposal.yesVotes += weight;
        } else {
            proposal.noVotes += weight;
        }

        proposal.hasVoted[msg.sender] = true;
    }

    function getProposal(uint256 _proposalId) public view returns (string memory description, uint256 yesVotes, uint256 noVotes) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.description, proposal.yesVotes, proposal.noVotes);
    }
}
