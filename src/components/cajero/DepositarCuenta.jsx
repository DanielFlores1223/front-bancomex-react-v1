import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import { Alert, Snackbar, Button } from '@mui/material';
import Spinner from '../common/spinner/Spinner';
import { getCashBoxId } from '../common/functions/general'
import service from '../../service';
import { useSnackbar } from "notistack";
import NumberFormat from 'react-number-format';


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
  cardNumber: Yup
    .number()
    .typeError('Necesitas agregar un numero de cuenta')
    .required('El número de cuenta es obligatorio')
});

const validationSchemaDeposit = Yup.object({
  cardNumber: Yup
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
  const { enqueueSnackbar } = useSnackbar();


  const classes = styles();

  const formikFindAccount = useFormik({
    initialValues: {
      cardNumber: ''
        
    },
    validationSchema: validationSchemaFindAccount,
    onSubmit: (values, {resetForm}) => {
        findAccount(values, resetForm);
        //resetForm();
    }
  })

  const formikDeposit = useFormik({
    initialValues: {
      cardNumber: '',
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

  const findAccount = async ({cardNumber}, resetForm) => {
    const { developURL } = service
    const token = localStorage.getItem('t')
    const url = `${developURL}/cards/byCardNumber/${cardNumber}`
    const fetchConfig = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json', 'Authorization': token}
    }

    try {
      setShowSpinner(true);
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      setShowSpinner(false);
      if( !jsonResponse.success ) {
        enqueueSnackbar("No se encontro ningun numero de cuenta con esta información", {
          preventDuplicate: true,
          variant: "error",
        });
        return;
      }
      let data = jsonResponse.result
      if(!data.Account.state){
        enqueueSnackbar("La cuenta se encuentra desactivada", {
          preventDuplicate: true,
          variant: "warning",
        });
        // changeMsg('error', 'La cuenta se encuentra desactivada')
      }else if(!data.Account.Client.active){
        enqueueSnackbar("El cliente se encuentra desactivada", {
          preventDuplicate: true,
          variant: "warning",
        });
        // changeMsg('error', 'El cliente se encuentra desactivada')
      }else{
        formikDeposit.values.cardNumber = cardNumber
        formikDeposit.values.customerFirstName = data.Account.Client.firstName
        formikDeposit.values.customerLastName = data.Account.Client.lastName
        setCanDeposit(true);
        resetForm();
      }
    } catch (error) {
      setShowSpinner(false);
      enqueueSnackbar("Hubo un error con el servidor intentalo de nuevo", {
        preventDuplicate: true,
        variant: "warning",
      });
      // changeMsg('error','Algo salio mal... Intentelo mas tarde!');
    }
  }


  
  const depositarCuenta = async ({ cardNumber, amountDeposit}, resetForm) => {
    const { developURL } = service
    const token = localStorage.getItem('t')
    const data = { cardNumber, amount:amountDeposit, type:'Depositar', box:getCashBoxId()}
    const url = `${developURL}/transactions`
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
    formikFindAccount.values.cardNumber = ''
  }

  const handleChangeAccount = (event) => {
    formikFindAccount.values.cardNumber = event.target.value
    setCanDeposit(false);
  };

  // funcion react number format
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  return(
        <Grid container 
          item 
          xs={12} 
          md={12} 
          lg={12} 
          alignItems="center"
          direction='column'
        >
          {canDeposit?
          (<form onSubmit={formikDeposit.handleSubmit} className={classes.formDepositar}>
            <Typography align="center" variant="h4" className={classes.marginTextField}>
              Depositar a Cuenta
            </Typography>
            <TextField
              fullWidth
              id='cardNumber'
              name='cardNumber'
              label='Número de Tarjeta'
              className={classes.marginTextField}
              value={formikDeposit.values.cardNumber}
              onChange={handleChangeAccount}
              error={formikDeposit.touched.cardNumber && Boolean(formikDeposit.errors.cardNumber)}
              helperText={formikDeposit.touched.cardNumber && formikDeposit.errors.cardNumber}
              disabled={showSpinner}
            />
            <Grid container>
            <Grid item
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
            <Grid item
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
            <Button color="primary" sx={{bgcolor:'#103160'}}
                    variant="contained" 
                    fullWidth 
                    type="submit"
            >
              Depositar
            </Button>

            {showSpinner && <Spinner />} 

            
            {msg.show && (<Alert className={classes.alert} severity={msg.type}> {msg.txt} </Alert>)}

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
              id='cardNumber'
              name='cardNumber'
              label='Número de Tarjeta'
              className={classes.marginTextField}
              value={formikFindAccount.values.cardNumber}
              onChange={formikFindAccount.handleChange}
              error={formikFindAccount.touched.cardNumber && Boolean(formikFindAccount.errors.cardNumber)}
              helperText={formikFindAccount.touched.cardNumber && formikFindAccount.errors.cardNumber}
              disabled={showSpinner}
            />
            <Button color="primary" sx={{bgcolor:'#103160'}}
                    variant="contained" 
                    fullWidth 
                    type="submit"
            >
              Buscar
            </Button>

            {showSpinner && <Spinner />} 

            
            {msg.show && (<Alert className={classes.alert} severity={msg.type}> {msg.txt} </Alert>)}

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
