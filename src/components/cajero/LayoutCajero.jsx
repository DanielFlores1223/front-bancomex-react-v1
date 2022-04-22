import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";
import Menu from '../common/menu/Menu'
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'

const LinkStyled = styled(Link)`
  padding-left: 1rem;  
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #95A5A6;
  font-size: 14px;
  height: 40px;
  margin: 0 0.5rem;

  &:hover {
          background-color: #8390A3;
          color: white;
          border-radius: 10px;
     }

  & span {
          margin-left: 0.8rem;
      }

`;

const LayoutCajero = ({setLoginSuccess, setRole}) => {

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
              <LinkStyled to="/depositar-cuenta"> <span> Depositar cuenta </span></LinkStyled>
              <LinkStyled to="/retirar-efectivo"> <span> Retirar efectivo </span></LinkStyled>
              <LinkStyled to='/' onClick={closeSession} > <span>Cerrar Sesión</span> </LinkStyled>
         </Menu>
    </div>
    
  )
}

export default LayoutCajero