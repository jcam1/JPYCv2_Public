"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-viem");
require("@nomiclabs/hardhat-truffle5");
// require("@nomiclabs/hardhat-waffle")
require("@openzeppelin/hardhat-upgrades");
require("hardhat-contract-sizer");
require("solidity-coverage");
require("dotenv");
const config = {
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
        rinkeby: {
            url: process.env.INFRA_API_KEY,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
    },
};
exports.default = config;
