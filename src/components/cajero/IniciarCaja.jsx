import { Grid, TextField, Button, makeStyles } from '@material-ui/core'
import {useState,  useEffect} from 'react'
import service from '../../service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCashBoxId, generateId } from '../common/functions/general';
import ImgCash from '../../img/money.png'
import Spinner from '../common/spinner/Spinner';

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
  marginLogo: {
      marginBottom: '1.5rem',
  },
  formInit: {
      padding: '2rem 4rem',
      border: '2px solid #F8F9F9',
      borderRadius: '10px',
      background: '#F8F9F9',
      maxHeight: '100%',
      borderTop: '10px solid #103160',
  },
  divInit: {
    maxHeight: '100%',
    height: '20rem',
  }

}));

const validationSchema = Yup.object({
  totalStart: Yup
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .positive('Cantidad no valida')
          .min(0, 'La cantidad ingresada debe ser mayor o igual 0')
});

const IniciarCaja = ({setStartCash}) => {

  const [showSpinner, setShowSpinner] = useState(false);
  const classes = styles();
  const formik = useFormik({
    initialValues: {
        totalStart: ''
    },
    validationSchema,
    onSubmit: (values) =>{
      createCashCutOf(values);
    }
  })

  const createCashCutOf = async( values ) => {
    const { developURL } = service;
    
    values.CashBoxId = getCashBoxId();
    const data = { ...values }
    const url = `${developURL}/cashcutoff`;
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
             return;
         }

         //cash cut off -> id
         localStorage.setItem('ccbo', generateId(jsonResponse.result.id));
         setStartCash('ready');
    } catch (error) {
       console.log(error)
    }
    
  }


  return (
    <div >
       { showSpinner ? 
            (<Grid container 
                    item xs={12} 
                    alignItems='center' 
                    justifyContent='center'
              >    
                  <Spinner /> 
              </Grid>) : 
              (
        <Grid container 
              item 
              xs={12} 
              alignItems='center' 
              justifyContent='center' 
              className={classes.divInit}
         >
            <form onSubmit={formik.handleSubmit} className={classes.formInit}>
                <Grid container justifyContent='center'>
                  <img src={ImgCash} style={{width: '10rem'}} />
                </Grid>
                <TextField 
                        fullWidth
                        id='totalStart'
                        name='totalStart'
                        label='Cantidad de Efectivo inicial en la caja'
                        className={classes.marginTextField}
                        value={formik.values.totalStart}
                        onChange={formik.handleChange}
                        error={formik.touched.totalStart && Boolean(formik.errors.totalStart)}
                        helperText={formik.touched.totalStart && formik.errors.totalStart}
                  />
                  <Button color="primary" 
                            variant="contained" 
                            fullWidth 
                            type="submit"
                    >
                        Iniciar Caja
                    </Button>   
            </form>

        </Grid>
              )}
    </div>
  )
}

export default IniciarCaja