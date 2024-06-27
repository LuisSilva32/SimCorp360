import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Container } from 'react-bootstrap'
import { API_URL } from '../../api/config'
import Datatable from '../../components/datatable/Datatable'
import '../../styles/resumeManagementScreen.scss'

export default function ResumeManagementScreen () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`)

      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleShowUser = async (user) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: 'Editar información de usuario',
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Regresar',
        reverseButtons: true,
        customClass: {
          popup: 'wide-swal-popup'
        },
        html: `
          <div class="swal-container">
            <div class="swal-input-group">
              <label for="swal-input-fullName">Nombre:</label>
              <input size="sm" id="swal-input-fullName" class="swal2-input" placeholder="Full Name" value="${user.fullName}">
            </div>
            <div class="swal-input-group">
              <label for="swal-input-email">Email:</label>
              <input id="swal-input-email" class="swal2-input" placeholder="Email" value="${user.email}">
            </div>
            <div class="swal-input-group">
              <label for="swal-input-phone">Teléfono:</label>
              <input id="swal-input-phone" class="swal2-input" placeholder="Phone" value="${user.phone}">
            </div>
            <div class="swal-input-group">
              <label for="swal-input-address">Dirección:</label>
              <input id="swal-input-address" class="swal2-input" placeholder="Address" value="${user.address}">
            </div>
            <div class="swal-input-group">
              <label for="swal-input-city">Ciudad:</label>
              <input id="swal-input-city" class="swal2-input" placeholder="City" value="${user.city}">
            </div>
            <div class="swal-input-group">
              <label for="swal-input-postalCode">Código post:</label>
              <input id="swal-input-postalCode" class="swal2-input" placeholder="Postal Code" value="${user.postalCode}">
            </div>
            <div class="swal-input-group">
              <label for="swal-input-state">Estado:</label>
              <select id="swal-input-state" class="swal2-input">
              <option value="Activo" ${user.state === 'Activo' ? 'selected' : ''}>Activo</option>
              <option value="Inactivo" ${user.state === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
              <option value="Despedido" ${user.state === 'Despedido' ? 'selected' : ''}>Despedido</option>
            </select>
            </div>
            <div class="swal-input-group">
              <label for="swal-input-post">Cargo:</label>
              <input id="swal-input-post" class="swal2-input" placeholder="Post" value="${user.post}">
            </div>
          </div>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return {
            fullName: document.getElementById('swal-input-fullName').value,
            email: document.getElementById('swal-input-email').value,
            phone: document.getElementById('swal-input-phone').value,
            address: document.getElementById('swal-input-address').value,
            city: document.getElementById('swal-input-city').value,
            postalCode: document.getElementById('swal-input-postalCode').value,
            state: document.getElementById('swal-input-state').value,
            post: document.getElementById('swal-input-post').value
          }
        }
      })

      if (formValues) {
        console.log('Updated User Information:', formValues)
        // Aquí puedes manejar la actualización del usuario, por ejemplo, enviando los datos al servidor
        axios.put(`${API_URL}/api/users/update/${user._id}`, formValues)
          .then(() => {
            Swal.fire({
              title: '¡Actualizado!',
              text: 'La información del usuario ha sido actualizada.',
              icon: 'success'
            })
            fetchUsers()
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error'
            })
          })
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      })
    }
  }

  const deleteHandler = (user) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar a este usuario?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminarlo!',
      cancelButtonText: 'No, ¡cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_URL}/api/users/delete/${user._id}`)
          .then(() => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El usuario ha sido eliminado.',
              icon: 'success'
            })
            fetchUsers()
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error'
            })
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'El usuario está a salvo :)',
          icon: 'error'
        })
      }
    })
  }

  const dataUserColumns = [
    {
      name: 'Avatar',
      selector: row => <img className='avatar' src={row.photo} />
    },
    {
      name: 'Nombre',
      selector: row => row.fullName,
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email
    },
    {
      name: 'Teléfono',
      selector: row => row.phone
    },
    {
      name: 'Estado',
      selector: row => <span className={`status ${row.state}`}>{row.state}</span>
    },
    {
      name: 'Opciones',
      selector: row => (
        <div className='cellAction'>
          <button className='viewButton' onClick={() => handleShowUser(row)}>Ver</button>
          <button className='deleteButton' onClick={() => deleteHandler(row)}>Eliminar</button>
        </div>
      )
    }
  ]

  return (
    <Container className='container'>
      <div className='list-container-resume-management-screen'>
        <Datatable
          title='Gestionar la hoja de vida de los empleados'
          data={users}
          columnsConfig={dataUserColumns}
          searchAttribute='fullName'
          searchPlaceholder='Buscar empleados...'
          selectableRows
        />
      </div>
    </Container>
  )
}
