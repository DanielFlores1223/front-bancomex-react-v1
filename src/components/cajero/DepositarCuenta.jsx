import React from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import { Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import * as Yup from 'yup';
import {useState} from 'react';
import { Alert } from '@mui/material';
import Spinner from '../common/spinner/Spinner';
import service from '../../service';

const styles = makeStyles((theme) => ({
  marginTextField: {
    marginBottom: '1rem',
  },
  marginDiv: {
      padding: '1rem 5rem',
      maxHeight: '100vh',
  },
  alert: {
      maxWidth: '100%',
      marginBottom: '2rem'
  },
  formDepositar: {
      padding: '2rem 4rem',
      border: '2px solid #F8F9F9',
      borderRadius: '10px',
      background: '#F8F9F9',
      maxHeight: '100%',
  }

}));

const validationSchema = Yup.object({
  accountNumber: Yup
    .number()
    .required('El número de cuenta es obligatorio'),
  customerName: Yup
    .string()
    .required('El nombre del cliente es obligatorio'),
  amountDeposit: Yup
    .number()
    .required('La cantidad a depositar es obligatoria'),
});

const DepositarCuenta = () => {

  const [showSpinner, setShowSpinner] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState('');

  const classes = styles();

  const formik = useFormik({
    initialValues: {
      accountNumber: '',
      customerName: '',
      amountDeposit: ''
        
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        depositarCuenta(values);
    }
  }) 
  
  const depositarCuenta = async ({ accountNumber, customerName, amountDeposit}) => {
    
    const data = { accountNumber, customerName, amountDeposit}
    //const url = `${developURL}/employees/login`;
    const fetchConfig = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': token} ,
        body: JSON.stringify( data )
    }

    try {
      setShowSpinner(true);
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      setShowSpinner(false);

      if( !jsonResponse.success ) {
          setErrorExist(true);
          setMsgError('Revise que los datos ingresados sean correctos'); //Ejemplo: no se encontró el número de cuenta

          setTimeout(() => {
            setErrorExist(false);
            setMsgError('');
          }, 4000);

          return;
      }

    } catch (error) {
      //Alerta
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false); 
        setErrorExist(true);
        setMsgError('Algo salio mal... Intentelo mas tarde'); 
      }, 2000);

      setTimeout(() => {
        setErrorExist(false);
        setMsgError('');
      }, 4000);
    }
  }

  return(
    <div>
      <Grid container>
        <Grid container 
          item 
          xs={12} 
          md={5} 
          lg={5} 
          alignItems="center" 
          justifyContent='center' 
          direction='column'
        >
          <form onSubmit={formik.handleSubmit} className={classes.formDepositar}>
            {errorExist && (<Alert className={classes.alert} severity="error" fullWidth> {msgError} </Alert>)}
            <Typography align="center" variant="h4" className={classes.marginTextField}>
              Depositar a Cuenta
            </Typography>
            <TextField
              fullWidth
              id='accountNumber'
              name='accountNumber'
              label='Número de Cuenta'
              className={classes.marginTextField}
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
              helperText={formik.touched.accountNumber && formik.errors.accountNumber}
              disabled={showSpinner}
            />
            <TextField
              fullWidth
              id='customerName'
              name='customerName'
              label='Nombre del Cliente'
              className={classes.marginTextField}
              value={formik.values.customerName}
              onChange={formik.handleChange}
              error={formik.touched.customerName && Boolean(formik.errors.customerName)}
              helperText={formik.touched.customerName && formik.errors.customerName}
              disabled={showSpinner}
            />
            <TextField
              fullWidth
              id='amountDeposit'
              name='amountDeposit'
              label='Cantidad a Depositar'
              className={classes.marginTextField}
              value={formik.values.amountDeposit}
              onChange={formik.handleChange}
              error={formik.touched.amountDeposit && Boolean(formik.errors.amountDeposit)}
              helperText={formik.touched.amountDeposit && formik.errors.amountDeposit}
              disabled={showSpinner}
            />
            <Button color="primary" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
            >
              Depositar
            </Button>
          </form> 
        </Grid>
      </Grid>
    </div>
  )
}

export default DepositarCuenta
/** 
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

//Agregar un toast al momento de dar click en depositar: deposito exitoso o no exitoso
//se limpiara el formulario
const DepositarCuenta = () => {
  return (
    <Formik>
        <Form>
            <label>Numero de Cuenta</label>
            <Field type="number"/>
            <label>Nombre del cliente</label>
            <Field type="text"/>
            <label>Cantidad a depositar:</label>
            <Field type="number"/>
            <Button variant="contained">Depositar</Button>
        </Form>
    </Formik>
  )
}

export default DepositarCuenta */