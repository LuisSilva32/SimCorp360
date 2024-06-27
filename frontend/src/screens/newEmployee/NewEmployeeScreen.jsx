import React, { useState } from 'react'
import axios from 'axios'
import '../../styles/newEmployee.scss'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Swal from 'sweetalert2/src/sweetalert2'
import * as formik from 'formik'
import * as yup from 'yup'
import { Container } from 'react-bootstrap'

const { Formik } = formik

const schema = yup.object().shape({
  firstName: yup.string().required('El nombre es requerido'),
  lastName: yup.string().required('El apellido es requerido'),
  phone: yup.string().required('El teléfono es requerido'),
  post: yup.string().required('El cargo es requerido'),
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  address: yup.string().required('La dirección es requerida'),
  city: yup.string().required('La ciudad es requerida'),
  postalCode: yup.string().required('El código postal es requerido') // Agrega este campo para la contraseña
})

export default function NewEmployeeScreen () {
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
      await axios.post('http://127.0.0.1:5000/api/users/register', {
        photo: img,
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        state: values.state,
        post: values.post,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode
      })
      Swal.fire({
        title: 'Registrado',
        text: 'Empleado agregado con exito!',
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
      <div className='new-employee-container'>
        <div className='title-container'>
          <h1>Agregar nuevo empleado</h1>
        </div>
        <Row className='new-employee-form'>
          <Col lg={12} xl={4}>
            <div className='container-img'>
              <img src={img || 'https://morenoa.com/wp-content/themes/consultix/images/no-image-found-360x250.png'} alt='Selccione una imagen' />
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
                firstName: '',
                lastName: '',
                phone: '',
                post: '',
                email: '',
                address: '',
                city: '',
                postalCode: '', // Agrega este campo para la contraseña
                state: 'Activo' // Asume un valor por defecto para el estado
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik01'>
                      <Form.Label className='label-new-employee-form'>Nombre</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik02'>
                      <Form.Label className='label-new-employee-form'>Apellido</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                        isInvalid={!!errors.lastName}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik03'>
                      <Form.Label className='label-new-employee-form'>Teléfono</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='phone'
                        value={values.phone}
                        onChange={handleChange}
                        isValid={touched.phone && !errors.phone}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik04'>
                      <Form.Label className='label-new-employee-form'>Cargo</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='post'
                        value={values.post}
                        onChange={handleChange}
                        isValid={touched.post && !errors.post}
                        isInvalid={!!errors.post}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.post}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik05'>
                      <Form.Label className='label-new-employee-form'>Correo electrónico</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type='email'
                          size='sm'
                          name='email'
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type='invalid'>
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className='mb-3'>
                    <Form.Group as={Col} controlId='validationFormik07'>
                      <Form.Label className='label-new-employee-form'>Dirección</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='address'
                        value={values.address}
                        onChange={handleChange}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik08'>
                      <Form.Label className='label-new-employee-form'>Ciudad</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='city'
                        value={values.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId='validationFormik09'>
                      <Form.Label className='label-new-employee-form'>Código postal</Form.Label>
                      <Form.Control
                        type='text'
                        size='sm'
                        name='postalCode'
                        value={values.postalCode}
                        onChange={handleChange}
                        isInvalid={!!errors.postalCode}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.postalCode}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <fieldset>
                    <Form.Group as={Row} className='mb-3'>
                      <Form.Label className='label-new-employee-form' as='legend' column sm='auto'>
                        Estado del empleado
                      </Form.Label>
                      <Row lg='auto'>
                        <Form.Check
                          className='formCheck'
                          type='radio'
                          label='Activo'
                          name='state'
                          value='Activo'
                          onChange={handleChange}
                          checked={values.state === 'Activo'}
                        />
                        <Form.Check
                          className='formCheck'
                          type='radio'
                          label='Inactivo'
                          name='state'
                          value='Inactivo'
                          onChange={handleChange}
                          checked={values.state === 'Inactivo'}
                        />
                        <Form.Check
                          className='formCheck'
                          type='radio'
                          label='Despedido'
                          name='state'
                          value='Despedido'
                          onChange={handleChange}
                          checked={values.state === 'Despedido'}
                        />
                      </Row>
                    </Form.Group>
                  </fieldset>
                  <Button type='submit' style={{ backgroundColor: 'crimson', border: 'none' }}>Agregar empleado</Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
