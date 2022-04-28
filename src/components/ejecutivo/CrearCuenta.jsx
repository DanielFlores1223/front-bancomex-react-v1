import React from 'react';
import { useFormik } from "formik";
import {useState} from 'react';
import service from '../../service';
import * as Yup from "yup";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Container,
    Grid
  } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link } from 'react-router-dom'

const theme = createTheme({
    palette:{
        primary:{
            main: '#01579b',
        }
    },
});

const CrearCuenta = () => {


  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>  
        <Grid container spacing={5}>
            <h2>Seleccione el tipo de cuenta</h2>  
            <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 300, cursor: 'pointer' }}>
                  <Link to="/crear-cliente/debito" state={{type: 'Debito'}}>
                    <CardMedia
                    component="img"
                    height="200"
                    image="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                                Débito
                        </Typography>
                    </CardContent>
                    <CardActions>
                    {/* <ThemeProvider theme={theme}> */}
                            {/* <Button size="medium" color="primary" startIcon={<CreditCardIcon/>}>Crear</Button> */}
                        {/* </ThemeProvider> */}
                    </CardActions>
                    </Link>
                </Card>
            </Grid>
            <br></br>
            <Grid item xs={12} sm={6}>
                    <Link to="/crear-cliente">
                <Card sx={{ maxWidth: 300, cursor: 'pointer' }}>
                    <CardMedia
                    component="img"
                    height="200"
                    image="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Crédito
                        </Typography>
                    </CardContent>
                    <CardActions>
                    {/* <ThemeProvider theme={theme}> */}
                            {/* <Button size="medium" color="primary" startIcon={<CreditCardIcon/>}>Crear</Button> */}
                    {/* </ThemeProvider> */}
                    </CardActions>
                </Card>
                        </Link>
            </Grid>
        </Grid>
    </Container>
  )
}

export default CrearCuenta