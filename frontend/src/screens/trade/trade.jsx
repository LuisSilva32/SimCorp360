/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Container } from 'react-bootstrap'
import Datatable from '../../components/datatable/Datatable'
import { useNavigate } from 'react-router-dom' // Para redirigir a la página de trading
import '../../styles/trade.scss'
import { API_KEYTWO } from '../../api/config.js'
import AAPL from '../../assets/AAPL.png'
import NVDA from '../../assets/NVDA.png'
import TSLA from '../../assets/TSLA.png'
import GOOGL from '../../assets/GOOGL.png'
import EC from '../../assets/EC.png'
import CIB from '../../assets/CIB.png'
import AMZN from '../../assets/AMZN.png'

const stockSymbols = ['AAPL', 'TSLA', 'AMZN', 'GOOGL', 'CIB', 'EC', 'NVDA']
const names = ['Apple Inc', 'Tesla Inc', 'Amazon.com, Inc', 'Google LLC', 'Bancolombia SA', 'Ecopetrol SA', 'NVidia Corp']

export default function StockDataManagementScreen () {
  const [stockData, setStockData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchStockData()
  }, [])

  const fetchStockData = async () => {
    const fetchedData = []

    try {
      for (let i = 0; i < stockSymbols.length; i++) {
        const symbol = stockSymbols[i]
        const name = names[i]
        const response = await axios.get('https://api.finage.co.uk/history/stock/open-close', {
          params: {
            stock: symbol,
            date: '2024-06-13',
            apikey: API_KEYTWO
          }
        })

        let img
        switch (symbol) {
          case 'AAPL':
            img = AAPL
            break
          case 'TSLA':
            img = TSLA
            break
          case 'AMZN':
            img = AMZN
            break
          case 'GOOGL':
            img = GOOGL
            break
          case 'CIB':
            img = CIB
            break
          case 'EC':
            img = EC
            break
          case 'NVDA':
            img = NVDA
            break
          default:
            img // Define una imagen por defecto si el símbolo no tiene una imagen específica
            break
        }

        const stockInfo = {
          ...response.data,
          name,
          img
        }

        fetchedData.push(stockInfo)
      }
      setStockData(fetchedData)
    } catch (error) {
      console.error('Error fetching stock data:', error)
    }
  }

  const handleTrade = (stock) => {
    navigate(`/trade/${stock.symbol}`)
  }

  const stockDataColumns = [
    {
      name: '',
      selector: row => <img className='avatar' src={row.img} />,
      sortable: true
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Stock',
      selector: row => row.symbol,
      sortable: true
    },
    {
      name: 'Apertura',
      selector: row => row.open,
      sortable: true
    },
    {
      name: 'Alta',
      selector: row => row.high,
      sortable: true
    },
    {
      name: 'Baja',
      selector: row => row.low,
      sortable: true
    },
    {
      name: 'Cierre',
      selector: row => row.close,
      sortable: true
    },
    {
      name: 'Volumen',
      selector: row => row.volume,
      sortable: true
    },
    {
      name: 'Fecha',
      selector: row => row.from,
      sortable: true
    },
    {
      name: 'Tradear',
      selector: row => (
        <Button className='trade-button' onClick={() => handleTrade(row)}>Trade</Button>
      )
    }
  ]

  return (
    <Container className='container'>
      <div className='list-container-trade-screen'>
        <Datatable title='Stocks en Tendencia' data={stockData} columnsConfig={stockDataColumns} />
      </div>
    </Container>
  )
}
