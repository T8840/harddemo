const { ethers } = require("ethers");

// 替换为在部署时获取的合约地址
// const tokenAddress = "0xYourDeployedTokenAddressHere";
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


// Token合约ABI（Application Binary Interface）
const tokenAbi = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external",
  "event Transfer(address indexed _from, address indexed _to, uint256 _value)",
  "string public name",
  "string public symbol",
  "uint256 public totalSupply",
];

async function main() {
  // 连接到本地Hardhat网络节点
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  // 使用Hardhat网络上的第一个账户
  const [deployer] = await provider.listAccounts();
  const deployerWallet = new ethers.Wallet(deployer, provider);

  // 使用Token合约地址和ABI实例化合约
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, deployerWallet);

  // 调用合约的只读方法
  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const totalSupply = await tokenContract.totalSupply();
  console.log("Token:", name, symbol);
  console.log("Total Supply:", totalSupply.toString());

  // 查询部署者的余额
  const deployerBalance = await tokenContract.balanceOf(deployer);
  console.log("Deployer's balance:", deployerBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
