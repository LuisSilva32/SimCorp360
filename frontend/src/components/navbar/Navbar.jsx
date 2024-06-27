import React, { useContext } from 'react'
import '../../styles/navbar.scss'
import { DarkModeContext } from '../../context/darkModeReducer'
import { Navbar } from 'react-bootstrap'
import  {useState}  from 'react'

export default function NavBar ({ handleShow }) {
  const { dispatch } = useContext(DarkModeContext)
  const [showNotification, setShowNotification] = useState(false);

  const handleBellClick = () => {
    setShowNotification(!showNotification);
  };

  return (
    <Navbar className='navbar'>
      <div className='wrapper'>
        <button variant='primary' onClick={handleShow} className='menu-button-sidebar'>
          <i className='bi bi-list' />
        </button>
        <div className='search'>
          <input type='text' placeholder='Buscar...' />
          <i className='bi bi-search' />
        </div>
        <div className='items'>
          <div className='item'>
            <i className='bi bi-moon-stars' onClick={() => dispatch({ type: 'TOGGLE' })} />
          </div>
          <div className='item' onClick={handleBellClick} style={{ position: 'relative' }}>
            <i className='bi bi-bell' />
            <span className='custom-notification-dot'></span>
            {showNotification && (
              <div className='custom-notification-popup'>
                <p>Un nuevo producto ha sido agregado</p>
                <p>Una nueva persona se ha unido al grupo</p>
              </div>
              )}
          </div>
          <div className='item-user'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
              alt='User'
              className='avatar'
            />
          </div>
        </div>
      </div>
    </Navbar>
  )
}
