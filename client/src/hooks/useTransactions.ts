import { useEffect, useState } from "react"
import axios from "axios"
import { type Transaction } from "../types/transaction"

export const useTransactions = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {

    const res = await axios.get("http://localhost:5000/transactions")

    setTransactions(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return { transactions, loading }

}