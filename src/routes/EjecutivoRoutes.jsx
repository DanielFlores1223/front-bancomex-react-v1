import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CrearCliente from '../components/ejecutivo/CrearCliente'
import CrearCuenta from '../components/ejecutivo/CrearCuenta'
import FormularioBeneficiario from '../components/ejecutivo/FormularioBeneficiario'
import Home from '../components/ejecutivo/Home'
import LayoutEjecutivo from '../components/ejecutivo/LayoutEjecutivo'
import Credito from '../components/ejecutivo/Credito'
import TabsCuentas from '../components/ejecutivo/TabsCuentas'

const EjecutivoRoutes = ({ setLoginSuccess, setRole }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutEjecutivo
              setLoginSuccess={setLoginSuccess}
              setRole={setRole}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="crear-cuenta" element={<CrearCuenta />} />
          <Route path="crear-cliente/debito" element={<TabsCuentas />} />
          <Route path="crear-cliente" element={<TabsCuentas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default EjecutivoRoutes;
