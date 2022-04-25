import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CrearEmpleados from '../components/gerente/CrearEmpleados'
import Home from '../components/gerente/Home'
import LayoutGerente from '../components/gerente/LayoutGerente'

const GerenteRoutes = (setLoginSuccess, setRole) => {
  return (
      <BrowserRouter>
      <Routes>
          <Route path = '/' element = {<LayoutGerente setLoginSuccess = {setLoginSuccess}
                                        setRole = {setRole}/>}>
                <Route index element = {<Home />} />
                <Route path = 'crear-empleado' element = {<CrearEmpleados />} /> 
            </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default GerenteRoutes