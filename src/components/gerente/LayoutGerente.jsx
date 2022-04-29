import {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider, FormControlLabel, Switch,

   } from "@material-ui/core";
import Menu from '../common/menu/Menu'
import { LinkStyled } from '../common/menu/LinkStyled'

const LayoutGerente = ({setLoginSuccess, setRole}) => {

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
               <LinkStyled to="/"> <span> Inicio </span> </LinkStyled>
               <LinkStyled to="/crear-empleado"> <span> Crear Empleado </span> </LinkStyled>
               <LinkStyled to = '/empleados'> <span> Empleados </span></LinkStyled>
               <LinkStyled to = '/creditos'> <span> Creditos </span></LinkStyled>
               <LinkStyled to='/' onClick={closeSession} > <span>Cerrar Sesión</span> </LinkStyled>
         </Menu>
    </div>
  )
}

export default LayoutGerente