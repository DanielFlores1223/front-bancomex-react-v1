import {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";
import Menu from '../common/menu/Menu'
import { LinkStyled } from '../common/menu/LinkStyled'

const LayoutEjecutivo = ({setLoginSuccess, setRole}) => {

  const navigateTo = useNavigate();
  const closeSession = () => {
    localStorage.clear();
    setLoginSuccess(false);
    setRole('');
    navigateTo('/');
  }

  return (
    <div>
         <Menu>
                <LinkStyled to="/"> <span>Inicio</span> </LinkStyled>
                <LinkStyled to="/crear-cuenta"> <span>Crear cuenta</span> </LinkStyled>
                <LinkStyled to="/crear-cliente/debito"> <span> Tabs - Debito </span> </LinkStyled>
                <LinkStyled to="/crear-cliente"> <span> Tabs - Crear Cliente </span> </LinkStyled>
                <LinkStyled to='/' onClick={closeSession} > <span>Cerrar Sesión</span> </LinkStyled>
         </Menu>
    </div>
  )
}

export default LayoutEjecutivo