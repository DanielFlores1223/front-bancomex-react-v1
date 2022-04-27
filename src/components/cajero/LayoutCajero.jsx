import {useEffect, useState} from 'react'
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";
import Menu from '../common/menu/Menu'
import { LinkStyled } from '../common/menu/LinkStyled'
import { useNavigate } from 'react-router-dom'


const LayoutCajero = ({setLoginSuccess, setRole, setLinkDisabled, linkDisabled}) => {

  const [disableClose, setDisableClose] = useState((localStorage.getItem('cb') 
                                                    && localStorage.getItem('ccbo')) ?? false );

  const navigateTo = useNavigate();
  const closeSession = () => {
    localStorage.clear();
    setLoginSuccess(false);
    setRole('');
    navigateTo('/');
  }

  useEffect(() => {
    setDisableClose((localStorage.getItem('cb') && localStorage.getItem('ccbo')) ?? false);
  }, [linkDisabled]);

  return (
    <div>
         <Menu>
             
              <LinkStyled to="/"> <span> Inicio </span> </LinkStyled>

              {
                  !linkDisabled && (
                    <>
                      <LinkStyled to="/depositar-cuenta"> <span> Depositar cuenta </span></LinkStyled>
                      <LinkStyled to="/retirar-efectivo"> <span> Retirar efectivo </span></LinkStyled>
                    </>
                  )
              }

              {
                !disableClose && (
                  <LinkStyled to='/' onClick={closeSession} > <span>Cerrar Sesión</span> </LinkStyled>
                ) 
              }
         </Menu>
    </div>
    
  )
}

export default LayoutCajero