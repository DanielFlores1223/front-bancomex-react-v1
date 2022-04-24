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
    Container
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
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <h1>Seleccione el tipo de cuenta</h1>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
            />
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    Débito
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    Me goa matar uwu
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
        <br></br>
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
            />
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    Crédito
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    Me goa matar uwu
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
    </Container>
  )
}

export default CrearCuenta