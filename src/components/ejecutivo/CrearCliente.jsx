import React from "react";
import { useFormik } from "formik";
import service from "../../service";
import * as Yup from "yup";
import { useSnackbar } from 'notistack';

import {
  Button,
  TextField,
  Container,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";

// Validaciones con Yup de cada uno de los campos del formulario
const validationSchema = Yup.object({
  firstName: Yup.string().required("Por favor ingresa el nombre del cliente"),
  lastName: Yup.string().required("Por favor ingresa el apellido del cliente"),
  gender: Yup.string().required("Por favor ingresa el genero del cliente"),
  street: Yup.string().required("Por favor ingresa la calle del cliente"),
  extNumber: Yup.string().required(
    "Por favor ingresa numero exterior de la direccion del cliente"
  ),
  suburb: Yup.string().required("Por favor ingresa la colonia del cliente"),
  zipcode: Yup.string().required(
    "Por favor ingresa el Codigo Postal del cliente"
  ),
  city: Yup.string().required("Por favor ingresa la ciudad del cliente"),
  state: Yup.string().required("Por favor ingresa el estado del cliente"),
  phone: Yup.string().required("Por favor ingresa el teléfono del cliente"),
  curp: Yup.string().required("Por favor ingresa la CURP del cliente"),
  rfc: Yup.string().required("Por favor ingresa el RFC del cliente"),
  ine: Yup.string().required("Por favor ingresa la INE del cliente"),
  email: Yup.string().required("Por favor ingresa el email del cliente"),
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


// States of the components
const CrearCliente = () => {
    // Notistick - Notificaciones
    const { enqueueSnackbar } = useSnackbar();


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "m",
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
        enqueueSnackbar('Se ha creado el cliente satisfactoriamente', {variant:'success'} );


        return;
      }
      enqueueSnackbar('Hubo un error al crear el cliente', {variant:'error'} );
    } catch (error) {
      enqueueSnackbar('Hubo un error al enviar la petición', {variant:'error'} );

    }
  };

  //
  const handleChange = (event) => {
    setGenero(event.target.value);
  };


  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
      <form onSubmit={formik.handleSubmit}>        
        <TextField
          fullWidth
          size="medium"
          sx={{ mb: 4 }}
          id="firstName"
          name="firstName"
          label="Nombre"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="lastName"
          name="lastName"
          label="Apellidos"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <FormControl fullWidth size="medium" sx={{ mt: 0, mb: 5 }}>
          <InputLabel id="asdsaf">Género</InputLabel>
          <Select
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
          <FormHelperText>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>

        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="street"
          name="street"
          label="Domicilio"
          value={formik.values.street}
          onChange={formik.handleChange}
          error={formik.touched.street && Boolean(formik.errors.street)}
          helperText={formik.touched.street && formik.errors.street}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="extNumber"
          name="extNumber"
          label="No. exterior"
          value={formik.values.extNumber}
          onChange={formik.handleChange}
          error={formik.touched.extNumber && Boolean(formik.errors.extNumber)}
          helperText={formik.touched.extNumber && formik.errors.extNumber}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="intNumber"
          name="intNumber"
          label="No. interior"
          value={formik.values.intNumber}
          onChange={formik.handleChange}
          error={formik.touched.intNumber && Boolean(formik.errors.intNumber)}
          helperText={formik.touched.intNumber && formik.errors.intNumber}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="suburb"
          name="suburb"
          label="Colonia"
          value={formik.values.suburb}
          onChange={formik.handleChange}
          error={formik.touched.suburb && Boolean(formik.errors.suburb)}
          helperText={formik.touched.suburb && formik.errors.suburb}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="zipcode"
          name="zipcode"
          label="C.P"
          value={formik.values.zipcode}
          onChange={formik.handleChange}
          error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
          helperText={formik.touched.zipcode && formik.errors.zipcode}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="city"
          name="city"
          label="Ciudad"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="state"
          name="state"
          label="Estado"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="phone"
          name="phone"
          label="Celular"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="curp"
          name="curp"
          label="Curp"
          value={formik.values.curp}
          onChange={formik.handleChange}
          error={formik.touched.curp && Boolean(formik.errors.curp)}
          helperText={formik.touched.curp && formik.errors.curp}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="rfc"
          name="rfc"
          label="RFC"
          value={formik.values.rfc}
          onChange={formik.handleChange}
          error={formik.touched.rfc && Boolean(formik.errors.rfc)}
          helperText={formik.touched.rfc && formik.errors.rfc}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="ine"
          name="ine"
          label="INE"
          value={formik.values.ine}
          onChange={formik.handleChange}
          error={formik.touched.ine && Boolean(formik.errors.ine)}
          helperText={formik.touched.ine && formik.errors.ine}
        />
        <TextField
          fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="email"
          name="email"
          label="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mb: 5 }}
        >
          Crear Cliente
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mb: 5 }}
        >
          Agregar Beneficiario
        </Button>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Agregar Tarjeta
        </Button> */}
      </form>
    </Container>
  );
};

export default CrearCliente;
