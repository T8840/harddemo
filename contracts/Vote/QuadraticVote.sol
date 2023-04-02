// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QuadraticVote {
    struct Proposal {
        string description;
        uint256 votes;
    }

    address public owner;
    Proposal[] public proposals;

    mapping(address => uint256) public credits;

    event ProposalCreated(uint256 indexed proposalId, string description);
    event Voted(uint256 indexed proposalId, address indexed voter, uint256 votes);

    constructor() {
        owner = msg.sender;
    }

    function createProposal(string memory _description) public {
        require(bytes(_description).length > 0, "Description cannot be empty");
        proposals.push(Proposal({description: _description, votes: 0}));
        emit ProposalCreated(proposals.length - 1, _description);
    }

    function vote(uint256 _proposalId, uint256 _votes) public {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        uint256 cost = _votes * (_votes + 1) / 2;
        require(credits[msg.sender] >= cost, "Not enough credits to vote");

        credits[msg.sender] -= cost;
        proposals[_proposalId].votes += _votes;

        emit Voted(_proposalId, msg.sender, _votes);
    }

    function allocateCredits(address _recipient, uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can allocate credits");
        credits[_recipient] += _amount;
    }
}
