import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
{
    signalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signal"
    },
    asset: String,
    action: String,
    amount: String,
    txHash: String,
    status: String
},
{ timestamps: true }
)

export default mongoose.model("Transaction", transactionSchema)