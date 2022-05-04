// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0;

contract Contract {
 string[] ipfsHash;
 
 function sendHash( string memory x) public {
   ipfsHash.push(x);
 }

 function getHash() public view returns ( string[] memory ) {
   return ipfsHash;
 }
}