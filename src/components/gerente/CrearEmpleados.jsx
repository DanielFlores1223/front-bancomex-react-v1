import { Form, Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import { InputLabel, MenuItem,  TextField, Grid } from '@mui/material';
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl';
import {useEffect, useState } from 'react'
import service from '../../service';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const styles = makeStyles ((theme) =>({
  marginTextField: {
    
  },
  marginDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  
  },
  formEmployee: {
    display:"flex",
    width:"85%",
    flexDirection:"column",
    padding: '2rem 4rem',
    border: '2px solid #F8F9F9',
    borderRadius: '10px',

    maxHeight: '100%',
    gap:"1rem"
},



}));
 
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

  
const classes = styles();

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
    
    <div className={classes.marginDiv}>
      
     
         <Grid container 
                  item 
                  xs={12} 
                  md={5} 
                  lg={5} 
                  direction='column'
                  alignItems="center" 
                  justifyContent='center' 
                 
            >
              {!clear ? (
                <form onSubmit={(e)=>{
                  e.preventDefault()
                  console.log(formik.values)
                  formik.handleSubmit()
                }}
                className={classes.formEmployee}
                >  
            
            <h1 align = 'center'>Crear Empleado</h1>
            <TextField
            fullWidth
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
            fullWidth
            id='lastName'
            name='lastName'
            label='Apellido'
            className={classes.marginTextField}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.lastName)}
            helperText={formik.touched.code && formik.errors.lastName}
            disabled={showSpinner}/>

            
        <FormControl fullWidth>
        <InputLabel id="role">Rol</InputLabel>
        <Select
          labelId="role"
          value={formik.values.role}
          label="Rol"
          name='role'
          className={classes.marginTextField}
          onChange={formik.handleChange}
        >
          <MenuItem value={"Cajero"}>Cajero</MenuItem>
          <MenuItem value={"Gerente"}>Gerente</MenuItem>
          <MenuItem value={"Ejecutivo"}>Ejecutivo</MenuItem>
        </Select>
        </FormControl>

        <FormControl fullWidth>
        <InputLabel id="BusinessUnitId">Área</InputLabel>
        <Select
          labelId="BusinessUnitId"
          id="BusinessUnitId"
          className={classes.marginTextField}
          name="BusinessUnitId"
          value={formik.values.BusinessUnitId}
          label="Area"
          onChange={formik.handleChange}
        >
          {area && area.length >0 && area.map((a)=>{
            return (
                <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
            )
          } )}
        </Select>
        </FormControl> 
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
                <DialogContentText>
                  Utiliza este código como contraseña temporal
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
          </div>
    )
}
export default CrearEmpleados