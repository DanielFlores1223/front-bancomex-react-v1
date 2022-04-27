import {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Grid, TextField, Button, makeStyles, Box, Typography } from '@material-ui/core'
import { getCCBCOId, getCashBoxId } from '../common/functions/general'
import { useNavigate } from 'react-router-dom'
import ImgBill from '../../img/moneyBill.png'
import ImgCoins from '../../img/coins.png'
import service from '../../service';
import Spinner from '../common/spinner/Spinner';

const styles = makeStyles((theme) => ({
     formBM: {
          maxWidth: '100%',
          width: '45rem',
          padding: '2rem',
          background: '#F8F9F9',
          borderRadius: '10px'
     },
     showMoney: {
          background: '#103160',
          color: 'white',
          padding: '0.5rem 1rem',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'

     }
}));

const validationSchema = Yup.object({
     B1000:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     B500:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     B200:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     B100:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),          
     B50:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     B20:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     M10:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     M5:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     M2:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     M1:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
     M50C:Yup 
          .number()
          .required('Este campo es obligatorio')
          .typeError('La información contenida en este campo debe ser de tipo númerico')
          .integer('Debe ser un número entero')
          .positive('Número no valido')
          .min(0, 'El valor debe ser mayor o igual a cero'),
});

const HacerCorte = ({setLoginSuccess, setRole}) => {
   
   const [totalEnd, setTotalEnd] = useState(0);
   const classes = styles();  
   const navigateTo = useNavigate();
   const [showSpinner, setShowSpinner] = useState(false);

   const formik = useFormik({
     initialValues: {
          B1000:'',
          B500:'',
          B200:'',
          B100:'',          
          B50:'',
          B20:'',
          M10:'',
          M5:'',
          M2:'',
          M1:'',
          M50C:'',
     },
     validationSchema,
     onSubmit: (values) =>{
          registerCashCutOff(values)
     }
   }); 

   const registerCashCutOff = async ( values ) => {
          const { developURL } = service;
          const CashCutOffId = Number(getCCBCOId()); 
          const url = `${developURL}/denominationchascutoff`;

          setShowSpinner(true);
          try {
               for (const key in values) {
               
                    const data = { 
                         amount: values[key],
                         denomination: key,
                         CashCutOffId
                    }
               
                    console.log(JSON.stringify(data))
                    const fetchConfig = {
                         method: 'POST', 
                         headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,
                         body: JSON.stringify( data )
                    }  

                    const response = await fetch(url, fetchConfig);
                    const responseJSON = await response.json();
                    console.log(responseJSON)
               }
          
               await freeCashBox();     

               setShowSpinner(false);
          } catch (error) {

          }
     
   }

   const freeCashBox = async() => {

     try {
          await changeSatateCashBox();
          await getCashInfo();
          closeSession();
     } catch (error) {
          throw 'Error! in freeCashBox'
     }
     
   }

   const changeSatateCashBox = async () => {
     try {
            
          const { developURL } = service;

          const data = { status: true }
          const url = `${developURL}/cashboxes/${getCashBoxId()}`;
          const fetchConfig = {
             method: 'PUT', 
             headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t') },
             body: JSON.stringify( data )
          }
    
          const response = await fetch(url, fetchConfig);
          const jsonResponse = await response.json();

          if(!jsonResponse.success) {
            return false;
          }

          return true;
        } catch (error) {
          throw 'Error! in change state cash box'
        }
   }

   const getCashInfo = async () => {
     try {
       const { developURL } = service;
       const url = `${developURL}/cashcutoff/getAllInfo/${getCCBCOId()}`;
       const fetchConfig = {
          method: 'GET', 
          headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t') } ,
       }

       const response = await fetch(url, fetchConfig);
       const jsonResponse = await response.json();

       if(!jsonResponse.success) {
        return false;
      }
      
      await updateCashCutOff(jsonResponse.result.totalStart);

      return true;
     } catch (error) {
       throw 'Error in getCashInfo()'
     }
   }

   const updateCashCutOff = async (startValue) =>{
     try {
          
          const d = Math.sign(totalEnd - startValue) === -1 ? (totalEnd - startValue) * -1 : (totalEnd - startValue)
          const { developURL } = service;
          const data = { totalEnd, differences : d }
          
          const url = `${developURL}/cashcutoff/${getCCBCOId()}`;
          const fetchConfig = {
             method: 'PUT', 
             headers: { 'Content-Type': 'application/json', 'Authorization':  localStorage.getItem('t') },
             body: JSON.stringify( data )
          }
    
          const response = await fetch(url, fetchConfig);
          const jsonResponse = await response.json();

          if(!jsonResponse.success) {
            return false;
          }

          return true;
        } catch (error) {
          throw 'Error! in updateCashCutOff()'
        }
   }

   const closeSession = () => {
    localStorage.clear();
    setLoginSuccess(false);
    setRole('');
    navigateTo('/');
  }

  //get total amount
   const { B1000, B500, B200, B100, B50, B20, M10, M5, M2, M1, M50C  } = formik.values;
   useEffect(() => {
     
     const v1000 = B1000 * 1000;
     const v500 = B500 * 500;
     const v200 = B200 * 200;
     const v100 = B100 * 100;
     const v50 = B50 * 50;
     const v20 = B20 * 20;
     const v10 = M10 * 10;
     const v5 = M5 * 5;
     const v2 = M2 * 2;
     const v1 = M1 * 1;
     const v50c = M50C * 0.50;

     setTotalEnd( v1000 + v500 + v200 + v100 + v50 + v20 + v10 + v5 + v2 + v1 + v50c );

   }, [B1000, B500, B200, B100, B50, B20, M10, M5, M2, M1, M50C ])

  return (
    <div>
         { showSpinner ? ( 
          <Grid constainer justifyContent='center'>
                <Spinner /> 
          </Grid>) :
          (
         <>
         <Grid container justifyContent='center'>
              <div className={classes.showMoney}>
                    <Typography variant='h4'>
                          {totalEnd < 0 ? 'Valor no valido': `$${totalEnd} MXN`}
                    </Typography>
               </div>
         </Grid>
        <Grid container justifyContent='center'>
           <form onSubmit={formik.handleSubmit} className={classes.formBM}>
             <Grid container alignItems='center'>

                  <img src={ImgBill} alt='bill' style={{marginRight: '1rem'}} />
                  <Typography variant='h5'>
                      Billetes
                  </Typography>
             </Grid>
             
             <Grid container
                   spacing={2}
                   item 
                   xs={12}
             >
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='B1000'
                            name='B1000'
                            label='Billetes 1000 pesos'
                            value={formik.values.B1000}
                            onChange={formik.handleChange}
                            error={formik.touched.B1000 && Boolean(formik.errors.B1000)}
                            helperText={formik.touched.B1000 && formik.errors.B1000}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='B500'
                            name='B500'
                            label='Billetes 500 pesos'
                            value={formik.values.B500}
                            onChange={formik.handleChange}
                            error={formik.touched.B500 && Boolean(formik.errors.B500)}
                            helperText={formik.touched.B500 && formik.errors.B500}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='B200'
                            name='B200'
                            label='Billetes 200 pesos'
                            value={formik.values.B200}
                            onChange={formik.handleChange}
                            error={formik.touched.B200 && Boolean(formik.errors.B200)}
                            helperText={formik.touched.B200 && formik.errors.B200}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='B100'
                            name='B100'
                            label='Billetes 100 pesos'
                            value={formik.values.B100}
                            onChange={formik.handleChange}
                            error={formik.touched.B100 && Boolean(formik.errors.B100)}
                            helperText={formik.touched.B100 && formik.errors.B100}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='B50'
                            name='B50'
                            label='Billetes 50 pesos'
                            value={formik.values.B50}
                            onChange={formik.handleChange}
                            error={formik.touched.B50 && Boolean(formik.errors.B50)}
                            helperText={formik.touched.B50 && formik.errors.B50}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='B20'
                            name='B20'
                            label='Billetes 20 pesos'
                            value={formik.values.B20}
                            onChange={formik.handleChange}
                            error={formik.touched.B20 && Boolean(formik.errors.B20)}
                            helperText={formik.touched.B20 && formik.errors.B20}
                            type='number'
                       />
                  </Grid>
             </Grid>   

             <Grid container alignItems='center' style={{marginTop:'2rem'}}>
                  <img src={ImgCoins} alt='coins' style={{marginRight: '1rem'}} />
                  <Typography variant='h5'>
                      Monedas
                  </Typography>
             </Grid>
             {/*Monedas*/}
             <Grid container
                   spacing={2}
                   item 
                   xs={12}
             >    

                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='M10'
                            name='M10'
                            label='Monedas 10 pesos'
                            value={formik.values.M10}
                            onChange={formik.handleChange}
                            error={formik.touched.M10 && Boolean(formik.errors.M10)}
                            helperText={formik.touched.M10 && formik.errors.B200}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='M5'
                            name='M5'
                            label='Monedas 5 pesos'
                            value={formik.values.M5}
                            onChange={formik.handleChange}
                            error={formik.touched.M5 && Boolean(formik.errors.M5)}
                            helperText={formik.touched.M5 && formik.errors.M5}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={4}
                  >
                       <TextField 
                            fullWidth
                            id='M2'
                            name='M2'
                            label='Monedas 2 pesos'
                            value={formik.values.M2}
                            onChange={formik.handleChange}
                            error={formik.touched.M2 && Boolean(formik.errors.M2)}
                            helperText={formik.touched.M2 && formik.errors.M2}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={6}
                  >
                       <TextField 
                            fullWidth
                            id='M1'
                            name='M1'
                            label='Monedas 1 peso'
                            value={formik.values.M1}
                            onChange={formik.handleChange}
                            error={formik.touched.M1 && Boolean(formik.errors.M1)}
                            helperText={formik.touched.M1 && formik.errors.M1}
                            type='number'
                       />
                  </Grid>
                  <Grid container
                        item 
                        xs={12}
                        md={6}
                  >
                       <TextField 
                            fullWidth
                            id='M50C'
                            name='M50C'
                            label='Monedas 50 centavos'
                            value={formik.values.M50C}
                            onChange={formik.handleChange}
                            error={formik.touched.M50C && Boolean(formik.errors.M50C)}
                            helperText={formik.touched.M50C && formik.errors.M50C}
                            type='number'
                       />
                  </Grid>
             </Grid>   

             <Box mt={3}>
             <Button color="primary" 
                       variant="contained" 
                       fullWidth 
                       type="submit"
                       style={{marginTop:'2rem'}}
             >
                       Hacer Corte
             </Button> 
             </Box>
          </form>
       </Grid> </> )
     }
    </div>
  )
}

export default HacerCorte