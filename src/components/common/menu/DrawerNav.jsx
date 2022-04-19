import { Drawer } from '@mui/material'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NavList from './NavList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
     drawer: {
          [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
          },
     },
     drawerPaper: {
          width: drawerWidth,
     },
     toolbar: theme.mixins.toolbar,
}));

const DrawerNav = (props) => {

  const classes = useStyles();   
  return (
    <Drawer
          className={classes.drawer}
          classes={{
               paper: classes.drawerPaper,
           }}
          anchor="left"
          variant={props.variant}
          open={props.open}
          onClose={props.onClose ? props.onClose : null}     
    >
          <div className={classes.toolbar}></div>
          <NavList links={props.links} />
     </Drawer>
  )
}

export default DrawerNav