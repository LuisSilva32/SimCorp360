import React, { useContext, useEffect, useState } from 'react'
import { DarkModeContext } from '../../context/darkModeReducer'
import { API_URL } from '../../api/config'
import axios from 'axios'
import '../../styles/widget.scss'

export default function Widget ({ type }) {
  const { darkMode } = useContext(DarkModeContext)
  const [data, setData] = useState({
    title: '',
    isMoney: false,
    link: '',
    icon: null
  })
  const [amount, setAmount] = useState(0)
  const porcent = 20 // Puedes actualizar esto según sea necesario

  useEffect(() => {
    fetchData()
  }, [type, darkMode])

  const fetchData = async () => {
    try {
      let response
      switch (type) {
        case 'user':
          response = await axios.get(`${API_URL}/api/users/count`)
          setAmount(response.data.count)
          setData({
            title: 'Empleados',
            isMoney: false,
            link: 'Ver usuarios',
            icon: (
              <i
                className='bi-widget bi-person'
                style={{
                  color: darkMode ? '#E74C3C' : '#CB4335',
                  backgroundColor: 'rgba(255, 0, 0, 0.2)',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            )
          })
          break
        case 'order':
          response = await axios.get(`${API_URL}/api/orders/count`)
          setAmount(response.data.count)
          setData({
            title: 'Pedidos',
            isMoney: false,
            link: 'Ver pedidos',
            icon: (
              <i
                className='bi-widget bi-cart2'
                style={{
                  color: darkMode ? 'yellow' : 'goldenrod',
                  backgroundColor: 'rgba(218, 165, 32, 0.2)',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            )
          })
          break
        case 'balance':
          response = await axios.get(`${API_URL}/api/products/count`)
          setAmount(response.data.count)
          setData({
            title: 'Productos',
            isMoney: false,
            link: 'Ver Productos',
            icon: (
              <i
                className='bi-widget bi-basket'
                style={{
                  color: darkMode ? '#4C51C8' : 'purple',
                  backgroundColor: 'rgba(128, 0, 128, 0.2)',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            )
          })
          break
        default:
          break
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>{data.isMoney && '$'} {amount}</span>
        <span className='link'>{data.link}</span>
      </div>
      <div className='right'>
        <div className='percentage positive'>
          <i className='bi bi-caret-up' />
          {porcent}%
        </div>
        {data.icon}
      </div>
    </div>
  )
}
