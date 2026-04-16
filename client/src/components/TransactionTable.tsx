import { useTransactions } from "../hooks/useTransactions"

const TransactionTable = () => {

  const { transactions, loading } = useTransactions()

  if (loading) return <p>Loading transactions...</p>

  return (

    <div>

      <h2>Transactions</h2>

      <table border={1} cellPadding={8}>

        <thead>

          <tr>
            <th>Asset</th>
            <th>Action</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {transactions.map(tx => (

            <tr key={tx._id}>

              <td>{tx.asset}</td>
              <td>{tx.action}</td>
              <td>{tx.amount}</td>
              <td>{tx.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}

export default TransactionTable