import { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import Button from "@mui/material/Button";
import Login from './components/landing-page/login';
import Menu from './components/common/menu/Menu';
import LayoutCajero from './components/cajero/LayoutCajero';
import CajeroRoutes from './routes/CajeroRoutes';
import {theme, darkTheme} from './styles/theme'
import Ejecutivos from './components/gerente/Ejecutivos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
        <Login/>
        {/*<CajeroRoutes />*/}
    </ThemeProvider>
  )
}

export default App
