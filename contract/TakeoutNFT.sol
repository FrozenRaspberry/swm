// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TakeoutNFT is Ownable, ERC721A, ReentrancyGuard {
    constructor(
    ) ERC721A("TakeoutNFT", "WAIMAIDAO", 5, 1500) {}

    // For marketing etc.
    function reserveMint(uint256 quantity) external onlyOwner {
        require(
            totalSupply() + quantity <= collectionSize,
            "too many already minted before dev mint"
        );
        uint256 numChunks = quantity / maxBatchSize;
        for (uint256 i = 0; i < numChunks; i++) {
            _safeMint(msg.sender, maxBatchSize);
        }
        if (quantity % maxBatchSize != 0){
            _safeMint(msg.sender, quantity % maxBatchSize);
        }
    }

    // metadata URI
    string private _baseTokenURI;

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdrawMoney() external onlyOwner nonReentrant {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function setOwnersExplicit(uint256 quantity) external onlyOwner nonReentrant {
        _setOwnersExplicit(quantity);
    }

    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    function getOwnershipData(uint256 tokenId)
    external
    view
    returns (TokenOwnership memory)
    {
        return ownershipOf(tokenId);
    }

    function refundIfOver(uint256 price) private {
        require(msg.value >= price, "Need to send more ETH.");
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }
    // allowList mint
    uint256 private allowListMintPrice = 0.000000 ether;
    // default false
    bool private allowListStatus = false;
    uint256 private allowListMintAmount = 980;
    uint256 public immutable maxPerAddressDuringMint = 2;

    mapping(address => uint256) public allowList;

    function allowListMint(uint256 quantity) external payable {
        require(tx.origin == msg.sender, "The caller is another contract");
        require(allowListStatus, "allowList sale has not begun yet");
        require(allowList[msg.sender] >= quantity, "not eligible for allowList mint");
        require(allowListMintAmount >= quantity, "allowList mint reached max");
        require(totalSupply() + quantity <= collectionSize, "reached max supply");
        allowList[msg.sender] -= quantity;
        _safeMint(msg.sender, quantity);
        allowListMintAmount -= quantity;
        refundIfOver(allowListMintPrice*quantity);
    }

    function setAllowList(address[] calldata allowList_) external onlyOwner{
        for(uint256 i = 0;i < allowList_.length;i++){
            allowList[allowList_[i]] = maxPerAddressDuringMint;
        }
    }

    function setAllowListStatus(bool status) external onlyOwner {
        allowListStatus = status;
    }

    function getAllowListStatus() external view returns(bool){
        return allowListStatus;
    }
    //public sale
    bool public publicSaleStatus = false;
    uint256 public publicPrice = 0.010000 ether;
    uint256 public amountForPublicSale = 500;
    // per mint public sale limitation
    uint256 public immutable publicSalePerMint = 5;

    function publicSaleMint(uint256 quantity) external payable {
        require(
        publicSaleStatus,
        "public sale has not begun yet"
        );
        require(
        totalSupply() + quantity <= collectionSize,
        "reached max supply"
        );
        require(
        amountForPublicSale >= quantity,
        "reached public sale max amount"
        );

        require(
        quantity <= publicSalePerMint,
        "reached public sale per mint max amount"
        );

        _safeMint(msg.sender, quantity);
        amountForPublicSale -= quantity;
        refundIfOver(uint256(publicPrice) * quantity);
    }

    function setPublicSaleStatus(bool status) external onlyOwner {
        publicSaleStatus = status;
    }

    function getPublicSaleStatus() external view returns(bool) {
        return publicSaleStatus;
    }
}