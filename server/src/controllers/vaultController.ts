import { Request, Response } from "express"
import * as vaultService from "../services/vaultService"

export const getBalance = async (req: Request, res: Response) => {
  const balance = await vaultService.getVaultBalance()
  res.json({ balance })
}

export const deposit = async (req: Request, res: Response) => {
  const { amount } = req.body

  const tx = await vaultService.deposit(amount)

  res.json({ tx })
}

export const withdraw = async (req: Request, res: Response) => {
  const { amount } = req.body

  const tx = await vaultService.withdraw(amount)

  res.json({ tx })
}