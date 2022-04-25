import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CrearCliente from '../components/ejecutivo/CrearCliente'
import CrearCuenta from '../components/ejecutivo/CrearCuenta'
import FormularioBeneficiario from '../components/ejecutivo/FormularioBeneficiario'
import Home from '../components/ejecutivo/Home'
import LayoutEjecutivo from '../components/ejecutivo/LayoutEjecutivo'

const EjecutivoRoutes = ({setLoginSuccess, setRole}) => {
  return (
     <BrowserRouter>
     <Routes>
         <Route path='/' element={<LayoutEjecutivo setLoginSuccess={setLoginSuccess} 
                                                setRole={setRole}/>}>
             <Route index element={<Home />} />
             <Route path='crear-cliente' element={<CrearCliente />} />
             <Route path="formulario-beneficiario" element={<FormularioBeneficiario />}/>
             <Route path="crear-cuenta" element={<CrearCuenta />}/>
         </Route>
     </Routes>
  </BrowserRouter>
  )
}

export default EjecutivoRoutes