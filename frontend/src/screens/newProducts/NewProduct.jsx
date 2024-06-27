import React, { useState } from 'react'
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
  name: yup.string().required('El nombre es requerido'),
  category: yup.string().required('La Categoría es requerida'),
  price: yup.string().required('El Precio es requerido'),
  stock: yup.string().required('Stock requerido'),
  description: yup.string().required('La descripción es requerida'),
  cost: yup.string().required('El Costo es requerido')
})

export default function NewProduct () {
  const [img, setImg] = useState('')

  const handleFileInputChange = (e) => {
    // eslint-disable-next-line no-undef
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setImg(fileReader.result)
    }
    fileReader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(`${API_URL}/api/products/register`, {
        img,
        name: values.name,
        category: values.category,
        price: values.price,
        stock: values.stock,
        description: values.description,
        cost: values.cost,
        state: values.state
      })
      Swal.fire({
        title: 'Registrado',
        text: 'Producto agregado con exito!',
        icon: 'success'
      })
      resetForm()
      setImg(null)
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

  return (
    <Container>
      <div className='new-product-container'>
        <div className='title-container'>
          <h1>Agregar nuevo Producto</h1>
        </div>
        <Row className='new-product-form'>
          <Col lg={12} xl={4}>
            <div className='container-img'>
              <img src={img || 'https://morenoa.com/wp-content/themes/consultix/images/no-image-found-360x250.png'} alt='Seleccione un imagen' />
            </div>
            <div className='container-file'>
              <Form.Group controlId='validationFormik06'>
                <Form.Control
                  type='file'
                  size='sm'
                  name='photo'
                  onChange={handleFileInputChange}
                />
              </Form.Group>
            </div>
          </Col>
          <Col lg={12} xl={8}>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                name: '',
                category: '',
                price: '',
                stock: '',
                description: '',
                cost: '',
                state: 'En Stock' // Asume un valor por defecto para el estado
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik01'>
                      <Form.Label className='label-new-product-form'>Nombre del producto</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik02'>
                      <Form.Label className='label-new-product-form'>Categoría</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='category'
                        value={values.category}
                        onChange={handleChange}
                        isValid={touched.category && !errors.category}
                        isInvalid={!!errors.category}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.category}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik03'>
                      <Form.Label className='label-new-product-form'>Precio</Form.Label>
                      <Form.Control
                        type='number'
                        size='sm'
                        name='price'
                        value={values.price}
                        onChange={handleChange}
                        isValid={touched.price && !errors.price}
                        isInvalid={!!errors.price}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.price}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik04'>
                      <Form.Label className='label-new-product-form'>Stock</Form.Label>
                      <Form.Control
                        type='number'
                        size='sm'
                        name='stock'
                        value={values.stock}
                        onChange={handleChange}
                        isValid={touched.stock && !errors.stock}
                        isInvalid={!!errors.stock}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.stock}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik05'>
                      <Form.Label className='label-new-product-form'>Descripción</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='description'
                        value={values.description}
                        onChange={handleChange}
                        isValid={touched.description && !errors.description}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik07'>
                      <Form.Label className='label-new-product-form'>Costo</Form.Label>
                      <Form.Control
                        type='number'
                        size='sm'
                        name='cost'
                        value={values.cost}
                        onChange={handleChange}
                        isInvalid={!!errors.cost}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.cost}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <fieldset>
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Label className='label-new-product-form' as='legend' column sm='auto'>
                        Estado del Producto
                      </Form.Label>
                      <Row lg='auto'>
                        <Form.Check
                          className='formCheck'
                          type='radio'
                          label='En Stock'
                          name='state'
                          value='En Stock'
                          onChange={handleChange}
                          checked={values.state === 'En Stock'}
                        />
                        <Form.Check
                          className='formCheck'
                          type='radio'
                          label='Agotado'
                          name='state'
                          value='Agotado'
                          onChange={handleChange}
                          checked={values.state === 'Agotado'}
                        />
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <Button type='submit' style={{ backgroundColor: 'crimson', border: 'none' }}>Agregar Producto</Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
