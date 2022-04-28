import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styled from '@emotion/styled'
import { generateIdentify } from '../common/functions/general'
import service from '../../service'
import ClearIcon from '@material-ui/icons/Clear'

const FormAvales = styled.form`
     padding: 3rem 3rem;
`;

const DivAvales = styled.div`
     padding: 1.5rem 3rem;
     margin: 0 1rem;
     border-top: 2px solid #F8F9F9;
`;

const CardAval = styled.div`
     background-color: #F8F9F9;
     padding: 1rem;
     border-radius: 10px;
     margin: 1rem 1rem;

`;

const validationSchema = Yup.object({
     firstName: Yup
          .string()
          .required('Este campo es obligatorio'),
     lastName: Yup
          .string()
          .required('Este campo es obligatorio'),
     address: Yup
          .string()
          .required('Este campo es obligatorio'),
     phone: Yup
          .string()
          .required('Este campo es obligatorio'),
     
});

const FormularioAvales = ({guarantees, 
                           setGuarantees, 
                           credit, 
                           setDisabledPropertiesTab,
                           setValue,
                           setDisabledTabs}) => {
  
     const [disabledBut, setDisabledBut] = useState(true);

     useEffect(() => {

          //When there is information in guarantees and in the credit, the request button will be active
          if (guarantees.length > 0 && Object.keys(credit).length > 0) {
               setDisabledBut(false);

          }else{
               setDisabledBut(true);
          }

     }, [guarantees, credit]);

     const formik = useFormik({
          initialValues: {
               firstName: '',
               lastName: '',
               address: '',
               phone: '',
          },
          validationSchema,
          onSubmit: async (values) => {
               //This field is for identify the guarantee or aval before to send to the DB
               //values.identify = generateIdentify();
               let data = { ...values };
               data.identify = generateIdentify();
               setGuarantees([...guarantees, data]);

               //Clean values of formik
               for (const key in values) {
                    values[key] = ''
               }
          }     
     });

     const deleteGuarantee = ( identify ) => {
          // Here we are deleting an aval from state
          const newArray = guarantees.filter( g => g.identify != identify);
          setGuarantees(newArray);
     }

     const saveCredit = async () => {
          const { developURL } = service;
     
          const data = { 
                         credit,
                         guarantees
                       }

          const url = `${developURL}/credit`;
          const fetchConfig = {
               method: 'POST', 
               headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,
               body: JSON.stringify( data )
          }

          try {
               const response = await fetch(url, fetchConfig);
               const responseJSON = await response.json();

               if (!responseJSON.success) {
                    //error
                    return;
               }

               
               // Active "Propiedades de avales Tab"
               setDisabledPropertiesTab(false);
               //Go to the next tab "Propiedades de avales Tab"
               setValue(3);
               // Disabled tabs "Credito y Avales"
               setDisabledTabs(true);

               //Save guarantees registered in the DB
               localStorage.setItem('gua', JSON.stringify(responseJSON.result.guarantees) );

          } catch (error) {
               //error
               console.log(error);
          }

     }

     return (
       <Grid container>
            <Grid item xs={12}>
                  <FormAvales onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                         <Grid item xs={12} md={6} >
                              <TextField 
                                  fullWidth
                                  id='firstName'
                                  name='firstName'
                                  label='Nombre'
                                  value={formik.values.firstName}
                                  onChange={formik.handleChange}
                                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                  helperText={formik.touched.firstName && formik.errors.firstName}
                              />
                         </Grid>
                         <Grid item xs={12} md={6} >
                              <TextField 
                                  fullWidth
                                  id='lastName'
                                  name='lastName'
                                  label='Apellidos'
                                  value={formik.values.lastName}
                                  onChange={formik.handleChange}
                                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                  helperText={formik.touched.lastName && formik.errors.lastName}
                              />
                         </Grid>
                    </Grid>   

                    <Grid container spacing={2}>

                         <Grid item xs={12} md={6} >
                              <TextField 
                                  fullWidth
                                  id='address'
                                  name='address'
                                  label='Dirección'
                                  value={formik.values.address}
                                  onChange={formik.handleChange}
                                  error={formik.touched.address && Boolean(formik.errors.address)}
                                  helperText={formik.touched.address && formik.errors.address}
                              />
                         </Grid>
                      
                         <Grid item xs={12} md={6} >
                              <TextField 
                                  fullWidth
                                  id='phone'
                                  name='phone'
                                  label='Teléfono'
                                  value={formik.values.phone}
                                  onChange={formik.handleChange}
                                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                                  helperText={formik.touched.phone && formik.errors.phone}
                              />
                         </Grid>
                    
                         <Grid container item xs={12} justifyContent='flex-end'>
                              <Button color='primary' 
                                      type='submit' 
                                      variant="contained" 
                                      disabled={ guarantees && guarantees.length >= 3 ? true : false }
                              >
                                   Agregar Aval a Credito
                              </Button>
                         </Grid>
                      </Grid>
                  </FormAvales>
               <DivAvales>
                  <Typography variant='h5'>
                           { guarantees && guarantees.length > 0 ? 
                                        'Avales para el credito' :
                                        'Agrega un Aval para poder solicitar el credito' }  
                    </Typography>

                  <Grid container>
                    {    guarantees && guarantees.length > 0 &&

                         guarantees.map( g => (
                              <Grid item xs={12} md={3} key={g.identify}>
                                   <CardAval>
                                        <Grid container item xs={12} justifyContent='flex-end'>
                                             <Button color='secondary' 
                                                     onClick={()=>deleteGuarantee(g.identify)}
                                             >
                                                  <ClearIcon />
                                             </Button>
                                        </Grid>
                                        <Typography variant='body1'>
                                             { g.firstName } { g.lastName }
                                             <Typography variant='body1'>
                                                  <b>Dirección:</b> { g.address }
                                             </Typography>
                                             <Typography variant='body1'>
                                                  <b>Tel:</b> { g.phone }
                                             </Typography>
                                        </Typography>
                                   </CardAval>
                              </Grid>
                         ) )
                    }
                  </Grid>

                   <Grid container >
                         <Grid container item xs={12} justifyContent='flex-end'>
                                <Button color='primary' 
                                        variant="contained" 
                                        disabled={disabledBut} 
                                        onClick={() => saveCredit()}
                                        
                                >
                                     Solicitar Credito
                                </Button>
                         </Grid>
                   </Grid> 
                </DivAvales>
            </Grid>
       </Grid>
     )
}

export default FormularioAvales