import '@nomicfoundation/hardhat-viem';
import hre from 'hardhat';
import { Account, getContract } from 'viem';
import { anvil } from 'viem/chains';
import dotenv from 'dotenv';
import yargs from 'yargs';

dotenv.config();

// anvil
// 別のターミナルを開く
// pnpm hardhat test src/tests/jpyc-tests/jpyc-balance2.test.ts --network localhost
const argv = yargs(process.argv.slice(2))
  .option('minterAddress', {
    type: 'string',
    description: 'Address of the minter'
  })
  .option('toAddress', {
    type: 'string',
    description: 'Address to mint tokens to'
  })
  .option('amount', {
    type: 'number',
    description: 'Amount of tokens to mint'
  })
  .argv;


let JPYC_ADMIN_ACCOUNT: Account;

async function initializeAdminAccount() {
  const [jpycAdmin] = await hre.viem.getWalletClients({
    chain: anvil
  });
  JPYC_ADMIN_ACCOUNT = jpycAdmin.account;
}

async function deployJpyc() {
  const jpycImpl = await hre.viem.deployContract("FiatTokenV1", []);

  const jpycProxy = await hre.viem.deployContract("ERC1967Proxy", [jpycImpl.address, ""]);

  const publicClient = await hre.viem.getPublicClient({
    chain: anvil,
  });

  const jpyc = getContract({
    address: jpycProxy.address,
    abi: jpycImpl.abi,
    client: publicClient,
  });
  await jpyc.write.initialize([
    "TESTJP",
    "TESTJP",
    "TESTJP",
    18,
    JPYC_ADMIN_ACCOUNT.address,
    JPYC_ADMIN_ACCOUNT.address,
    JPYC_ADMIN_ACCOUNT.address,
    JPYC_ADMIN_ACCOUNT.address,
    JPYC_ADMIN_ACCOUNT.address,
  ], {
    account: JPYC_ADMIN_ACCOUNT.address,
  });

  await jpyc.write.configureMinter([JPYC_ADMIN_ACCOUNT.address, 10000n], {
    account: JPYC_ADMIN_ACCOUNT.address,
  });

  return { jpyc };
}

async function mintTokens(jpyc: any, minterAddress: string, toAddress: string, amount: bigint) {
  const allowance = await jpyc.read.minterAllowance([minterAddress]);
  const isMinter = await jpyc.read.isMinter([minterAddress]);
  console.log("allowance:", allowance);
  console.log("isMinter:", isMinter);
  if (allowance < amount || !isMinter) {
    await jpyc.write.configureMinter([minterAddress, 1000000n], {
      account: JPYC_ADMIN_ACCOUNT.address,
  });
  }
  try {
    const tx = await jpyc.write.mint([toAddress, amount], {
      account: minterAddress,
    });

    console.log("token minted");
    console.log("mint address:", toAddress);
    console.log("tx:", tx);
    console.log("mint amount:", amount.toString());

   
    const balance = await jpyc.read.balanceOf([toAddress]);
    console.log("toaddress balance:", balance.toString());

  } catch (error) {
    console.error("mint error:", error,"allowance:", allowance);
  }
}

//デプロイ用、mint用のスクリプト　to addressの指定をお願いします。
async function main() {
  await initializeAdminAccount();
  const { jpyc } = await deployJpyc();
  const symbol = await jpyc.read.symbol();
  const name = await jpyc.read.name();

  const minterAddress = argv.minterAddress || process.env.MINTER_ADDRESS || JPYC_ADMIN_ACCOUNT.address;
  const toAddress = argv.toAddress || process.env.TO_ADDRESS || "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const amount = BigInt(argv.amount || process.env.MINT_AMOUNT || 1000000);


  await mintTokens(jpyc,minterAddress as string, toAddress, amount);

  console.log("token deployed:", jpyc.address);
  console.log("token symbol:", symbol);
  console.log("token name:", name);
  console.log("to address:",toAddress);
  console.log("to address balance:",await jpyc.read.balanceOf([toAddress]));

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
