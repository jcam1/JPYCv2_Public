import '@nomicfoundation/hardhat-viem';
import hre from 'hardhat';
import { getContract } from 'viem';
import { anvil } from 'viem/chains';
import dotenv from 'dotenv';
import yargs from 'yargs';

dotenv.config();

const argv = yargs(process.argv.slice(2))
  .option('tokenName', {
    type: 'string',
    description: 'Name of the token',
    default: process.env.TOKEN_NAME
  })
  .option('tokenSymbol', {
    type: 'string',
    description: 'Symbol of the token',
    default: process.env.TOKEN_SYMBOL
  })
  .option('tokenCurrency', {
    type: 'string',
    description: 'Currency of the token',
    default: process.env.TOKEN_CURRENCY
  })
  .option('tokenDecimals', {
    type: 'number',
    description: 'Decimals of the token',
    default: process.env.TOKEN_DECIMALS ? parseInt(process.env.TOKEN_DECIMALS) : 18
  })
  .option('minterAdminAddress', {
    type: 'string',
    description: 'Address of the minter admin',
    default: process.env.MINTER_ADMIN_ADDRESS
  })
  .option('pauserAddress', {
    type: 'string',
    description: 'Address of the pauser',
    default: process.env.PAUSER_ADDRESS
  })
  .option('blocklisterAddress', {
    type: 'string',
    description: 'Address of the blocklister',
    default: process.env.BLOCKLISTER_ADDRESS
  })
  .option('rescuerAddress', {
    type: 'string',
    description: 'Address of the rescuer',
    default: process.env.RESCUER_ADDRESS
  })
  .option('ownerAddress', {
    type: 'string',
    description: 'Address of the owner',
    default: process.env.OWNER_ADDRESS
  })
  .option('minterAddress', {
    type: 'string',
    description: 'minterAddress',
    default:process.env.MINTER_ADDRESS
  })
  .option('toAddress', {
    type: 'string',
    description: 'to address',
    default:process.env.TO_ADDRESS
  })
  .option('amount', {
    type: 'string',
    description: 'mint token amount',
    default:process.env.MINT_AMOUNT
  })
  .argv;

  let DEPLOYER_ADDRESS: string;
  let OWNER_ADDRESS: string;
  
  async function initializeAdminAccount() {
    DEPLOYER_ADDRESS = argv.ownerAddress;
    OWNER_ADDRESS = argv.ownerAddress;
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
    argv.tokenName,
    argv.tokenSymbol,
    argv.tokenCurrency,
    argv.tokenDecimals,
    argv.minterAdminAddress,
    argv.pauserAddress,
    argv.blocklisterAddress,
    argv.rescuerAddress,
    OWNER_ADDRESS
  ], {
    account: DEPLOYER_ADDRESS,
  });

  await jpyc.write.configureMinter([argv.minterAdminAddress, 1000000n], {
    account: argv.minterAdminAddress,
  });

  return { jpyc };
}

async function mintTokens(jpyc: any, minterAddress: string, toAddress: string, amount: bigint) {
  const allowance = await jpyc.read.minterAllowance([minterAddress]);
  const isMinter = await jpyc.read.isMinter([minterAddress]);
  console.log("allowance:", allowance);
  console.log("minter:", isMinter)
  console.log(minterAddress)
  if (!isMinter) {
    console.error("The specified address is not a minter");
    return;
  }

  if (allowance < amount) {
    const additionalAllowance = amount - allowance;
    console.log(`Insufficient allowance. Add ${additionalAllowance}`);
    
    try {
      await jpyc.write.configureMinter([minterAddress, additionalAllowance], {
        account: argv.minterAdminAddress, // minterAdminAddressを使用
      });
    } catch (error) {
      console.error("Minter config update failed:", error);
      return;
    }
  }
  try {
    const tx = await jpyc.write.mint([toAddress, amount], {
      account: minterAddress,
    });

    console.log("token mint");
    console.log("mint to address:", toAddress);
    console.log("tx:", tx);
    console.log("mint amount:", amount.toString());

   
    const balance = await jpyc.read.balanceOf([toAddress]);
    console.log("to address balance:", balance.toString());

  } catch (error) {
    console.error("mint error:", error,"allowance:", allowance);
  }
}

