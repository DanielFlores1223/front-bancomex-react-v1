import React from 'react'
import { Link } from 'react-router-dom'
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";
import Menu from '../common/menu/Menu'

const LayoutCajero = () => {
  return (
    <div>
         <Menu>
               <ListItem button>
                    <Link to="/cajero"> Inicio </Link>
               </ListItem>
               <ListItem button>
                    <Link to="/cajero/depositar-cuenta"> Depositar cuenta </Link>
               </ListItem>

               <ListItem button>
                 <ListItemText primary="Link1" />
               </ListItem>
         </Menu>
    </div>
  )
}

export default LayoutCajero