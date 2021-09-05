//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DogeFellas is ERC721Enumerable, Ownable {

    string _baseTokenURI;
    uint256 private _reservedVouchers = 50;
    uint256 private _price = 0.07 ether;
    bool public _paused = false;


    uint256 public constant TOTAL_VOUCHER_SUPPLY = 7777;

    struct Voucher {
      uint id; 
      uint8 level; 
    }

    constructor() ERC721("DogeFellas", "FELLAS") {
      setBaseURI("http://localhost:3000/nft/dgf/md/");
    }

    function mintVoucher() public payable {
      uint256 supply = totalSupply();
      require(!_paused, "Voucher sale has not yet begun.");
      require(supply <= TOTAL_VOUCHER_SUPPLY, "Exceeds maximum vouchers available.");
      require(_price == msg.value, "Amount of BNB sent is not correct.");

      _safeMint(msg.sender, supply+1);
    }

    function walletOfOwner(address _owner) public view returns(uint256[] memory) {
      uint256 tokenCount = balanceOf(_owner);

      uint256[] memory tokensId = new uint256[](tokenCount);
      for(uint256 i; i < tokenCount; i++){
          tokensId[i] = tokenOfOwnerByIndex(_owner, i);
      }
      return tokensId;
    }

    function setPrice(uint256 _newPrice) public onlyOwner() {
      _price = _newPrice;
    }

    function _baseURI() internal view virtual override returns (string memory) {
      return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
      _baseTokenURI = baseURI;
    }

    function getPrice() public view returns (uint256){
      return _price;
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
