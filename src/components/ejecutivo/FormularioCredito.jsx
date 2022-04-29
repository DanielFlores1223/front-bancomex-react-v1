import {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Grid, 
         Typography, 
         TextField, 
         Button, 
         Select, 
         MenuItem, 
         InputLabel, 
         Box, 
         FormHelperText } from '@material-ui/core'
import styled from '@emotion/styled'

const FormCredit = styled.form`
     padding: 3rem 5rem;
`;

const validationSchema = Yup.object({
     requestedAmount: Yup
          .number()
          .integer('Solo números enteros')
          .min(1000, 'La cantidad debe ser mayor a 1000')
          .required('Este campo es obligatorio')
          .typeError('Solo se aceptan números'),
     debTerm: Yup
           .string()
           .required('Este campo es obligatorio')
})

const FormularioCredito = ( { setCredit, 
                              credit, 
                              setDisabledIdentifyTab, 
                              setDisabledTabs,
                              setValue
                          } ) => {
  
     useEffect(() => {
          // Disabled tab "Identificación del cliente"
          setDisabledIdentifyTab(true);
     }, []);

     const formik = useFormik({
          initialValues: {
               requestedAmount: credit.requestedAmount,
               debTerm: credit.debTerm
          },
          validationSchema,
          onSubmit: (values) => {
               setCredit({...credit, ...values});
               //Go to next tab "Avales"
               setValue(2);
          }
     })
  
     return (
          <Grid container>
               <FormCredit onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                         <Grid item xs={12} md={6}>
                              <TextField 
                                  fullWidth
                                  id='requestedAmount'
                                  name='requestedAmount'
                                  label='Cantidad de dinero a solicitar'
                                  value={formik.values.requestedAmount}
                                  onChange={formik.handleChange}
                                  error={formik.touched.requestedAmount && Boolean(formik.errors.requestedAmount)}
                                  helperText={formik.touched.requestedAmount && formik.errors.requestedAmount}
                              />
                         </Grid>
                         <Grid item xs={12} md={6} >
                              <InputLabel id="debTerm1">Plazo para pagar el credito a meses</InputLabel>
                              <Select
                                fullWidth
                                labelId="debTerm1"
                                id="debTerm"
                                name='debTerm'
                                value={formik.values.debTerm}
                                onChange={formik.handleChange}
                                error={formik.touched.debTerm && Boolean(formik.errors.debTerm)}
                              >
                              
                                   <MenuItem value={6}>6 Meses</MenuItem>
                                   <MenuItem value={12}>12 Meses</MenuItem>
                                   <MenuItem value={24}>24 Meses</MenuItem>
                              </Select>
                              <FormHelperText style={{color: 'red'}}>
                                   {formik.touched.debTerm && formik.errors.debTerm}
                              </FormHelperText>
                         </Grid>

                         <Grid item xs={12}>      
                              <Typography variant='caption'>
                                   Estos campos no se pueden editar, estos valores ya están establecidos por Bancomex
                              </Typography>
                         </Grid> 
                         <Grid item xs={12} md={6}>
                              <TextField 
                                  fullWidth
                                  id='interest'
                                  name='interest'
                                  label='Interes'
                                  value='14.7%'
                                  disabled={true}
                              />
                         </Grid>
                         <Grid item xs={12} md={6}>
                               <TextField 
                                  fullWidth
                                  id='commision'
                                  name='commision'
                                  label='Comisión'
                                  value='1%'
                                  disabled={true}
                              />
                         </Grid>
                         <Grid container item xs={12} justifyContent='flex-end'>
                              <Button type='button'
                                      color="primary" 
                                      variant="contained" 
                                      style={{marginRight: '1rem'}}
                                      onClick={() => { 
                                             // Disabled tab "Identificación del cliente"
                                             setDisabledIdentifyTab(false);
                                             // Disabled tabs "Credito" and "Avales"
                                             setDisabledTabs(true);
                                             //Go to tab "Identificación del cliente"
                                             setValue(0);
                                      }}
                              >
                                   Scanear Código QR Nuevamente
                              </Button>
                         
                              <Button type='submit'
                                      color="primary" 
                                      variant="contained" 
                              >
                                   Guardar datos
                              </Button>
                            
                         </Grid>
                    </Grid>
               </FormCredit>
          </Grid>
   
     )
}

export default FormularioCredito