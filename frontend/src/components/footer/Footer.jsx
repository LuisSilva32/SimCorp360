import React from 'react'
import '../../styles/componentsStyles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <h4>Acerca de nosotros</h4>
            <p>
              Somos una compañía dedicada a la venta de variedad de articulos,
              contamos con los mejores precios del mercado!.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <h4>ENLACES ÚTILES</h4>
            <ul>
              <li>
                <a href='/'>Inicio</a>
              </li>
              <li>
                <a href='https://react-hot-toast.com/'>Servicios</a>
              </li>
              <li>
                <a href='#'>Productos</a>
              </li>
              <li>
                <a href='#'>Contacto</a>
              </li>
            </ul>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <h4>Contactate con nosotro</h4>
            <ul>
              <li>
                Calle 22a # 2F-80, Bogotá
                Colombia
              </li>
              <li>

                atencionalcliente@webshopx.com.co
              </li>
              <li>
                +57 3004589027
              </li>
            </ul>
          </div>
          <div className='col-lg-3 col-md-6 col-sm-12'>
            <h4>Síguenos</h4>
            <ul className='social-media'>
              <li>
                <a href='#' />
              </li>
              <li>
                <a href='#' />
              </li>
              <li>
                <a href='#' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
