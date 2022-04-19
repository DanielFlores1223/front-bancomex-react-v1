import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Hidden } from '@material-ui/core';
import styled from '@emotion/styled';

const useStyles = makeStyles((theme) => ({
     root: {
       flexGrow: 1,
     },
     menuButton: {
       marginRight: theme.spacing(2),
     },
     title: {
       flexGrow: 1,
     },
     offset: {
       ...theme.mixins.toolbar, // min-height: 56px;
       marginBottom: "1rem", // margen opcional
     },
     appBar: {
          [theme.breakpoints.up('sm')]: {
              width: `100%`,
              marginLeft: 240,
          },
     },
}));

const LinkStyled = styled.a`
     color: #FFF;
     text-decoration: none;
     text-transform: none;
     font-size: 1rem;
     font-weight: 300;
     margin-right: 0.5rem;
    
`;

const NavBar = ({display}) => {
  
  const classes = useStyles();

  return (
     <>
          <AppBar className={classes.appBar} >
            <Toolbar>
              
              <Hidden smUp>
                    <IconButton edge="start" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="menu"
                                onClick={ () => display() }
                     >
                          <MenuIcon />
                    </IconButton>
              </Hidden>

               <div className={classes.title}>
                    <p>Logo</p>
               </div>
           </Toolbar>
          </AppBar>

          <div className={classes.offset}></div>
   </>
  )
}

export default NavBar 