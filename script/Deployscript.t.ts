import { expect } from 'chai';
import hre from 'hardhat';
import { getContract } from 'viem';
import { anvil } from 'viem/chains';

describe('JPYC Token', function () {
  let jpyc: any;
  let owner: any;
  let user1: any;
  let user2: any;

  before(async function () {
    const [ownerWallet, user1Wallet, user2Wallet] = await hre.viem.getWalletClients({
      chain: anvil
    });

    owner = ownerWallet.account;
    user1 = user1Wallet.account;
    user2 = user2Wallet.account;

    const jpycImpl = await hre.viem.deployContract("FiatTokenV1", []);
    const jpycProxy = await hre.viem.deployContract("ERC1967Proxy", [jpycImpl.address, ""]);

    const publicClient = await hre.viem.getPublicClient({
      chain: anvil,
    });

    jpyc = getContract({
      address: jpycProxy.address,
      abi: jpycImpl.abi,
      client: publicClient,
    });

    await jpyc.write.initialize([
      "JPYCt", "JPYCt", "JPYCt", 18,
      owner.address, owner.address, owner.address, owner.address, owner.address
    ], { account: owner });

    await jpyc.write.configureMinter([owner.address, 1000000n * 10n ** 18n], { account: owner });
  });

  it('should have correct name, symbol, and decimals', async function () {
    expect(await jpyc.read.name()).to.equal('JPYCt');
    expect(await jpyc.read.symbol()).to.equal('JPYCt');
    expect(await jpyc.read.decimals()).to.equal(18);
  });

  it('should allow minting by minter', async function () {
    const amount = 1000n * 10n ** 18n;
    await jpyc.write.mint([user1.address, amount], { account: owner });
    expect(await jpyc.read.balanceOf([user1.address])).to.equal(amount);
  });

  it('should allow transfers between accounts', async function () {
    const amount = 500n * 10n ** 18n;
    await jpyc.write.transfer([user2.address, amount], { account: user1 });
    expect(await jpyc.read.balanceOf([user2.address])).to.equal(amount);
    expect(await jpyc.read.balanceOf([user1.address])).to.equal(500n * 10n ** 18n);
  });

  it('should not allow transfers to zero address', async function () {
    const amount = 100n * 10n ** 18n;
    await expect(jpyc.write.transfer(['0x0000000000000000000000000000000000000000', amount], { account: user1 }))
      .to.be.rejectedWith('ERC20: transfer to the zero address');
  });

  it('should allow burning tokens', async function () {
    const amount = 200n * 10n ** 18n;
    await jpyc.write.burn([amount], { account: user2 });
    expect(await jpyc.read.balanceOf([user2.address])).to.equal(300n * 10n ** 18n);
  });

  // 追加のテストケースをここに記述
});