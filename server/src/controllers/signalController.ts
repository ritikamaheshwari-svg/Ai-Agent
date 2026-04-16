import { Request, Response } from "express"
import Signal from "../models/Signal"

export const getSignals = async (_req: Request, res: Response) => {
  const signals = await Signal.find().sort({ createdAt: -1 })
  res.json(signals)
}

export const createSignal = async (req: Request, res: Response) => {

  const { asset, action, confidence } = req.body

  const signal = await Signal.create({
    asset,
    action,
    confidence
  })

  res.json(signal)

}