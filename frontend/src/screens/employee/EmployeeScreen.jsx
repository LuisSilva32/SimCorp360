import React from 'react'
import '../../styles/employeeScreen.scss'
import Chart from '../../components/chart/Chart'
import Datatable from '../../components/datatable/Datatable'

export default function EmployeeScreen () {
  return (
    <div className='employee'>
      <div className='employeeContainer'>
        <div className='top'>
          <div className='left'>
            <button className='editButton'>Editar</button>
            <h1 className='title'>Informacion</h1>
            <div className='item'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                alt='Empleado'
                className='itemImg'
              />
              <div className='details'>
                <h1 className='itemTitle'>Luis Silva</h1>
                <div className='detailItem'>
                  <span className='itemKey'>Correo:</span>
                  <span className='itemValue'>silvavega32@gmail.com</span>
                </div>
                <div className='detailItem'>
                  <span className='itemKey'>Telefono:</span>
                  <span className='itemValue'>+57 300 4579026</span>
                </div>
              </div>
            </div>
          </div>
          <div className='right'>
            <Chart aspect={3 / 1} title='Rendimiento del empleado en los ultimos 6 meses' />
          </div>
        </div>
        <div className='bottom'>
          <h1 className='title'>Ultimas transacciones</h1>
          <Datatable />
        </div>
      </div>
    </div>
  )
}
