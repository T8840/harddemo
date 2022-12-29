const { expect } = require("chai");

describe("Greeter contract", function () {
  it("Deployment Greeter can use the function of greeter", async function () {

    const Greeter = await ethers.getContractFactory("Greeter");

    const hardhatGreeter = await Greeter.deploy("world");

    const setGreeting = await hardhatGreeter.setGreeting("hello");
    expect(await hardhatGreeter.greet()).to.equal("hello");
  });
});