async function upgradeToV2(jpyc: any) {
  const jpycV2Impl = await hre.viem.deployContract("FiatTokenV2", []);

  await jpyc.write.upgradeTo([jpycV2Impl.address], {
    account: OWNER_ADDRESS,
  });

  console.log("upgrade complate");
  console.log("Proxy contract address (use this for interactions):", jpyc.address);

  // V2のABIを使用して新しいコントラクトインスタンスを作成
  const publicClient = await hre.viem.getPublicClient({
    chain: anvil,
  });

  const jpycV2 = getContract({
    address: jpyc.address,
    abi: jpycV2Impl.abi,
    client: publicClient,
  });

  // V2の初期化を実行
  await jpycV2.write.initializeV2([], {
    account: OWNER_ADDRESS,
  });


  return jpycV2;
}

async function testAllowlistFunctions(jpycV2: any) {
  const allowlisterAddress = OWNER_ADDRESS; 
  const testAccount = "0x1234567890123456789012345678901234567890"; // テスト用のアカウント
  //Add allowlist
  console.log("Updating allowlister...");
  await jpycV2.write.updateAllowlister([allowlisterAddress], {
    account: OWNER_ADDRESS,
  });

  console.log("Adding account to allowlist...");
  await jpycV2.write.allowlist([testAccount], {
    account: allowlisterAddress,
  });

  console.log("Checking if account is allowlisted...");
  const isAllowlisted = await jpycV2.read.isAllowlisted([testAccount]);
  console.log("Is account allowlisted?", isAllowlisted);
  console.log("Add Allowlist:",testAccount)

  //Remove allowlist
  console.log("Removing account from allowlist...");
  await jpycV2.write.unAllowlist([testAccount], {
    account: allowlisterAddress,
  });

  console.log("Checking if account is still allowlisted...");
  const isStillAllowlisted = await jpycV2.read.isAllowlisted([testAccount]);
  console.log("Is account still allowlisted?", isStillAllowlisted);
  console.log("Remove allowlist:",testAccount)

  // checkAllowlistモディファイアのテスト
  const largeAmount = BigInt("1000000000000000000000000"); // 1,000,000 tokens (assuming 18 decimals)
  console.log("Attempting large transfer to test checkAllowlist...");
  try {
    await jpycV2.write.transfer([testAccount, largeAmount], {
      account: OWNER_ADDRESS,
    });
    console.log("Large transfer succeeded (unexpected)");
  } catch (error) {
    console.log("Large transfer failed as expected:", error.message);
  }
}

async function testTransferAfterMint(jpyc: any, fromAddress: string, toAddress: string, amount: bigint) {
  console.log("Test: Post-mint transfer");
  console.log("from address:", fromAddress);
  console.log("to address:", toAddress);
  console.log("amount:", amount.toString());

  const initialFromBalance = await jpyc.read.balanceOf([fromAddress]);
  const initialToBalance = await jpyc.read.balanceOf([toAddress]);

  console.log("balance:");
  console.log("from address balance:", initialFromBalance.toString());
  console.log("to address balance:", initialToBalance.toString());

  try {
    await jpyc.write.transfer([toAddress, amount], {
      account: fromAddress,
    });

    const finalFromBalance = await jpyc.read.balanceOf([fromAddress]);
    const finalToBalance = await jpyc.read.balanceOf([toAddress]);

    console.log("Balance after transfer:");
    console.log("from address balance:", fromAddress,finalFromBalance.toString());
    console.log("to address balance:", toAddress,finalToBalance.toString());

    console.log("send complate");
  } catch (error) {
    console.error("send error:", error);
  }
}

async function main() {
  await initializeAdminAccount();
  const { jpyc } = await deployJpyc();
  const symbol = await jpyc.read.symbol();
  const name = await jpyc.read.name();

  const minterAddress = argv.minterAddress ;
  const toAddress = argv.toAddress ;
  const amount = BigInt(argv.amount);

  await mintTokens(jpyc, minterAddress as string, toAddress, amount);
  console.log("Owner address:", argv.ownerAddress);

  console.log("deploy contract address:", jpyc.address);
  console.log("token symbol:", symbol);
  console.log("token name:", name);
  console.log("mint to address:", toAddress);
  console.log("token balance:", await jpyc.read.balanceOf([toAddress]));

  //transferテスト
  const transferAmount = amount / 10n; // 
  const newRecipient = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // テスト用アドレス
  await testTransferAfterMint(jpyc, toAddress, newRecipient, transferAmount);

  // V2へのアップグレード
  const jpycV2 = await upgradeToV2(jpyc);
  
  await testAllowlistFunctions(jpycV2);

 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});