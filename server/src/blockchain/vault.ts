import dotenv from "dotenv"
import { ethers, NonceManager } from "ethers"

dotenv.config()

const VAULT_ADDRESS = process.env.VAULT_ADDRESS
const RPC_URL = process.env.RPC_URL || "http://127.0.0.1:8545"
const PRIVATE_KEY = process.env.PRIVATE_KEY

if (!VAULT_ADDRESS || !PRIVATE_KEY) {
  throw new Error("Missing VAULT_ADDRESS or PRIVATE_KEY in server/.env")
}

const ABI = [
  "function deposit() payable",
  "function withdraw(uint256 amount)",
  "function getVaultBalance() view returns (uint256)"
]

const provider = new ethers.JsonRpcProvider(RPC_URL)

// base wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

// ⭐ FIX NONCE PROBLEM
const signer = new NonceManager(wallet)

export const vaultAddress = VAULT_ADDRESS
export const vaultProvider = provider

export const vaultContract = new ethers.Contract(
  VAULT_ADDRESS,
  ABI,
  signer
)