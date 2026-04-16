import express from "express"
import cors from "cors"
import cron from "node-cron"
import dotenv from "dotenv"

import vaultRoutes from "./routes/vaultRoutes"
import signalRoutes from "./routes/signalRoutes"
import transactionRoutes from "./routes/transactionRoutes"

import { connectDB } from "./config/db"
import { runMarketAgent } from "./agents/marketAgent"

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/vault", vaultRoutes)
app.use("/signals", signalRoutes)
app.use("/transactions", transactionRoutes)

/*
  Run autonomous agent every 10 seconds
*/
cron.schedule("*/30 * * * * *", async () => {
  await runMarketAgent()
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})