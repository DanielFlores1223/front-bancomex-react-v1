import React from "react";
import { useFormik } from "formik";
import service from "../../service";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import "yup-phone-lite";

import {
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";

// Validaciones con Yup de cada uno de los campos del formulario
const validationSchema = Yup.object({
  firstName: Yup.string().required("*Campo requerido"),
  lastName: Yup.string().required("*Campo requerido"),
  gender: Yup.string().required("*Campo requerido"),
  street: Yup.string().required("*Campo requerido"),
  extNumber: Yup.number().required("*Campo requerido"),
  suburb: Yup.string().required("*Campo requerido"),
  zipcode: Yup.number().test("len", "*No valido", (val) => val && val.toString().length === 5).required("*Campo requerido"),city: Yup.string().required("*Campo requerido"),
  state: Yup.string().required("*Campo requerido"),
  phone: Yup.string().phone("MX", "Ingresa un teléfono valido").required("*Campo requerido"),
  curp: Yup.string().required("*Campo requerido").matches(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/, "Ingresa un CURP valido"),
  rfc: Yup.string().required("*Campo requerido").matches(/^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&amp;]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/, "Ingresa un RFC valido"),
  ine: Yup.string().required("*Campo requerido").matches(/^[0-9]{13}$/, "Ingresa un INE valido, 13 numeros"),
  email: Yup.string().email("*Debe ser un email valido").required("*Campo requerido"),
});

const generos = [
  {
    value: "m",
    label: "Masculino",
  },
  {
    value: "f",
    label: "Femenino",
  },
  {
    value: "o",
    label: "Otro",
  },
];

const CrearCliente = () => {
  // Notistick - Notificaciones
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      street: "",
      intNumber: "",
      extNumber: "",
      suburb: "",
      zipcode: "",
      city: "",
      state: "",
      phone: "",
      curp: "",
      rfc: "",
      ine: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      crear(values);
    },
  });

  const crear = async (values) => {
    const { developURL } = service;
    const data = { ...values };
    console.log(data);
    const url = `${developURL}/client`;
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
        enqueueSnackbar("Se ha creado el cliente satisfactoriamente", {
          variant: "success",
        });

        return;
      }
      enqueueSnackbar("Hubo un error al crear el cliente", {
        variant: "error",
      });
    } catch (error) {
      enqueueSnackbar("Hubo un error al enviar la petición", {
        variant: "error",
      });
    }
  };

  //
  const handleChange = (event) => {
    setGenero(event.target.value);
  };

  return (
    // <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
    <Grid sx={{ mt: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
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
          <Grid item xs={12} sm={5}>
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
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="medium">
              <InputLabel id="asdsaf">Género</InputLabel>
              <Select
                fullWidth
                id="gender"
                name="gender"
                label="Género"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value={"m"}>Masculino</MenuItem>
                <MenuItem value={"f"}>Femenino</MenuItem>
                <MenuItem value={"o"}>Otro</MenuItem>
              </Select>
              <FormHelperText style={{ color: "#d32f2f" }}>
                {formik.touched.gender && formik.errors.gender}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              size="medium"
              id="street"
              name="street"
              label="Domicilio"
              value={formik.values.street}
              onChange={formik.handleChange}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="medium"
              id="extNumber"
              name="extNumber"
              label="No. exterior"
              value={formik.values.extNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.extNumber && Boolean(formik.errors.extNumber)
              }
              helperText={formik.touched.extNumber && formik.errors.extNumber}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="medium"
              id="intNumber"
              name="intNumber"
              label="No. interior"
              value={formik.values.intNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.intNumber && Boolean(formik.errors.intNumber)
              }
              helperText={formik.touched.intNumber && formik.errors.intNumber}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="medium"
              id="suburb"
              name="suburb"
              label="Colonia"
              value={formik.values.suburb}
              onChange={formik.handleChange}
              error={formik.touched.suburb && Boolean(formik.errors.suburb)}
              helperText={formik.touched.suburb && formik.errors.suburb}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="medium"
              id="zipcode"
              name="zipcode"
              label="C.P"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
              helperText={formik.touched.zipcode && formik.errors.zipcode}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="medium"
              id="city"
              name="city"
              label="Ciudad"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              size="medium"
              id="state"
              name="state"
              label="Estado"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
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

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="medium"
              id="rfc"
              name="rfc"
              label="RFC"
              value={formik.values.rfc}
              onChange={formik.handleChange}
              error={formik.touched.rfc && Boolean(formik.errors.rfc)}
              helperText={formik.touched.rfc && formik.errors.rfc}
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="medium"
              id="curp"
              name="curp"
              label="CURP"
              value={formik.values.curp}
              onChange={formik.handleChange}
              error={formik.touched.curp && Boolean(formik.errors.curp)}
              helperText={formik.touched.curp && formik.errors.curp}
              inputProps={{ style: { textTransform: "uppercase" } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="medium"
              id="ine"
              name="ine"
              label="INE"
              value={formik.values.ine}
              onChange={formik.handleChange}
              error={formik.touched.ine && Boolean(formik.errors.ine)}
              helperText={formik.touched.ine && formik.errors.ine}
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
            >
              Crear Cliente
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default CrearCliente;
