import {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Grid, Typography, TextField, Button, Select, MenuItem, InputLabel } from '@material-ui/core'

const validationSchema = Yup.object({
     requestedAmount: Yup
          .number()
          .integer('Solo números enteros')
          .required('El campo usuario es obligatorio')
          .typeError('Solo se aceptan números'),
     debTerm: Yup
           .string()
           .required('La contrasena es obligatoria')
})

const FormularioCredito = ( { setCredit, credit } ) => {
  
     const formik = useFormik({
          initialValues: {
               requestedAmount: credit.requestedAmount,
               debTerm: credit.debTerm
          },
          validationSchema,
          onSubmit: (values) => {
               console.log(credit)
               setCredit({...credit, ...values});
               console.log(credit)
          }
     })
  
     return (

          <Typography component="span">
               <Grid component="span">
                    <form onSubmit={formik.handleSubmit}>
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

                         <InputLabel id="debTerm1">Plazo para pagar el credito a meses</InputLabel>
                         <Select
                           fullWidth
                           labelId="debTerm1"
                           id="debTerm"
                           name='debTerm'
                           value={formik.values.debTerm}
                           onChange={formik.handleChange}
                           error={formik.touched.debTerm && Boolean(formik.errors.debTerm)}
                           helperText={formik.touched.debTerm && formik.errors.debTerm}
                         >

                              <MenuItem value={6}>6 Meses</MenuItem>
                              <MenuItem value={12}>12 Meses</MenuItem>
                              <MenuItem value={24}>24 Meses</MenuItem>
                         </Select>
                         
                         <span>Estos campos no se pueden editar, estos valores ya están establecidos por Bancomex</span>
                         <TextField 
                             fullWidth
                             id='interest'
                             name='interest'
                             label='Interes'
                             value='14.7%'
                             disabled={true}
                         />
                          <TextField 
                             fullWidth
                             id='commision'
                             name='commision'
                             label='Comisión'
                             value='1%'
                             disabled={true}
                         />

                         <Button type='submit'>
                              Guardar datos
                         </Button>
                    </form>
               </Grid>
          </Typography>
   
     )
}

export default FormularioCredito