import React, { useContext } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../../styles/featured.scss'
import { DarkModeContext } from '../../context/darkModeReducer'
import axios from 'axios'
import Storage from '../../context/Storage.jsx'
import { API_URL } from '../../api/config.js'
import Loader from '../loader/Loader.jsx'
import NoData from '../../assets/noData.png'

const fetchFeaturedData = async () => {
  const response = await axios.get(`${API_URL}/api/orders/salesdata`)
  return response.data
}

export default function Featured () {
  const { darkMode } = useContext(DarkModeContext)
  const { data, loading, error } = Storage('featured', fetchFeaturedData)

  if (loading) return <div><Loader /></div>
  if (error) return <div><img className='noData-img' src={NoData} /></div>

  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Ingresos totales</h1>
        <i className='bi bi-three-dots-vertical' style={{ fontSize: 'small' }} />
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbar
            styles={darkMode
              ? buildStyles({ pathColor: '#4C51C8', textColor: '#4cceac' })
              : buildStyles({ pathColor: '#CB4335', textColor: '#E74C3C' })}
            value={data.percentage_to_target}
            text={`${data.percentage_to_target.toFixed(1)}%`}
            strokeWidth={5}
          />
        </div>
        <p className='title'>Total de ventas última semana</p>
        <p className='amount'>$ {data.last_week_total.toLocaleString()}</p>
        <p className='description'>
          Procesamiento de transacciones anteriores. Es posible que el último pago no esté incluido.
        </p>
        <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>Objetivo</div>
            <div className={`itemResult ${data.sales_difference >= 0 ? 'positive' : 'negative'}`}>
              <i className={`bi ${data.sales_difference >= 0 ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`} />
              <div className='resultAmount'>${data.sales_difference.toLocaleString()}</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>La semana pasada</div>
            <div className='itemResult positive'>
              <i className='bi bi-arrow-up-short' />
              <div className='resultAmount'>${data.week_before_last_total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
