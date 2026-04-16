import { useSignals } from "../hooks/useSignals"

const SignalTable = () => {

  const { signals, loading } = useSignals()

  if (loading) return <p>Loading signals...</p>

  return (
    <div>

      <h2>Signals</h2>

      <table border={1} cellPadding={8}>

        <thead>
          <tr>
            <th>Asset</th>
            <th>Action</th>
            <th>Confidence</th>
            <th>Price</th>
            <th>Change %</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {signals.map(signal => (
            <tr key={signal._id}>

              <td>{signal.asset}</td>

              <td>{signal.action}</td>

              <td>
                {signal.confidence?.toFixed
                  ? signal.confidence.toFixed(2)
                  : signal.confidence}
              </td>

              <td>
                {signal.price ? `$${signal.price}` : "-"}
              </td>

              <td>
                {signal.change ? `${signal.change.toFixed(2)}%` : "-"}
              </td>

              <td>
                {signal.reason || "-"}
              </td>

              <td>
                {signal.executed ? "Executed" : "Pending"}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default SignalTable