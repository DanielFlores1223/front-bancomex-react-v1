import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CrearCliente from '../components/ejecutivo/CrearCliente'
import CrearCuenta from '../components/ejecutivo/CrearCuenta'
import FormularioBeneficiario from '../components/ejecutivo/FormularioBeneficiario'
import Home from '../components/ejecutivo/Home'
import LayoutEjecutivo from '../components/ejecutivo/LayoutEjecutivo'
import Credito from '../components/ejecutivo/Credito'
import Cuentas from '../components/ejecutivo/Cuentas'
import EstadoCuenta from '../components/ejecutivo/EstadoCuenta'
import Opciones from '../components/common/opciones/Opciones'
import TabsCuentas from '../components/ejecutivo/TabsCuentas'

const EjecutivoRoutes = ({ setLoginSuccess, setRole }) => {
  return (
     <BrowserRouter>
     <Routes>
         <Route path='/' element={<LayoutEjecutivo setLoginSuccess={setLoginSuccess} 
                                                setRole={setRole}/>}>
             <Route index element={<Home />} />
             <Route path="formulario-beneficiario" element={<FormularioBeneficiario />}/>
             <Route path="crear-cliente/debito" element={<TabsCuentas />} />
            <Route path="crear-cliente/credito" element={<TabsCuentas />} />
             <Route path="crear-cuenta" element={<CrearCuenta />}/>
             <Route path="clientes" element={<Cuentas />}/>
             <Route path="clientes/:id" element={<EstadoCuenta/>}/>
             <Route path="credito" element={<Credito />}/>
             <Route path="opciones" element={<Opciones />}/>
         </Route>
     </Routes>
  </BrowserRouter>
  )
}

export default EjecutivoRoutes;
