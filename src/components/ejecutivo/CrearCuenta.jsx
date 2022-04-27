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
        <Grid container spacing={2}>
            <h2>Seleccione el tipo de cuenta</h2>  
            <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 300 }}>
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
                    <ThemeProvider theme={theme}>
                        <Link to="/crear-cliente">
                            <Button size="medium" color="primary" startIcon={<CreditCardIcon/>}>Crear</Button>
                        </Link>
                        </ThemeProvider>
                    </CardActions>
                </Card>
            </Grid>
            <br></br>
            <Grid item xs={12} sm={6}>
                <Card sx={{ maxWidth: 300 }}>
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
                    <ThemeProvider theme={theme}>
                        <Link to="/crear-cliente">
                            <Button size="medium" color="primary" startIcon={<CreditCardIcon/>}>Crear</Button>
                        </Link>
                    </ThemeProvider>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </Container>
  )
}

export default CrearCuenta