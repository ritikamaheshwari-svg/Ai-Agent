const API_URL = "http://localhost:5000"

export const getVaultBalance = async () => {
  const res = await fetch(`${API_URL}/vault/balance`)
  return res.json()
}