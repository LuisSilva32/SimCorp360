import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DarkModeContext } from '../../context/darkModeReducer'
import { API_URL } from '../../api/config.js'
import Loader from '../loader/Loader.jsx'
import '../../styles/chart.scss'

const Chart = ({ title, aspect }) => {
  const { darkMode } = useContext(DarkModeContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders/sales`)
        const sortedData = response.data.sort((a, b) => {
          const weekA = parseInt(a.name.split(' ')[1])
          const weekB = parseInt(b.name.split(' ')[1])
          return weekA - weekB
        })
        setData(sortedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(number)
  }

  if (loading) {
    return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><Loader /></div>
  }

  return (
    <div className={`chart ${darkMode ? 'dark' : 'light'}`}>
      <div className='title'>{title}</div>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='Total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={darkMode ? '#4C51C8' : '#943126'} stopOpacity={0.8} />
              <stop offset='95%' stopColor={darkMode ? '#4C51C8' : '#E74C3C'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke={darkMode ? '#4cceac' : 'gray'} />
          <CartesianGrid strokeDasharray='3 3' className='chartGrid' />
          <Tooltip
            contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}
            formatter={(value) => [formatNumber(value), 'Total']}
          />
          <Area type='monotone' dataKey='total' stroke={darkMode ? '#4cceac' : '#943126'} fillOpacity={1} fill='url(#Total)' />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
