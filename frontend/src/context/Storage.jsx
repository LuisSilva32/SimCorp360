// hooks/storage.js
/* eslint-disable no-undef */

import { useEffect, useState } from 'react'

// Función auxiliar para obtener el tiempo actual en milisegundos
const getCurrentTime = () => new Date().getTime()

export default function Storage (cacheKey, fetchData, cacheExpiry = 600000) { // 600000 milisegundos = 10 minutos
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDataAndCache = async () => {
      try {
        setLoading(true)
        const cachedData = localStorage.getItem(cacheKey)
        const cachedTime = localStorage.getItem(`${cacheKey}_timestamp`)

        if (cachedData && cachedTime) {
          const parsedCachedData = JSON.parse(cachedData)
          const timeElapsed = getCurrentTime() - parseInt(cachedTime, 10)

          if (timeElapsed < cacheExpiry) {
            setData(parsedCachedData)
            setLoading(false)
            return
          }
        }

        const newData = await fetchData()
        setData(newData)
        localStorage.setItem(cacheKey, JSON.stringify(newData))
        localStorage.setItem(`${cacheKey}_timestamp`, getCurrentTime().toString())
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchDataAndCache()
  }, [cacheKey, fetchData, cacheExpiry])

  return { data, loading, error }
}
