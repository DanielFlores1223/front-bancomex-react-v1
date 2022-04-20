import React from 'react';
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";

const NavList = ( { links } ) => {

  return (
    <div>

      <List component="nav" aria-label="cicle">

        { links }

      </List>

      <Divider />
    </div>
  )
}

export default NavList