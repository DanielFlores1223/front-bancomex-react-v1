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
    FormHelperText,
    Grid,
  } from "@mui/material";
  import Stack from '@mui/material/Stack';
  import Spinner from '../common/spinner/Spinner';

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ingresa el nombre del beneficiario"),
    lastName: Yup.string().required("Ingresa el apellido del beneficiario"),
    birthDate: Yup.date().required("Ingresa la fecha de nacimiento"),
    email: Yup.string().required("Ingresa el email del beneficiario"),
    phone: Yup.string().required("Ingresa el teléfono del beneficiario"),
    relation: Yup.string().required("Ingresa el parentesco"),
    porcentage: Yup.string().required("Ingresa el porcentaje"),
  })

const FormularioBeneficiario = () => {
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [clear, setClear] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      phone: "",
      relation: "",
      porcentage: ""
    }, 
    validationSchema: validationSchema,
    onSubmit: (values) => {
      crearBeneficiario(values);
    },
  });

  const crearBeneficiario = async (values) => {
    const { developURL } = service;
    const data = {...values}
    console.log(data)
    const url = `${developURL}/beneficiaries`
    const fetchConfig = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('t')} ,
      body: JSON.stringify( data )
    }

    try{
      setShowSpinner(true);
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setShowSpinner(false);
      
      if(!jsonResponse.success){
        setErrorExist(true);

        setTimeout(()=>{
          setErrorExist(false);
          setMsgError('');
        }, 4000);
        return
      }
      formik.resetForm();
    } catch (error){ 
      setShowSpinner(true);
      console.log(error)
      setTimeout(()=>{
        setErrorExist(true);
        setMsgError('Beneficiario no creado');
      }, 2000);

      setTimeout(()=>{
        setErrorExist(false);
        setMsgError('EDITAR');
      }, 4000)
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
        <form onSubmit={(e)=>{
          e.preventDefault()
          formik.handleSubmit()
        }}>
        <Grid container spacing={2}>
        {errorExist && (<Alert severity="error" fullWidth> {msgError} </Alert>)}
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="medium"
          sx={{ mb: 4 }}
          id="firstName"
          name="firstName"
          label="Nombre"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean (formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          disabled={showSpinner}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="medium"
          sx={{ mb: 4 }}
          id="lastName"
          name="lastName"
          label="Apellido"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean (formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lasttName}
          disabled={showSpinner}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Stack component="form" noValidate spacing={3}>
          <TextField
          fullWidth
          size="medium"
          sx={{ mb: 4 }}
          id="birthDate"
          name="birthDate"
          label="Fecha de nacimiento"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          error={formik.touched.birthDate && Boolean (formik.errors.birthDate)}
          helperText={formik.touched.birthDate && formik.errors.birthDate}
          disabled={showSpinner}
          />
        </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="email"
          name="email"
          label="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean (formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={showSpinner}
        />
        </Grid>
        <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="phone"
          name="phone"
          label="Celular"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean (formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          disabled={showSpinner}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="relation"
          name="relation"
          label="Parentesco"
          value={formik.values.relation}
          onChange={formik.handleChange}
          error={formik.touched.relation && Boolean (formik.errors.relation)}
          helperText={formik.touched.relation && formik.errors.relation}
          disabled={showSpinner}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="porcentage"
          name="porcentage"
          label="Porcentaje"
          value={formik.values.porcentage}
          onChange={formik.handleChange}
          error={formik.touched.porcentage && Boolean (formik.errors.porcentage)}
          helperText={formik.touched.porcentage && formik.errors.porcentage}
          disabled={showSpinner}
        />
        </Grid>
        </Grid>
        <Button color="primary" variant="contained" fullWidth type="submit" onClick={()=>{setClear(true)}}>
          Submit
        </Button>
          {showSpinner && <Spinner />} 
        </form>
    </Container>
  )
}

export default FormularioBeneficiario