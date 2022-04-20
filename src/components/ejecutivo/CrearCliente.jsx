import React from 'react';
import { Form,Field,Formik } from 'formik';
import {Button, TextField, Container, Box, MenuItem } from '@mui/material';

const currencies = [
  {
    value: 'm',
    label:'Masculino'
  },
  {
    value: 'f',
    label: 'Femenino'
  },{
    value: 'o',
    label: 'Otro'
  },
];

const CrearCliente = () => {
  const [currency, setCurrency] = React.useState('m');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

const sizeforms = "small";

  return (
    <Formik>
      <Container component="main" maxWidth="sm" sx={{mb:8}}>
      <Form>
      <TextField
      fullWidth
          size="${sizeforms}"
          sx={{ mb: 4 }}
          id="nombre"
          name="nombre"
          label="Nombre"
        />
      <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="apellidos"
          name="apellidos"
          label="Apellidos"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="genero"
          select
          label="Género"
          value={currency}
          onChange={handleChange}
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="domicilio"
          name="domicilio"
          label="Domicilio"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="interior"
          name="interior"
          label="No. interior"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="exterior"
          name="exterior"
          label="No. exterior"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="colonia"
          name="colonia"
          label="Colonia"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="cp"
          name=""
          label="C.P"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="ciudad"
          name="ciudad"
          label="Ciudad"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="estado"
          name="estado"
          label="Estado"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="celular"
          name="celular"
          label="Celular"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="curp"
          name="curp"
          label="Curp"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="rfc"
          name="rfc"
          label="RFC"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="ine"
          name="ine"
          label="INE"
        />
        <TextField
      fullWidth
          size="medium"
          sx={{ mt: 0, mb: 5 }}
          id="email"
          name="email"
          label="Correo electrónico"
        />
        <label>Status</label>
        <Field type="checkbox"/><label>Activo</label>
        <Field type="checkbox"/><label>Inactivo</label>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </Form>

      </Container>
    </Formik>
  )
}

export default CrearCliente