//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DogeFellas is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string _baseTokenURI;
    string public baseExtension = ".json";
    uint256 private _reservedVouchers = 50;
    uint256 private _priceLegendary = 1.2 ether;
    uint256 private _priceEpic = 1 ether;
    uint256 private _priceRare = 0.8 ether;
    bool public _paused = false;
    uint256 public legendaryStart = 0;
    uint256 public epicStart = 9;
    uint256 public rareStart = 19;



    uint256 public constant TOTAL_VOUCHER_SUPPLY = 7777;

    struct Voucher {
      uint id; 
      uint8 level; 
    }

    constructor() ERC721("DogeFellas", "FELLAS") {
      setBaseURI("https://hairgrowthpro.com/metadata/");
    }

    function mintVoucher(uint256 mintAmount, uint256 level) public payable {
      uint256 supply = totalSupply();
      require(!_paused, "Voucher pre-sale has not yet begun.");
      require(supply < TOTAL_VOUCHER_SUPPLY, "Voucher pre-sale has already ended.");
      require(mintAmount > 0, "You cannot mint 0 vouchers.");
      require(mintAmount <= 2, "You are not allowed to mint this many vouchers at once.");
      require(supply + mintAmount <= TOTAL_VOUCHER_SUPPLY, "Exceeds maximum vouchers available.");
      

      if (level == 0) {
        require(_priceLegendary * mintAmount == msg.value, "Amount of Ether sent is not correct.");
        for (uint i = 0; i < mintAmount; i++) {
          legendaryStart++;
          _safeMint(msg.sender, legendaryStart);
        }
      }
      if (level == 1) {
        require(_priceEpic * mintAmount == msg.value, "Amount of Ether sent is not correct.");
        for (uint i = 0; i < mintAmount; i++) {
          epicStart++;
          _safeMint(msg.sender, epicStart);
        }
      }
      if (level == 2) {
        require(_priceRare * mintAmount == msg.value, "Amount of Ether sent is not correct.");
        for (uint i = 0; i < mintAmount; i++) {
          rareStart++;
          _safeMint(msg.sender, rareStart);
        }
      }
    }

    function walletOfOwner(address _owner) public view returns(uint256[] memory) {
      uint256 tokenCount = balanceOf(_owner);

      uint256[] memory tokensId = new uint256[](tokenCount);
      for(uint256 i; i < tokenCount; i++){
          tokensId[i] = tokenOfOwnerByIndex(_owner, i);
      }
      return tokensId;
    }

     function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), baseExtension)) : "";
    }

    function setLegendaryPrice(uint256 _newPrice) public onlyOwner() {
      _priceLegendary = _newPrice;
    }

    function setEpicPrice(uint256 _newPrice) public onlyOwner() {
      _priceEpic = _newPrice;
    }

    function setRarePrice(uint256 _newPrice) public onlyOwner() {
      _priceRare = _newPrice;
    }

    function _baseURI() internal view virtual override returns (string memory) {
      return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
      _baseTokenURI = baseURI;
    }

    function getLegendaryPrice() public view returns (uint256){
      return _priceLegendary;
    }

    function getEpicPrice() public view returns (uint256){
      return _priceEpic;
    }

    function getRarePrice() public view returns (uint256){
      return _priceRare;
    }

    function setPause(bool val) public onlyOwner {
      _paused = val;
    }

    function withdraw() external onlyOwner {
      uint balance = address(this).balance;
      payable(msg.sender).transfer(balance);
    }

    function reserveGiveaway() public onlyOwner {
      uint currentSupply = totalSupply();
      require(currentSupply < _reservedVouchers, "Already reserved the first vouchers.");

      for (uint i = 0; i < _reservedVouchers; i++) {
          _safeMint(owner(), currentSupply + i);
      }
    }

    /**
    * @dev Returns a list of tokens that are owned by _owner.
    * @dev NEVER call this function inside of the smart contract itself
    * @dev because it is expensive.  Only return this from web3 calls
    */
    function tokensOfOwner(address _owner) external view returns(uint256[] memory) {
      uint256 tokenCount = balanceOf(_owner);

      if (tokenCount == 0) {
        return new uint256[](0);
      } else {
        uint256[] memory result = new uint256[](tokenCount);
        uint256 resultIndex = 0;

        for (uint256 id = 0; id <= totalSupply() - 1; id++) {
          if (ownerOf(id) == _owner) {
            result[resultIndex] = id;
            resultIndex++;
          }
        }

        return result;
      }
    }

}
