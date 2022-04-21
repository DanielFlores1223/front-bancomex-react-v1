import { Form, Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { InputLabel, MenuItem,  TextField, Grid } from '@mui/material';
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl';
import {useState } from 'react'
import service from '../../service';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const styles = makeStyles ((theme) =>({
  marginTextField: {
    marginBottom: '1rem',
  },
  marginDiv: {
      margin: '3rem 1rem',
      
  },
}));
 


const validationSchema = Yup.object({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  password: Yup.string(),
  status: Yup.string().required('El estado es obligatorio'),
  role: Yup.string().required('El rol es obligatorio'),
  BusinessUnitId: Yup.number()
});

const CrearEmpleados = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [rol, setRol] = useState ('');
  const [area, setArea] = useState('');
  const [clear, setClear] = useState(false);
  const [res, setRes] = useState({});


  const classes = styles();

const formik = useFormik({
  initialValues:{
    firstName:'',
    lastName:'',
    password:'1234',
    status:'',
    role:'Cajero',
    BusinessUnitId:1
    
  },
  validationSchema:validationSchema,
  onSubmit:(values) => {
    console.log(values);
    createEmployee(values);
    
  }
})

const createEmployee = async ({firstName, lastName,  password, status, role, BusinessUnitId}) =>{
  const {developURL} = service;

  const data = {firstName,lastName, password,status,role,BusinessUnitId }
  console.log('wewe',data)
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
    formik.resetForm()
    setClear(true);
    setRes(jsonResponse.result)
    console.log(jsonResponse.result)






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
      <Grid container
      sx = {{maxWidth:'80%'}}
      mb ={3}          
      >  
              <Grid container 
                  item 
                  xs={1} 
                  md={5} 
                  lg={10} 
                  alignItems="center" 
                  justifyContent='center' 
                  direction='column'
                  mb ={3}
            >
              {!clear ? (
                <form onSubmit={(e)=>{
                  e.preventDefault()
                  console.log(formik.values)
                  formik.handleSubmit()
                }}>  
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
            error={formik.touched.code && Boolean(formik.errors.lastName)}
            helperText={formik.touched.code && formik.errors.lastName}
            disabled={showSpinner}/>

            <label>Status</label>
            <TextField 
            id='status'
            name='status'
            label='status'
            className={classes.marginTextField}
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.status)}
            helperText={formik.touched.code && formik.errors.status}
            disabled={showSpinner}
            />

        <FormControl fullWidth>
        <InputLabel id="role">Rol</InputLabel>
        <Select
          labelId="role"
          value={formik.values.role}
          label="Rol"
          name='role'
          onChange={formik.handleChange}
        >
          <MenuItem value={"Cajero"}>Cajero</MenuItem>
          <MenuItem value={"Gerente"}>Gerente</MenuItem>
          <MenuItem value={"Ejecutivo"}>Ejecutivo</MenuItem>
        </Select>
        </FormControl>

        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Área</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          label="Area"
          onChange={(e)=>{formik.handleChange}}
        >
          <MenuItem value={"caja"}>Caja</MenuItem>
          <MenuItem value={"credito"}>Credito</MenuItem>
          <MenuItem value={"debito"}>Debito</MenuItem>
        </Select>
        </FormControl> */}


            
            <Button   type="submit" variant="contained">Guardar</Button>
            </form>
              ) :<Dialog
              open={true}
            
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Codigo de empleado creado:"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {res.code}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={()=>{
                  setClear(false)
                  setRes({})
                  }
                } autoFocus>
                  Ok
                </Button>
              </DialogActions>
            </Dialog> }
    
            </Grid>
            </Grid>
          </div>
    )
}
export default CrearEmpleados