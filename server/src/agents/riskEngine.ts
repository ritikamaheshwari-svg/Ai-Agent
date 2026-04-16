export const calculateTradeSize = (change: number) => {

  const volatility = Math.abs(change)

  if (volatility < 0.01) {
    return "0.05"
  }

  if (volatility < 0.03) {
    return "0.02"
  }

  return "0.005"

}