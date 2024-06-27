import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/newProducts.scss'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import * as formik from 'formik'
import * as yup from 'yup'
import { API_URL } from '../../api/config.js'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Container } from 'react-bootstrap'

const { Formik } = formik

const schema = yup.object().shape({
  Ciudad: yup.string().required('La ciudad es requerida'),
  Cantidad: yup.number().required('La cantidad es requerida').positive('Debe ser un número positivo'),
  id_producto: yup.string().required('El producto es requerido')
})

export default function NewOrder () {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`)
        setProductos(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProductos()
  }, [])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      
  
      const productoSeleccionado = productos.find(producto => producto.id === values.id_producto)
      const precio_total = values.Cantidad * (productoSeleccionado ? productoSeleccionado.price : 0)

      await axios.post(`${API_URL}/api/orders/register`, {
        Ciudad: values.Ciudad,
        Cantidad: values.Cantidad,
        id_producto: values.id_producto,
        precio_total: precio_total
      })
      Swal.fire({
        title: 'Registrado',
        text: 'Pedido agregado con éxito!',
        icon: 'success'
      })
      resetForm()
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Algo salió mal',
        icon: 'error'
      })
    } finally {
      setSubmitting(false)
    }
  }

  const ciudades = [
    'Bogotá', 'Bucaramanga', 'Barranquilla', 'Ibagué', 'Medellin', 'Cali', 'Valledupar', 
    'Villavicencio', 'Manizales', 'Bello', 'Cartagena', 'Soledad', 'Cúcuta', 
    'Santa Marta', 'Soacha'
  ]

  return (
    <Container>
      <div className='new-order-container'>
        <div className='title-container'>
          <h1>Agregar Nuevo Pedido</h1>
        </div>
        <Row className='new-order-form'>
          <Col lg={12}>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                Ciudad: '',
                Cantidad: '',
                id_producto: ''
              }}
            >
              {({ handleSubmit, handleChange, values, setFieldValue, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik01'>
                      <Form.Label className='label-new-order-form'>Ciudad</Form.Label>
                      <Form.Control
                        as='select'
                        size='sm'
                        name='Ciudad'
                        value={values.Ciudad}
                        onChange={e => setFieldValue('Ciudad', e.target.value)}
                        isValid={touched.Ciudad && !errors.Ciudad}
                        isInvalid={!!errors.Ciudad}
                      >
                        <option value=''>Seleccione una ciudad</option>
                        {ciudades.map(ciudad => (
                          <option key={ciudad} value={ciudad}>
                            {ciudad}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type='invalid'>{errors.Ciudad}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik02'>
                      <Form.Label className='label-new-order-form'>Cantidad</Form.Label>
                      <Form.Control
                        type='number'
                        size='sm'
                        name='Cantidad'
                        value={values.Cantidad}
                        onChange={handleChange}
                        isValid={touched.Cantidad && !errors.Cantidad}
                        isInvalid={!!errors.Cantidad}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.Cantidad}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik03'>
                      <Form.Label className='label-new-order-form'>Producto</Form.Label>
                      <Form.Control
                        as='select'
                        size='sm'
                        name='id_producto'
                        value={values.id_producto}
                        onChange={e => setFieldValue('id_producto', e.target.value)}
                        isValid={touched.id_producto && !errors.id_producto}
                        isInvalid={!!errors.id_producto}
                      >
                        <option value=''>Seleccione un producto</option>
                        {productos.map(producto => (
                          <option key={producto.id} value={producto.id}>
                            {producto.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type='invalid'>{errors.id_producto}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Button type='submit' style={{ backgroundColor: 'crimson', border: 'none' }}>Agregar Pedido</Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
