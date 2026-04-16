import { useEffect, useState } from "react"
import axios from "axios"
import { type Signal } from "../types/signal"

export const useSignals = () => {

  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSignals = async () => {
    const res = await axios.get("http://localhost:5000/signals")
    setSignals(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSignals()
  }, [])

  return { signals, loading }
}