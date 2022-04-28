import React from 'react'
import { useFormik } from "formik";
import {useState} from 'react';
import service from '../../service';
import * as Yup from "yup";
import {
    Button,
    TextField,
    Container,
    Alert,
    FormHelperText
  } from "@mui/material";
  import Stack from '@mui/material/Stack';

  const validationSchema = Yup.object({
    cardNumber: Yup.number().required("Ingresa el número de tarjeta"),
    dateExpiration: Yup.date().required("Ingresa la fecha de expiración")
  });

const AgregarTarjeta = () => {
    const [errorExist, setErrorExist] = useState(false);
    const [msgError, setMsgError] = useState('');

    const formik = useFormik({
        initialValues: {
            cardNumber: "",
            dateExpiration: ""
        }, validationSchema: validationSchema,
        onSubmit: (values) => {
            crearTarjeta(values);
        },
    });

    const crearTarjeta = async (values) => {
        const { developURL } = service;
        const data = {...values}
        console.log(data)
        const url = `${developURL}/cards`
        const fetchConfig = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('t')} ,
            body: JSON.stringify( data )
          }

          try {
            const response = await fetch( url, fetchConfig );
            const jsonResponse = await response.json();
            
            if(!jsonResponse.success){
              setErrorExist(true);
      
              setTimeout(()=>{
                setErrorExist(false);
                setMsgError('');
              }, 4000);
              return
            }
          } catch (error){ 
            console.log(error)
            setTimeout(()=>{
              setErrorExist(true);
              setMsgError('Tarjeta no creada');
            }, 2000);
      
            setTimeout(()=>{
              setErrorExist(false);
              setMsgError('EDITAR');
            }, 4000)
        }
    }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
        <form onSubmit={formik.handleSubmit}>
        {errorExist && (<Alert severity="error" fullWidth> {msgError} </Alert>)}
            <TextField
            fullWidth
            size="medium"
            sx={{ mb: 4 }}
            id="cardNumber"
            name="cardNumber"
            label="Ingrese el número de tarjeta"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            error={formik.touched.cardNumber && Boolean (formik.errors.cardNumber)}
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
            <TextField
            fullWidth
            size="medium"
            sx={{ mb: 4 }}
            id="dateExpiration"
            name="dateExpiration"
            label="Fecha de expiración"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.dateExpiration}
            onChange={formik.handleChange}
            error={formik.touched.dateExpiration && Boolean (formik.errors.dateExpiration)}
            helperText={formik.touched.dateExpiration && formik.errors.dateExpiration}
            />
        </form>
    </Container>
  )
}

export default AgregarTarjeta