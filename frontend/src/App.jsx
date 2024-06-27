import React, { useContext, useState } from 'react'
import Home from './screens/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ResumeManagementScreen from './screens/resumeManagement/ResumeManagementScreen'
import EmployeeScreen from './screens/employee/EmployeeScreen'
import NewEmployeeScreen from './screens/newEmployee/NewEmployeeScreen'
import Sidebar from './components/sidebar/Sidebar'
import NavBar from './components/navbar/Navbar'
import { Offcanvas } from 'react-bootstrap'
import '../src/styles/app.scss'
import Indicators from './screens/finance/Idicators'
import './styles/darkMode.scss'
import { DarkModeContext } from './context/darkModeReducer'
import ProductScreen from './screens/products/ProductsScreen'
import NewProduct from './screens/newProducts/NewProduct'
import StockDataManagementScreen from './screens/trade/trade'
import NewOrder from './screens/orders/Orders'
import TradePage from './screens/trade/tradePage'

export default function App () {
  const [show, setShow] = useState(false)
  const { darkMode } = useContext(DarkModeContext)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className={darkMode ? 'app darkMode' : 'app'}>
      <BrowserRouter>
        <div className='sidebar-wrapper d-none d-md-block'>
          <Sidebar />
        </div>
        <div className='homeContainer'>
          <NavBar handleShow={handleShow} />
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path='resume-management' element={<ResumeManagementScreen />} />
              <Route path='indicators' element={<Indicators />} />
              <Route path='employee' element={<EmployeeScreen />} />
              <Route path='new-employee' element={<NewEmployeeScreen />} />
              <Route path='inventory' element={<ProductScreen />} />
              <Route path='new-product' element={<NewProduct />} />
              <Route path='stocks' element={<StockDataManagementScreen />} />
              <Route path='trade/:symbol' element={<TradePage />} /> {/* Añadida la ruta de TradePage */}
              <Route path='new-order' element={<NewOrder />} />
            </Route>
          </Routes>
        </div>
        <Offcanvas show={show} onHide={handleClose} responsive='md' className='d-md-none'>
          <Offcanvas.Header closeButton style={{ display: 'flex', alignItems: 'center' }}>
            <Offcanvas.Title>
              <img style={{ width: '150px' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1024px-Coca-Cola_logo.svg.png' alt='THE COCA-COLA COMPANY' />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar />
          </Offcanvas.Body>
        </Offcanvas>
      </BrowserRouter>
    </div>
  )
}
