const API_URL = "http://localhost:5000"

export const getVaultBalance = async () => {
  const res = await fetch(`${API_URL}/vault/balance`)
  return res.json()
}

export const getUserBalance = async () => {
  const res = await fetch(`${API_URL}/vault/wallet-balance`)

  if (!res.ok) {
    throw new Error("Failed to fetch wallet balance")
  }

  return res.json()
}