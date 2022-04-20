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

const LayoutCajero = ({setLoginSuccess, setRole}) => {

  const closeSession = () => {
    localStorage.clear();
    setLoginSuccess(false);
    setRole('');
  }

  return (
    <div>
         <Menu>
               <ListItem button>
                    <Link to="/"> Inicio </Link>
               </ListItem>
               <ListItem button>
                    <Link to="/depositar-cuenta"> Depositar cuenta </Link>
               </ListItem>

               <ListItem button>
                 <ListItemText primary="Link1" />
               </ListItem>

               <ListItem button>
                  <ListItemText primary='Cerrar Sesión' onClick={closeSession} />
               </ListItem>
         </Menu>
    </div>
  )
}

export default LayoutCajero