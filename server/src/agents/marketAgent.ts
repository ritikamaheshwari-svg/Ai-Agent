import axios from "axios"
import Signal from "../models/Signal"
import Transaction from "../models/Transaction"
import { deposit, withdraw } from "../services/vaultService"

const lastPrices: Record<string, number> = {}

export const runMarketAgent = async () => {

  try {

    console.log("Agent running...")

    // 1️⃣ fetch market data
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
    )

    const prices = {
      BTC: response.data.bitcoin.usd,
      ETH: response.data.ethereum.usd,
      SOL: response.data.solana.usd
    }

    // 2️⃣ loop through assets
    for (const [asset, currentPrice] of Object.entries(prices)) {

      console.log(`${asset} Price:`, currentPrice)

      const lastPrice = lastPrices[asset]

      // first run
      if (!lastPrice) {
        lastPrices[asset] = currentPrice
        continue
      }

      const change = ((currentPrice - lastPrice) / lastPrice) * 100

      console.log(`${asset} change:`, change.toFixed(2), "%")

      let action: "deposit" | "withdraw" | null = null

      // 3️⃣ trading logic
      if (change < -0.01) {
        action = "deposit"
      }

      if (change > 0.01) {
        action = "withdraw"
      }

      if (!action) {
        lastPrices[asset] = currentPrice
        continue
      }

      console.log(`${asset} Agent decision:`, action)

      const reason =
        action === "deposit"
          ? "Price dropped below threshold"
          : "Price increased above threshold"

      // 4️⃣ create signal
      const signal = await Signal.create({
        asset,
        action,
        confidence: Math.random() * 0.3 + 0.7,
        price: currentPrice,
        change,
        reason,
        executed: false
      })

      // 5️⃣ execute vault transaction
      let txHash = ""

      if (action === "deposit") {
        txHash = await deposit("0.01")
      } else {
        txHash = await withdraw("0.01")
      }

      // 6️⃣ store transaction
      await Transaction.create({
        asset,
        action,
        amount: "0.01",
        txHash,
        status: "success"
      })

      signal.executed = true
      await signal.save()

      console.log(`${asset} Transaction executed:`, txHash)

      lastPrices[asset] = currentPrice
    }

  } catch (error) {

    console.error("Agent error:", error)

  }

}   