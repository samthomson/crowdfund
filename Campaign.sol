pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvedByContributors;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint iRequestIndex) public {
        Request storage rLocalRequest = requests[iRequestIndex];
        // is the caller a contributor?
        require(approvers[msg.sender]);
        // and hasn't already voted on this issue
        require(!rLocalRequest.approvedByContributors[msg.sender]);
        
        // cast there vote, and record they have voted
        rLocalRequest.approvalCount++;
        rLocalRequest.approvedByContributors[msg.sender] = true;
    }
}