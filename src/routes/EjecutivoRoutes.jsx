import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CrearCliente from '../components/ejecutivo/CrearCliente'
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
         </Route>
     </Routes>
  </BrowserRouter>
  )
}

export default EjecutivoRoutes