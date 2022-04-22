import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import { Alert, Snackbar, Button } from '@mui/material';
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

const validationSchemaFindAccount = Yup.object({
  accountNumber: Yup
    .number()
    .typeError('Necesitas agregar un numero de cuenta')
    .required('El número de cuenta es obligatorio')
});

const validationSchemaDeposit = Yup.object({
  accountNumber: Yup
    .number()
    .typeError('Necesitas agregar un numero de cuenta')
    .required('El número de cuenta es obligatorio'),
  customerFirstName: Yup
    .string()
    .required('El nombre es obligatorio'),
  customerLastName: Yup
    .string()
    .required('El apellido es obligatorio'),
  amountDeposit: Yup
    .number()
    .typeError('Necesitas agregar una cantidad numerica')
    .min(1, 'El monto debe ser mayor a 0')
    .required('La cantidad a depositar es obligatoria'),
});

const DepositarCuenta = () => {

  const [showSpinner, setShowSpinner] = useState(false);
  const [canDeposit, setCanDeposit] = useState(false);
  const [msg, setMsg] = useState({show:false, txt:null, type:null});

  const classes = styles();

  const formikFindAccount = useFormik({
    initialValues: {
      accountNumber: ''
        
    },
    validationSchema: validationSchemaFindAccount,
    onSubmit: (values, {resetForm}) => {
        findAccount(values, resetForm);
        //resetForm();
    }
  })

  const formikDeposit = useFormik({
    initialValues: {
      accountNumber: '',
      customerFirstName: '',
      customerLastName: '',
      amountDeposit: ''
        
    },
    validationSchema: validationSchemaDeposit,
    onSubmit: (values, {resetForm}) => {
        depositarCuenta(values, resetForm);
    }
  })

  const changeMsg = (type, txt) => {

    setTimeout(() => {
      setMsg({ show: true, type, txt});
    }, 0);
    setTimeout(() => {
      setMsg({...msg, show: false});
    }, 3000);

  }

  const findAccount = async ({accountNumber}, resetForm) => {
    const { developURL } = service
    const token = localStorage.getItem('t')
    const url = `${developURL}/accounts/byClient/${accountNumber}`
    const fetchConfig = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json', 'Authorization': token}
    }

    try {
      setShowSpinner(true);
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      setShowSpinner(false);
      console.log(jsonResponse)
      if( !jsonResponse.success ) {
        changeMsg('error','No se encontró una cuenta');
        return;
      }
      let account = jsonResponse.result
      if(!account.state){
        changeMsg('error', 'La cuenta se encuentra desactivada')
      }else if(!account.Client.active){
        changeMsg('error', 'El cliente se encuentra desactivada')
      }else{
        formikDeposit.values.accountNumber = accountNumber
        formikDeposit.values.customerFirstName = account.Client.firstName
        formikDeposit.values.customerLastName = account.Client.lastName
        setCanDeposit(true);
        resetForm();
      }
    } catch (error) {
      setShowSpinner(false);
      changeMsg('error','Algo salio mal... Intentelo mas tarde!');
    }
  }
  
  const depositarCuenta = async ({ accountNumber, amountDeposit}, resetForm) => {
    const { developURL } = service
    const token = localStorage.getItem('t')
    const data = { id:accountNumber, amountDeposit}
    const url = `${developURL}/accounts/deposit`
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
        changeMsg('error','Los datos proporcionados son incorrectos');
      }else{
        changeMsg('success', 'Se realizó el deposito')
      }
    } catch (error) {
      setShowSpinner(false);
      changeMsg('error','Algo salio mal... Intentelo mas tarde!');
    }
    setCanDeposit(false)
    resetForm()
    formikFindAccount.values.accountNumber = ''
  }

  const handleChangeAccount = (event) => {
    formikFindAccount.values.accountNumber = event.target.value
    setCanDeposit(false);
  };

  return(
        <Grid container 
          item 
          xs={12} 
          md={12} 
          lg={12} 
          alignItems="center" 
          justifyContent='center' 
          direction='column'
        >
          {canDeposit?
          (<form onSubmit={formikDeposit.handleSubmit} className={classes.formDepositar}>
            <Typography align="center" variant="h4" className={classes.marginTextField}>
              Depositar a Cuenta
            </Typography>
            <TextField
              fullWidth
              id='accountNumber'
              name='accountNumber'
              label='Número de Cuenta'
              className={classes.marginTextField}
              value={formikDeposit.values.accountNumber}
              onChange={handleChangeAccount}
              error={formikDeposit.touched.accountNumber && Boolean(formikDeposit.errors.accountNumber)}
              helperText={formikDeposit.touched.accountNumber && formikDeposit.errors.accountNumber}
              disabled={showSpinner}
            />
            <Grid container>
            <Grid
            xs={12} 
            md={6} 
            lg={6} > 
              <TextField
                fullWidth
                disabled
                id='customerFirstName'
                name='customerFirstName'
                label='Nombre'
                className={classes.marginTextField}
                value={formikDeposit.values.customerFirstName}
                onChange={formikDeposit.handleChange}
                error={formikDeposit.touched.customerFirstName && Boolean(formikDeposit.errors.customerFirstName)}
                helperText={formikDeposit.touched.customerFirstName && formikDeposit.errors.customerFirstName}
              />
            </Grid>
            <Grid
            xs={12} 
            md={6} 
            lg={6} > 
              <TextField
                fullWidth
                disabled
                id='customerLastName'
                name='customerLastName'
                label='Apellido'
                className={classes.marginTextField}
                value={formikDeposit.values.customerLastName}
                onChange={formikDeposit.handleChange}
                error={formikDeposit.touched.customerLastName && Boolean(formikDeposit.errors.customerLastName)}
                helperText={formikDeposit.touched.customerLastName && formikDeposit.errors.customerLastName}
              />
            </Grid>
            </Grid>
            <TextField
              fullWidth
              id='amountDeposit'
              name='amountDeposit'
              label='Cantidad a Depositar'
              className={classes.marginTextField}
              value={formikDeposit.values.amountDeposit}
              onChange={formikDeposit.handleChange}
              error={formikDeposit.touched.amountDeposit && Boolean(formikDeposit.errors.amountDeposit)}
              helperText={formikDeposit.touched.amountDeposit && formikDeposit.errors.amountDeposit}
              disabled={showSpinner}
            />
            <Button color="primary" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
            >
              Depositar
            </Button>

            {showSpinner && <Spinner />} 

            
            {msg.show && (<Alert className={classes.alert} severity={msg.type} fullWidth> {msg.txt} </Alert>)}

            <Snackbar 
            open={msg.show} 
            severity={msg.type}
            message={msg.txt}>
            </Snackbar>

          </form>):
           (<form onSubmit={formikFindAccount.handleSubmit} className={classes.formDepositar}>
            <Typography align="center" variant="h4" className={classes.marginTextField}>
              Buscar Cuenta
            </Typography>
            <TextField
              fullWidth
              id='accountNumber'
              name='accountNumber'
              label='Número de Cuenta'
              className={classes.marginTextField}
              value={formikFindAccount.values.accountNumber}
              onChange={formikFindAccount.handleChange}
              error={formikFindAccount.touched.accountNumber && Boolean(formikFindAccount.errors.accountNumber)}
              helperText={formikFindAccount.touched.accountNumber && formikFindAccount.errors.accountNumber}
              disabled={showSpinner}
            />
            <Button color="primary" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
            >
              Buscar
            </Button>

            {showSpinner && <Spinner />} 

            
            {msg.show && (<Alert className={classes.alert} severity={msg.type} fullWidth> {msg.txt} </Alert>)}

            <Snackbar 
            open={msg.show} 
            severity={msg.type}
            message={msg.txt}>
            </Snackbar>

          </form>)}
        </Grid>
  )
}

export default DepositarCuenta
