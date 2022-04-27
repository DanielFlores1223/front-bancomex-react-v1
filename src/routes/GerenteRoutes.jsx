import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActualizaEmplado from '../components/gerente/ActualizaEmplado'
import CrearEmpleados from '../components/gerente/CrearEmpleados'
import Cuentas from '../components/gerente/Cuentas'
import Empleados from '../components/gerente/Empleados'
import EmpleadosId from '../components/gerente/EmpleadosId'
import Home from '../components/gerente/Home'
import LayoutGerente from '../components/gerente/LayoutGerente'

const GerenteRoutes = ( {setLoginSuccess, setRole} ) => {
  return (
      <BrowserRouter>
      <Routes>
          <Route path = '/' element = {<LayoutGerente setLoginSuccess = {setLoginSuccess}
                                        setRole = {setRole}/>}>
                <Route index element = {<Home />} />
                <Route path = 'crear-empleado' element = {<CrearEmpleados />} /> 
                <Route path = 'empleados' element = {<Empleados/>} />
                <Route path = 'empleados/:id' element = {<EmpleadosId/>} />
                <Route path = 'empleados/actualiza/:id' element= {<ActualizaEmplado/>} />
                <Route path = 'cuentas' element = {<Cuentas />} />
            </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default GerenteRoutes