import { useState } from "react"
import axios from "axios"

type Props = {
  refreshBalance: () => void
}

export default function SignalForm({ refreshBalance }: Props) {

  const [asset, setAsset] = useState("ETH")
  const [action, setAction] = useState("deposit")
  const [confidence, setConfidence] = useState(0.9)
  const [loading, setLoading] = useState(false)

  const createSignal = async () => {

    try {

      setLoading(true)

      await axios.post("http://localhost:5000/signals", {
        asset,
        action,
        confidence
      })

      alert("Signal created")

      // refresh vault balance after execution
      refreshBalance()

    } catch (err) {

      console.error(err)
      alert("Failed to create signal")

    } finally {
      setLoading(false)
    }
  }

  return (

    <div style={{ marginBottom: "40px" }}>

      <h2>Create Trading Signal</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Asset</label>
        <select value={asset} onChange={(e) => setAsset(e.target.value)}>
          <option>ETH</option>
          <option>BTC</option>
          <option>SOL</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Action</label>
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option>deposit</option>
          <option>withdraw</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Confidence</label>
        <input
          type="number"
          step="0.01"
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
        />
      </div>

      <button onClick={createSignal} disabled={loading}>
        {loading ? "Processing..." : "Create Signal"}
      </button>

    </div>
  )
}