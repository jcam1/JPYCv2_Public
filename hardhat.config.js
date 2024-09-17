import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-viem";
import '@nomiclabs/hardhat-truffle5';
// require("@nomiclabs/hardhat-waffle")
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';
import 'solidity-coverage';
import 'dotenv';
 
const config: HardhatUserConfig = {
    solidity: {
      compilers: [
        {
          version: '0.8.11',
          settings: {
            optimizer: {
              enabled: true,
              runs: 3000,
            },
          },
        },
        {
          version: '0.4.24',
        }
      ]
    },
  
    networks: {
      hardhat: {
        chainId: 1337,
        allowUnlimitedContractSize: false,
      },
      
      anvil: {
        url: "http://127.0.0.1:8545",
        chainId: 31337,
        accounts: {
          mnemonic: "test test test test test test test test test test test junk",
        },
      },
    },
  };
  
  export default config;