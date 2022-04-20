import { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from "@mui/material/Button";
import Login from './components/landing-page/login';
import Menu from './components/common/menu/Menu';
import LayoutCajero from './components/cajero/LayoutCajero';
import CajeroRoutes from './routes/CajeroRoutes';
import EjecutivoRoutes from './routes/EjecutivoRoutes';
import GerenteRoutes from './routes/GerenteRoutes';
import {theme, darkTheme} from './styles/theme'
import LandingRoutes from './routes/LandingRoutes';

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [role, setRole] = useState( (localStorage.getItem('role')) ?? '' );

  useEffect(() => {
    if(role !== '') {
      localStorage.setItem('role', role);
      setLoginSuccess(true);
    }
      
  }, [role]);

  return (
    <ThemeProvider theme={theme}>
        { !loginSuccess && (<LandingRoutes setLoginSuccess={setLoginSuccess} 
                                           setRole={setRole} 
                                           role={role}
                                           />) }
        
        { loginSuccess && role === 'Cajero' &&  <CajeroRoutes setLoginSuccess={setLoginSuccess} 
                                                              setRole={setRole} /> }

        { loginSuccess && role === 'Ejecutivo' &&  <EjecutivoRoutes setLoginSuccess={setLoginSuccess} 
                                                              setRole={setRole} /> }
        
        { loginSuccess && role == 'Gerente' && <GerenteRoutes setLoginSuccess = {setLoginSuccess}
                                                              setRole = {setRole}/>}

    </ThemeProvider>
  )
}

export default App
