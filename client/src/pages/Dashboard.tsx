import { useEffect, useState } from "react"
import SignalTable from "../components/SignalTable"
import TransactionTable from "../components/TransactionTable"
import SignalForm from "../components/SignalForm"
import { getVaultBalance } from "../services/vaultService"

const Dashboard = () => {

  const [balance, setBalance] = useState("0")
  const [loadingBalance, setLoadingBalance] = useState(true)
  const [balanceError, setBalanceError] = useState<string | null>(null)

  const loadBalance = async () => {
    try {
      const data = await getVaultBalance()
      setBalance(data.balance)
      setBalanceError(null)
    } catch (error) {
      console.error("Failed to load vault balance", error)
      setBalanceError("Unable to load vault balance. Is the backend running?")
    } finally {
      setLoadingBalance(false)
    }
  }

  useEffect(() => {
    loadBalance()
  }, [])

  return (
    <div style={{ padding: "40px" }}>
      <h1>Autonomous Vault Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Vault Balance</h2>
        <p>{loadingBalance ? "Loading..." : `${balance} ETH`}</p>
        {balanceError && <p style={{ color: "red" }}>{balanceError}</p>}
      </div>

      <SignalTable />
      <SignalForm refreshBalance={loadBalance} />

      <br />

      <TransactionTable />
    </div>
  )
}

export default Dashboard