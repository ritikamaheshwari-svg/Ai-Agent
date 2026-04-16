import { vaultContract } from "../blockchain/vault"
import { ethers } from "ethers"

export const getVaultBalance = async () => {
  const balance = await vaultContract.getVaultBalance()
  return ethers.formatEther(balance)
}

export const deposit = async (amount: string) => {
  const tx = await vaultContract.deposit({
    value: ethers.parseEther(amount)
  })

  await tx.wait()

  return tx.hash
}

export const withdraw = async (amount: string) => {
  const tx = await vaultContract.withdraw(
    ethers.parseEther(amount)
  )

  await tx.wait()

  return tx.hash
}