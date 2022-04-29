import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DepositarCuenta from "../components/cajero/DepositarCuenta";
import RetirarEfectivo from "../components/cajero/RetirarEfectivo";
import Home from "../components/cajero/Home";
import LayoutCajero from "../components/cajero/LayoutCajero";
import HacerCorte from "../components/cajero/HacerCorte";
import Opciones from '../components/common/opciones/Opciones'


const CajeroRoutes = ({ setLoginSuccess, setRole }) => {
  const [linkDisabled, setLinkDisabled] = useState(true);

  useEffect(() => {
    setLinkDisabled(!Boolean(localStorage.getItem("cb")));
  }, [linkDisabled]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutCajero
              setLoginSuccess={setLoginSuccess}
              setRole={setRole}
              setLinkDisabled={setLinkDisabled}
              linkDisabled={linkDisabled}
            />
          }
        >
          <Route index element={<Home setLinkDisabled={setLinkDisabled} />} />
          {!linkDisabled && (
            <>
              <Route path="depositar-cuenta" element={<DepositarCuenta />} />
              <Route path="retirar-efectivo" element={<RetirarEfectivo />} />
              <Route
                path="hacer-corte"
                element={
                  <HacerCorte
                    setLoginSuccess={setLoginSuccess}
                    setRole={setRole}
                  />
                }
              />
              <Route path = 'opciones' element={<Opciones />} />
            </>
          )}

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CajeroRoutes;
