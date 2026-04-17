import { useEffect, useState } from "react"
import SignalTable from "../components/SignalTable"
import TransactionTable from "../components/TransactionTable"
import TopBar from "../components/TopBar"
import BalanceCard from "../components/BalanceCard"
import AssetCard from "../components/AssetCard"
import { getVaultBalance, getUserBalance } from "../services/vaultService"

const Dashboard = () => {
  const [balance, setBalance] = useState("0")
  const [loadingBalance, setLoadingBalance] = useState(true)
  const [userBalance, setUserBalance] = useState("0")
  const [loadingUserBalance, setLoadingUserBalance] = useState(true)

  const loadBalances = async () => {
    try {
      const [vaultData, userData] = await Promise.all([
        getVaultBalance(),
        getUserBalance()
      ])
      setBalance(vaultData.balance)
      setUserBalance(userData.balance)
    } catch (error) {
      console.error("Failed to load balances", error)
    } finally {
      setLoadingBalance(false)
      setLoadingUserBalance(false)
    }
  }

  useEffect(() => {
    loadBalances()
    const interval = setInterval(loadBalances, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dash" style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-main)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />

      <div className="body" style={{ 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {/* Balances Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          <BalanceCard 
            label="User Balance" 
            value={`${Number(userBalance).toLocaleString()} ETH`} 
            subtext="0x9999…7093" 
            isLoading={loadingUserBalance}
          />
          <BalanceCard 
            label="Vault Balance" 
            value={`${Number(balance).toLocaleString()} ETH`} 
            subtext={`≈ $${(Number(balance) * 2321).toLocaleString()} USD`} 
            isLoading={loadingBalance}
          />
        </div>

        {/* Assets Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <AssetCard name="Solana" ticker="SOL" price="$87.62" change="+0.05%" isUp={true} type="sol" />
          <AssetCard name="Bitcoin" ticker="BTC" price="$74,685" change="-0.01%" isUp={false} type="btc" />
          <AssetCard name="Ethereum" ticker="ETH" price="$2,321" change="-0.02%" isUp={false} type="eth" />
        </div>

        {/* Signals & Transactions Section — Side by Side */}
        <div className="tables-grid">
          <SignalTable />
          <TransactionTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard