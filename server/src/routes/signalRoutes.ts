import express from "express"
import * as signalController from "../controllers/signalController"

const router = express.Router()

router.get("/", signalController.getSignals)
router.post("/", signalController.createSignal)

export default router
