import express from "express"
import Transaction from "../models/Transaction"

const router = express.Router()

router.get("/", async (req, res) => {

  const txs = await Transaction.find().sort({ createdAt: -1 })

  res.json(txs)

})

export default router