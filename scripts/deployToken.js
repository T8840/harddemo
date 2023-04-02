async function main() {
    // 获取合约工厂
    const Token = await ethers.getContractFactory("Token");
  
    // 部署合约
    const token = await Token.deploy();
  
    // 等待合约部署完成
    await token.deployed();
  
    // 打印已部署合约的地址
    console.log("Token deployed to:", token.address);
  }
  
  // 执行主函数并处理错误
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  