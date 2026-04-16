import express from "express"
import * as vaultController from "../controllers/vaultController"

const router = express.Router()

router.get("/balance", vaultController.getBalance)
router.post("/deposit", vaultController.deposit)
router.post("/withdraw", vaultController.withdraw)

export default router   