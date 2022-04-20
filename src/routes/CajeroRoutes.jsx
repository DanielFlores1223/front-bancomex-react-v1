import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DepositarCuenta from '../components/cajero/DepositarCuenta'
import Home from '../components/cajero/Home'
import LayoutCajero from '../components/cajero/LayoutCajero'

const CajeroRoutes = ({setLoginSuccess, setRole}) => {
  return (
     <BrowserRouter>
     <Routes>
         <Route path='/' element={<LayoutCajero setLoginSuccess={setLoginSuccess} 
                                                setRole={setRole}/>}>
             <Route index element={<Home />} />
             <Route path='depositar-cuenta' element={<DepositarCuenta />} />
         </Route>
     </Routes>
  </BrowserRouter>
  )
}

export default CajeroRoutes