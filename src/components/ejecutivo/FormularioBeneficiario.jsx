import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import service from "../../service";
import * as Yup from "yup";
import "yup-phone-lite";
import { useSnackbar } from "notistack";
import {
  Button,
  TextField,
  Container,
  Alert,
  FormHelperText,
  Grid,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Spinner from "../common/spinner/Spinner";

const validationSchema = Yup.object({
  firstName: Yup.string().required("*Campo requerido"),
  lastName: Yup.string().required("*Campo requerido"),
  birthDate: Yup.date().required("*Campo requerido"),
  email: Yup.string()
    .email("*Debe ser un email valido")
    .required("*Campo requerido"),
  phone: Yup.string()
    .phone("MX", "Ingresa un teléfono valido")
    .required("*Campo requerido"),
  relation: Yup.string().required("*Campo requerido"),
  porcentage: Yup.number()
    .min(1, "*Debe de ser mayor a 1")
    .max(100, "*Debe de ser menor a 100")
    .required("*Campo requerido"),
});

const FormularioBeneficiario = ({ beneficiario, setBeneficiario, cliente }) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      phone: "",
      relation: "",
      porcentage: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      crearBeneficiario(values);
      setBeneficiario({...beneficiario,values});
    },
  });

  const crearBeneficiario = async (values) => {
    const { developURL } = service;
    const data = { ...values };
    console.log(data);
    const url = `${developURL}/beneficiaries`;
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        enqueueSnackbar(
          "Se ha creado el cliente con su beneficiario satisfactoriamente",
          {
            variant: "success",
          }
        );
        return;
      }
      enqueueSnackbar("Hubo un error al crear el cliente", {
        variant: "error",
      });
      formik.resetForm();
    } catch (error) {
      enqueueSnackbar("Hubo un error al enviar la petición", {
        variant: "error",
      });
    }
  };

  function enviarDatos(datos) {
    setBeneficiario(datos)
    console.log(formik.values);
  }


  return (
    <Grid sx={{ mt: 2 }}>
      <form onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="medium"
              id="firstName"
              name="firstName"
              label="Nombres"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="medium"
              id="lastName"
              name="lastName"
              label="Apellidos"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack noValidate spacing={3}>
              <TextField
                fullWidth
                size="medium"
                id="birthDate"
                name="birthDate"
                label="Fecha de nacimiento"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                helperText={formik.touched.birthDate && formik.errors.birthDate}

              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="medium"
              id="relation"
              name="relation"
              label="Parentesco"
              value={formik.values.relation}
              onChange={formik.handleChange}
              error={formik.touched.relation && Boolean(formik.errors.relation)}
              helperText={formik.touched.relation && formik.errors.relation}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="medium"
              id="porcentage"
              name="porcentage"
              label="Porcentaje"
              value={formik.values.porcentage}
              onChange={formik.handleChange}
              error={
                formik.touched.porcentage && Boolean(formik.errors.porcentage)
              }
              helperText={formik.touched.porcentage && formik.errors.porcentage}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="medium"
              id="email"
              name="email"
              label="Correo electrónico"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="medium"
              id="phone"
              name="phone"
              label="Celular"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              sx={{ mt: 3 }}
              onClick={() => enviarDatos(formik.values)}
            >
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default FormularioBeneficiario;
