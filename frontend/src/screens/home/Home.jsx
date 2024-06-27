import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Widget from '../../components/widget/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import axios from 'axios'
import Datatable from '../../components/datatable/Datatable'
// import dataOrders from '../../data/dataOrders'
import '../../styles/home.scss'
import { API_URL } from '../../api/config'

const dataOrdersColums = [
  // {
  //   name: 'Producto',
  //   selector: row => <img className='image-product' src={row.imagen} alt={row.producto} />
  // },
  {
    name: 'Ciudad',
    selector: row => row.Ciudad,
    sortable: true
  },
  {
    name: 'Fecha',
    selector: row => {
      const date = new Date(row.Fecha)
      // Formatear la fecha para obtener solo la parte de la fecha
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
      return formattedDate
    }
  },
  {
    name: 'Cantidad',
    selector: row => row.Cantidad
  },
  {
    name: 'Total',
    selector: row => `$ ${row.precio_total}`
  }
  // {
  //   name: 'Estado',
  //   selector: row => <span className={`status ${row.estado}`}>{row.estado}</span>
  // }
]

export default function Home () {
  const [order, setOrders] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders/`)

      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  return (
    <div className='home'>
      <Container fluid className='homeContainer'>
        <Row className='widgets-container'>
          <Col xs={6} md={6} lg={3}>
            <Widget type='user' />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Widget type='order' />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Widget type='earning' />
          </Col>
          <Col xs={6} md={6} lg={3}>
            <Widget type='balance' />
          </Col>
        </Row>
        <Row className='charts-container'>
          <Col className='' xs={12} md={12} lg={12} xl={4}>
            <Featured />
          </Col>
          <Col className='col-chart' xs={12} md={12} lg={8}>
            <Chart title='Ingresos del Último mes' aspect={2 / 1} />
          </Col>
        </Row>
        <Row className='list-container-home'>
          <Datatable
            title='Últimas órdenes realizadas'
            data={order}
            columnsConfig={dataOrdersColums}
            noDataMessage='Aún no hay órdenes para mostrar'
            searchAttribute='proveedor'
            searchPlaceholder='Buscar por proveedores...'
          />
        </Row>
      </Container>
    </div>
  )
}
