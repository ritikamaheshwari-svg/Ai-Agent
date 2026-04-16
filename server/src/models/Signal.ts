import mongoose from "mongoose"

const signalSchema = new mongoose.Schema(
{
  asset: {
    type: String,
    required: true
  },

  action: {
    type: String,
    enum: ["deposit", "withdraw"],
    required: true
  },

  confidence: {
    type: Number,
    required: true
  },

  price: {
    type: Number
  },

  change: {
    type: Number
  },

  reason: {
    type: String
  },

  executed: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
)

export default mongoose.model("Signal", signalSchema)