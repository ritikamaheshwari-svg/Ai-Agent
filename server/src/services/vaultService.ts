import { vaultContract, vaultProvider, vaultAddress } from "../blockchain/vault"
import { ethers } from "ethers"

export const getVaultBalance = async () => {
  const contractCode = await vaultProvider.getCode(vaultAddress)

  if (contractCode === "0x") {
    throw new Error(
      `No contract deployed at ${vaultAddress}. Deploy the Vault contract or update VAULT_ADDRESS in server/.env.`
    )
  }

  const balance = await vaultContract.getVaultBalance()
  return ethers.formatEther(balance)
}

export const getUserBalance = async () => {
  const provider = vaultProvider   // your RPC provider
  const privateKey = process.env.PRIVATE_KEY!

  const wallet = new ethers.Wallet(privateKey, provider)

  const balance = await provider.getBalance(wallet.address)

  return {
    address: wallet.address,
    balance: ethers.formatEther(balance)
  }
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