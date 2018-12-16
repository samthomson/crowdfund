pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public {
        address newCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

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
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creatorAddress) public {
        manager = creatorAddress;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
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
    
    function finalizeRequest(uint iRequestIndex) public restricted {
        Request storage rLocalRequest = requests[iRequestIndex];
        // majority?
        require(rLocalRequest.approvalCount > (approversCount / 2));
        // check not already marked complete
        require(!rLocalRequest.complete);
        
        // discharge funds
        rLocalRequest.recipient.transfer(rLocalRequest.value);
        
        rLocalRequest.complete = true;
    }

    function getSummary() public view returns (
        uint,
        uint,
        uint,
        address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            manager
        );
    }

    function getRequestsCouunt() public view returns (uint) {
        return requests.length;
    }
}