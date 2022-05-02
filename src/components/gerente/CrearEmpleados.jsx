import { Form, Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core';
import { Box, Grid, Typography, InputLabel, MenuItem,  TextField, Button, Select, FormControl, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {useEffect, useState } from 'react'
import service from '../../service';

import { useSnackbar } from "notistack";



 
const validationSchema = Yup.object({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  role: Yup.string().required('El rol es obligatorio'),
  BusinessUnitId: Yup.number()
});

const CrearEmpleados = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [rol, setRol] = useState ('');
  const [area, setArea] = useState([]);
  const [clear, setClear] = useState(false);
  const [res, setRes] = useState({});

    // Hook de Notistack
    const { enqueueSnackbar } = useSnackbar();

  

const formik = useFormik({
  initialValues:{
    firstName:'',
    lastName:'',
    role:'',
    BusinessUnitId:''
    
  },

  validationSchema:validationSchema,
  onSubmit:(values) => {
    createEmployee(values);
    
  }
})

const createEmployee = async ({firstName, lastName, role, BusinessUnitId}) =>{
  const {developURL} = service;

  const data = {firstName,lastName,role,BusinessUnitId }
  console.log('data',data)
     const url = `${developURL}/employees`;
     const fetchConfig = {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,
          body: JSON.stringify( data )
  }

  try {
    setShowSpinner(true);
    const response = await fetch( url, fetchConfig );
    const jsonResponse = await response.json();
    setShowSpinner(false);

    if( !jsonResponse.success ) {
      enqueueSnackbar("Hubo un error al actualizar la información", {
        preventDuplicate: true,
        variant: "error",
      });
        return;
    }
    formik.resetForm()
    setClear(true);
    setRes(jsonResponse.result)


} catch (error) {
    //Alerta
    enqueueSnackbar("Hubo un error con el servidor intentalo de nuevo", {
      preventDuplicate: true,
      variant: "warning",
    });
}

}

useEffect(()=>{
  async function fetchData() {
    const {developURL} = service;
  const url = `${developURL}/businessunits`;
  const fetchConfig = {
       method: 'GET', 
       headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,   
}

  setShowSpinner(true)
  const response = await fetch( url, fetchConfig );
    const jsonResponse = await response.json();
    console.log(jsonResponse)
    setArea(jsonResponse.result)
    setShowSpinner(false)


}
fetchData()
}, [])


  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={3} >



        <Grid item xs={12} sm={12} mb={3} >
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" color="initial" sx={{ fontWeight: "600" }}>
              Crear Empleado
            </Typography>
          </Box>
        </Grid>

        <Grid container spacing={3} sx={{display: "flex",
    alignItems: "center",
    justifyContent: "center"}}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
          {!clear ? (
            <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formik.values);
              formik.handleSubmit();
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginBottom:'1.5rem'}}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="Nombre"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.firstName)}
                helperText={formik.touched.code && formik.errors.firstName}
                disabled={showSpinner}
              />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginBottom:'1.5rem'}}>

              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Apellido"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.lastName)}
                helperText={formik.touched.code && formik.errors.lastName}
                disabled={showSpinner}
              />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginBottom:'1.5rem'}}>

              <FormControl fullWidth>
                <InputLabel id="role">Rol</InputLabel>
                <Select
                  labelId="role"
                  value={formik.values.role}
                  label="Rol"
                  name="role"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={"Cajero"}>Cajero</MenuItem>
                  <MenuItem value={"Gerente"}>Gerente</MenuItem>
                  <MenuItem value={"Ejecutivo"}>Ejecutivo</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginBottom:'1.5rem'}}>

              <FormControl fullWidth>
                <InputLabel id="BusinessUnitId">Área</InputLabel>
                <Select
                  labelId="BusinessUnitId"
                  id="BusinessUnitId"
                  name="BusinessUnitId"
                  value={formik.values.BusinessUnitId}
                  label="Area"
                  onChange={formik.handleChange}
                >
                  {area &&
                    area.length > 0 &&
                    area.map((a) => {
                      return (
                        <MenuItem key={a.id} value={a.id}>
                          {a.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginBottom:'1.5rem'}}>

              <Button
              type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            marginTop: "1rem",
          }}
        >
          Crear Empleado
        </Button>

              </Grid>
            </form>
          ) : (
            <Dialog
              open={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <Typography variant="h4" color="initial" mb='1rem' sx={{ fontWeight: "600", textAlign:'center' }}>

                {"El codigo de empleado:"}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography variant="h2" color="initial" mb='2rem' sx={{ fontWeight: "600", textAlign:'center' }}>

                  {res.code}
                  </Typography>
                </DialogContentText>
                <DialogContentText>
                  <Typography variant="body1" color="initial" sx={{ fontWeight: "400", textAlign:'center' }}>
                  Utiliza este código como contraseña temporal
                  </Typography>
                </DialogContentText>
                <DialogContentText>
                  <Typography variant="body1" color="initial" sx={{ fontWeight: "400", textAlign:'center' }}>
                  es importante cambiarlo a la brebedad
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                  onClick={() => {
                    setClear(false);
                    setRes({});
                  }}
                  autoFocus
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          )}



        </Grid>
        </Grid>





      </Grid>
    </Box>
  );
}
export default CrearEmpleados