import React, { useState } from 'react';
import { Form,Field,Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';


const styles = makeStyles ((theme) =>({
  marginTextField: {
    marginBottom: '1rem',
  },
  marginDiv: {
      margin: '3rem 1rem'
  },
}));
 


const validationSchema = Yup.object({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
  status: Yup.string().required('El estado es obligatorio'),
  role: Yup.string().required('El rol es obligatorio'),
  BusinessUnitId: Yup.number().required('Requerido')
});

const CrearEmpleados = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState('');


  const classes = styles();

const formik = useFormik({
  initialValues:{
    firstName:'',
    lastName:'',
    code:'',
    password:'',
    status:'',
    role:'',
    businessUnitId:''
    
  },
  validationSchema:validationSchema,
  onsubmit:(values) => {
    createEmployee(values);
    
  }
})

const createEmployee = async ({firstName, lastName, code, password, status, role, businessUnitId}) =>{
  const {developURL} = service;

  const data = {firstName,lastName,code,password,status,role,businessUnitId }
     const url = `${developURL}/employees`;
     const fetchConfig = {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json'} ,
          body: JSON.stringify( data )
  }

  try {
    setShowSpinner(true);
    const response = await fetch( url, fetchConfig );
    const jsonResponse = await response.json();
    setShowSpinner(false);

    if( !jsonResponse.success ) {
        setErrorExist(true);
        setMsgError('Algo salio mal...');

        setTimeout(() => {
          setErrorExist(false);
          setMsgError('');
        }, 4000);

        return;
    }

    


} catch (error) {
    //Alerta
    setShowSpinner(true);
    console.log(error)
    setErrorExist(true);
    setMsgError('Algo salio mal... Intentelo mas tarde');

    setTimeout(() => {
      setErrorExist(false);
      setMsgError('');
    }, 4000);
}


}

  return (
    <div className={classes.marginDiv}>
      <Grid container>
            <Grid container 
                  item 
                  xs={5} 
                  md={1} 
                  lg={3} 
                  alignItems="center" 
                  justifyContent='center'
            >
              </Grid>
              <Grid container 
                  item 
                  xs={1} 
                  md={5} 
                  lg={2} 
                  alignItems="center" 
                  justifyContent='center' 
                  direction='column'
            >
    <form onSubmit={formik.handleSubmit}>  
            {/* <label>Nombre(s)</label> */}
            <TextField
            id='firstName'
            name='firstName'
            label='Nombre'
            className={classes.marginTextField}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.firstName)}
            helperText={formik.touched.code && formik.errors.firstName}
            disabled={showSpinner}/>

            <TextField 
            id='lastName'
            name='lastName'
            label='lastName'
            className={classes.marginTextField}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.firstName)}
            helperText={formik.touched.code && formik.errors.firstName}
            disabled={showSpinner}/>

            <label>Status</label>
            <TextField type = "text"/>
            {/* <label>Rol</label>
            
            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.role}
    label="Rol"
    className={classes.marginTextField}
    onChange={formik.handleChange}
  >
    <MenuItem value={"10"}>Ten</MenuItem>
    <MenuItem value={"20"}>Twenty</MenuItem>
    <MenuItem value={"30"}>Thirty</MenuItem>
  </Select>
  

  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.businessUnitId}
    label="Área"
    onChange={formik.handleChange}
  >
    <MenuItem value={"caja"}>Caja</MenuItem>
    <MenuItem value={"credito"}>Credito</MenuItem>
    <MenuItem value={"debito"}>Debito</MenuItem>
  </Select> */}
            
            <Button variant="contained">Guardar</Button>
            </form>
            </Grid>
            </Grid>
          </div>
    )
}
export default CrearEmpleados