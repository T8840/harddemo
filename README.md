# harddemo
使用hardhat操作solidity

### 环境安装
- 参考：https://hardhat.org/tutorial/setting-up-the-environment  
- Mac如下操作：  
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 18
nvm use 18
nvm alias default 18
npm install npm --global # Upgrade npm to the latest version
```

### 依赖库安装
- npm i -D

### 编写合约

### 编译
- npx hardhat compile

### 单元测试
- npx hardhat test



### 部署到本地节点并使用ether.js调试
若在执行合约时遇到异常，可使用Hardhat的内置调试器进行调试。首先，执行以下命令：
- npx hardhat node
这将启动一个本地Ethereum节点。接着，使用另一个终端窗口部署智能合约：
- npx hardhat run --network localhost scripts/deployToken.js
当部署成功时，你将看到地址哈希。
使用etherjs连接到本地节点，然后使用这个地址哈希来实例化你的合约。以下是一个示例：
- npm install --save  ethers@^5.0.0
1. 在项目根目录下创建一个名为src的文件夹（如果尚未创建）。
2. 在src文件夹中创建一个名为interactWithToken.js的文件。
3. 将以下代码添加到interactWithToken.js文件中，见代码。
4. 请确保将tokenAddress变量设置为您在部署时实际获得的Token合约地址。
5. 运行interactWithToken.js脚本，连接到本地Hardhat网络节点并与Token合约进行交互：
- node src/interactWithToken.js

### 部署到测试网


### 调整网络和Gas配置
在hardhat.config.js文件中，你可以调整网络设置和Gas相关配置。例如，你可以设置不同的网络（如mainnet、ropsten等），设置Gas价格和Gas限制等。以下是一个配置示例：
```js
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/YOUR-PROJECT-ID",
      accounts: ["YOUR-PRIVATE-KEY"],
    },
  },
};


```

### 列出可用的测试账号
- npx hardhat accounts

Hardhat任务是一种创建可重用脚本的方法。你可以使用内置任务（如compile、test、run等），也可以创建自定义任务。例如，你可以创建一个名为“accounts”的任务，以列出所有可用的本地账户。在hardhat.config.js文件中添加以下代码：
```js
task("accounts", "List accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

```
