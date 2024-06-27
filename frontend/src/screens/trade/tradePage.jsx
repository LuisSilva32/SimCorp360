import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import { API_URL } from '../../api/config.js'
import '../../styles/trade-page.scss' // Asegúrate de tener el archivo de estilos adecuado
import { DarkModeContext } from '../../context/darkModeReducer'
import { Button } from 'react-bootstrap'

export default function TradePage () {
  const { symbol } = useParams()
  const { darkMode } = useContext(DarkModeContext)
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [investment, setInvestment] = useState('')
  const [period, setPeriod] = useState('')
  const [simulationResult, setSimulationResult] = useState(null)
  const [loading, setLoading] = useState(false) // Estado para indicar carga

  useEffect(() => {
    fetchStockData()
  }, [symbol])

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stocks/chart/${symbol}`)
      if (response.status === 404) {
        setError(response.data.error)
        setData([])
      } else {
        setData(response.data)
        setError('')
      }
    } catch (error) {
      console.error('Error fetching stock data:', error)
      setError('Error fetching stock data.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Activar indicador de carga
    try {
      const response = await axios.post(`${API_URL}/api/stocks/simulate`, {
        symbol,
        investment,
        period
      })
      setSimulationResult(response.data)
      setError('')
    } catch (error) {
      console.error('Error simulating investment:', error)
      setError('Error simulating investment.')
    } finally {
      setLoading(false) // Desactivar indicador de carga al finalizar
    }
  }

  const formatXAxis = (tickItem) => {
    // Formatear la fecha (por ejemplo: "2023-07-01" -> "Jul 2023")
    const date = new Date(tickItem)
    const options = { month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const formatTooltip = (value) => {
    // Formatear el valor del tooltip a entero con 2 decimales y agregar el signo de dólar
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  }

  return (
    <div className='trade-page'>
      <h1>TRADING EN {symbol}</h1>

      {/* Formulario de simulación de inversión */}
      <form onSubmit={handleSubmit} className='investment-form'>
        <label htmlFor='investment'>Monto de Inversión ($):</label>
        <input
          type='number'
          id='investment'
          name='investment'
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
          required
          className='form-control'
        />
        <br />
        <label htmlFor='period'>Período de Predicción (días):</label>
        <input
          type='number'
          id='period'
          name='period'
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          required
          className='form-control'
        />
        <br />
        <Button type='submit' className='btn btn-primary'>
          Simular Inversión
        </Button>
      </form>

      {/* Mostrar indicador de carga */}
      <div className='loader-trade-container'>
        {loading && <p className='loader-trade-page'>Cargando...</p>}
      </div>

      {/* Mostrar gráfico si no hay error */}
      {!error && !loading && (
        <div>
          <h1>Gráfico precio de cierre último año</h1>
          <ResponsiveContainer width='100%' height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id='colorClose' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={darkMode ? '#4C51C8' : '#943126'} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={darkMode ? '#4C51C8' : '#E74C3C'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' tickFormatter={formatXAxis} interval={Math.ceil(data.length / 10)} />
              <YAxis />
              <Tooltip formatter={formatTooltip} labelFormatter={formatXAxis} />
              <Area
                type='monotone'
                dataKey='Close'
                stroke={darkMode ? '#4cceac' : '#943126'}
                fillOpacity={1}
                fill='url(#colorClose)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Mostrar resultado de la simulación */}
      {simulationResult && (
        <div className='simulation-result'>
          <h2 className='subtitle'>Resultado de la simulación</h2>
          <p>
            <strong>Inversión Inicial:</strong> ${parseFloat(investment).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </p>
          <p>
            <strong>Período de Predicción:</strong> {period} días
          </p>
          <p>
            <strong>Precio Futuro Estimado:</strong> ${parseFloat(simulationResult.future_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </p>
          <p>
            <strong>Valor Predicho:</strong> ${parseFloat(simulationResult.predicted_value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </p>
          <p>
            <strong>Ganancia/Pérdida Esperada:</strong> ${parseFloat(simulationResult.profit_loss).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </p>
        </div>
      )}

      {/* Mostrar mensaje de error */}
      {error && !loading && <p>{error}</p>}
    </div>
  )
}
