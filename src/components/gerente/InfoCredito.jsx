import { Grid, TextField, InputLabel, Select, FormHelperText, MenuItem, Button } from '@material-ui/core';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import service from '../../service'

const validationSchema = Yup.object({
     status: Yup
         .string()
         .required('*Este campo es obligatorio'),
     approvedAmount: Yup
          .number()
          .min(0, 'La cantidad debe ser mayor')
          .integer('Solo se aceptan cantidades enteras')
          .required('*Este campo es obligatorio')
 });

const InfoCredito = () => {
     
     const { id } = useParams();
     const [credit, setCredit] = useState({});
     const [client, setClient] = useState({});
     const [employee, setEmployee] = useState({});
     const [properties, setProperties] = useState([]);
     const navigateTo = useNavigate();

     const formik = useFormik({
          initialValues: {
              status: '',
              approvedAmount: '0'
              
          },
          validationSchema,
          onSubmit: (values) => {
               allowOrDenyCredit(values);
          }
     });  

     const getInfo = async () => {
          const { developURL } = service;
          const url = `${developURL}/credit/creditAll/${id}`;
          const fetchConfig = {
               method: 'GET', 
               headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,
          }

          try {
               const response = await fetch(url, fetchConfig);
               const responseJSON = await response.json();

               if (!responseJSON) {
                    //Alerta no se hizo correctamente la peticion
                    return;
               }

               //Todo bien
               setCredit(responseJSON.result.credit);
               setClient(responseJSON.result.credit.Client)
               setEmployee(responseJSON.result.credit.Employee)
               setProperties(responseJSON.result.properties)
          } catch (error) {
               //alerta algo salio mal
          }
     }

     const allowOrDenyCredit = async (values) => {
          const { developURL } = service;
          const url = `${developURL}/credit/allowOrDenyCredit/${id}`;
          const data = { ...values }
          const fetchConfig = {
               method: 'POST', 
               headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,
               body: JSON.stringify( data )
          }

          try {
               const response = await fetch(url, fetchConfig);
               const responseJSON = await response.json();

               console.log(responseJSON);
               if (!responseJSON) {
                    //Alerta no se hizo correctamente la peticion
                    return;
               }

               //Todo bien

               //Redireccionamos a la vista principal de creditos
               navigateTo('/creditos')
          } catch (error) {
               //alerta algo salio mal
          }
     }

     useEffect(() => {
          getInfo();
     }, [])

     return (
       <div>
            <Grid container>
                {
                    credit && Object.keys(credit).length > 0 && (
                         <>
                          <p>{credit.requestedAmount}</p>
                          <p>{client.firstName}</p>
                         </>
                     )
                }
               {
                    credit.status === 'Pendiente' &&(
                         <form onSubmit={formik.handleSubmit}>
                             <InputLabel id="aprodenselect">Aprobar o Rechazar</InputLabel>
                             <Select
                               labelId="aprodenselect"
                               id="status"
                               name='status'
                               value={formik.values.status}
                               onChange={formik.handleChange}
                               error={formik.touched.status && Boolean(formik.errors.status)}
                             >
                                  <MenuItem value={'Aprobado'}>Aprobar</MenuItem>
                                  <MenuItem value={'Rechazado'}>Rechazar</MenuItem>
                             </Select>
                             <FormHelperText style={{color: 'red'}}>
                                       {formik.touched.status && formik.errors.status}
                             </FormHelperText>
                             <TextField 
                                  fullWidth
                                  id='approvedAmount'
                                  name='approvedAmount'
                                  label='Cantidad aprobada para el credito'
                                  value={formik.values.approvedAmount}
                                  onChange={formik.handleChange}
                                  error={formik.touched.approvedAmount && Boolean(formik.errors.approvedAmount)}
                                  helperText={formik.touched.approvedAmount && formik.errors.approvedAmount}
                             />
                             <Button type='submit' >
                                  Enviar
                             </Button>
                         </form>
                    )
               }
                
            </Grid>
       </div>
     )
}

export default InfoCredito