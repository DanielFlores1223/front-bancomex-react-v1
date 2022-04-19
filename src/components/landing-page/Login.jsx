import React from 'react';
import { ErrorMessage, Field,Form,Formik} from 'formik';
import service from '../../service';
import * as Yup from 'yup';
import Button from '@mui/material/Button';

const Login = () => {
   

  const login = async ( {usuario, contrasena} ) => {
     const { developURL } = service;
     
     const data = { code: usuario, password: contrasena}
     console.log(data)
     const url = `${developURL}/employees/login`;
     const fetchConfig = {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json'} ,
          body: JSON.stringify( data )
     }

     try {
          const response = await fetch( url, fetchConfig );
          const jsonResponse = await response.json();

          console.log(jsonResponse);
          if( !jsonResponse.success ) {

          }
    
          

     } catch (error) {
          //Alerta
          console.log(error)
     }
     

  }   

  return (
    <Formik initialValues={
        { usuario: '',
        contrasena: ''
        }
      }

      validationSchema  = {
        Yup.object().shape({
            usuario: Yup.string().required('El campo usuario es obligatorio'),
            contrasena: Yup.string().required('La contrasena es obligatoria')
        })
      }


      render = {
          (
              {
                  errors,
                  status,
                  touched,
                  dirty,
                  isValid
              }
          ) => (
         <Form>
             <label>Usuario</label>
             <Field name="usuario" type="text" />
             <ErrorMessage name="usuario" className = "invalid-feedback"/>
             <label>Contraseña</label>
             <Field name="contrasena" type="password"/>
             <ErrorMessage name="contrasena" className="invalid-feedback"/>
             <br></br>
             <Button type='submit' variant="contained">Log In</Button>
         </Form>
          )
      }
      onSubmit = {(values) =>{
           console.log('enviando')
          login(values);
      }}> 
      </Formik>
  )
}

export default Login

