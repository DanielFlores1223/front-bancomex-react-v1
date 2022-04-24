import React from 'react'
import { useFormik } from "formik";
import {useState} from 'react';
import service from '../../service';
import * as Yup from "yup";
import {
    Button,
    TextField,
    Container,
    Box,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    Alert,
    FormHelperText
  } from "@mui/material";

  const validationSchema = Yup.object({
    
  })

const FormularioBeneficiario = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
        <form>
        <TextField
          fullWidth
          size="medium"
          sx={{ mb: 4 }}
          id="firstName"
          name="firstName"
          label="Nombre"
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mb: 4 }}
          id="lasttName"
          name="lasttName"
          label="Apellido"
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="email"
          name="email"
          label="Correo electrónico"
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="phone"
          name="phone"
          label="Celular"
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="relation"
          name="relation"
          label="Parentesco"
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="porcentage"
          name="porcentage"
          label="Celular"
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
        </form>
    </Container>
  )
}

export default FormularioBeneficiario