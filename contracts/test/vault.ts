import { expect } from "chai"
import { ethers } from "hardhat"

describe("Vault", function () {

  it("Should deploy correctly", async function () {

    const Vault = await ethers.getContractFactory("Vault")
    const vault = await Vault.deploy()

    await vault.waitForDeployment()

    expect(await vault.getAddress()).to.not.equal(0)

  })

})