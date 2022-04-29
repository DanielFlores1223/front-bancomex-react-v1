import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ActualizaEmplado from '../components/gerente/ActualizaEmplado'
import CrearEmpleados from '../components/gerente/CrearEmpleados'
import Cuentas from '../components/gerente/Cuentas'
import Empleados from '../components/gerente/Empleados'
import Home from '../components/gerente/Home'
import InfoCredito from '../components/gerente/InfoCredito'
import LayoutGerente from '../components/gerente/LayoutGerente'
import ListaCreditos from '../components/gerente/ListaCreditos'
import Opciones from '../components/common/opciones/Opciones'


const GerenteRoutes = ( {setLoginSuccess, setRole} ) => {
  return (
      <BrowserRouter>
      <Routes>
          <Route path = '/' element = {<LayoutGerente setLoginSuccess = {setLoginSuccess}
                                        setRole = {setRole}/>}>
                <Route index element = {<Home />} />
                <Route path = 'crear-empleado' element = {<CrearEmpleados />} /> 
                <Route path = 'empleados' element = {<Empleados/>} />
                <Route path = 'empleados/actualiza/:id' element= {<ActualizaEmplado/>} />
                <Route path = 'cuentas' element = {<Cuentas />} />
                <Route path = 'creditos' element = {<ListaCreditos />} />
                <Route path = 'creditos/:id' element = {<InfoCredito />} />
                <Route path = 'opciones' element={<Opciones />} />
            </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default GerenteRoutes