import {useState} from 'react';
import { useFormik } from 'formik';
import service from '../../service';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { Grid, TextField, makeStyles } from "@material-ui/core";
import ImgLogin from '../../img/login-img.jpeg';
import { Alert } from '@mui/material';
import Spinner from '../common/spinner/Spinner';

const styles = makeStyles((theme) => ({
    marginTextField: {
      marginBottom: '1rem',
    },
    marginDiv: {
        margin: '3rem 1rem'
    },
    alert: {
        maxWidth: '100%',
        marginBottom: '2rem'
    },
  }));

const validationSchema = Yup.object({
    code: Yup
        .string()
        .required('El campo usuario es obligatorio'),
    password: Yup
              .string()
               .required('La contrasena es obligatoria')
});

const Login = ({setLoginSuccess, setRole, role}) => {
  
  const [showSpinner, setShowSpinner] = useState(false);
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState('');

  const classes = styles();

  const formik = useFormik({
    initialValues: {
        code: '',
        password: ''
        
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        login(values);
    }
  })  

  const login = async ( { code, password } ) => {
     const { developURL } = service;
     
     const data = { code, password}
     const url = `${developURL}/employees/login`;
     const fetchConfig = {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json'} ,
          body: JSON.stringify( data )
     }

     try {
          setShowSpinner(true);
          const response = await fetch( url, fetchConfig );
          const jsonResponse = await response.json();
          setShowSpinner(false);

          if( !jsonResponse.success ) {
              setErrorExist(true);
              setMsgError('Las credenciales son incorrectas');

              setTimeout(() => {
                setErrorExist(false);
                setMsgError('');
              }, 4000);

              return;
          }
    
          setLoginSuccess(true);
          setRole(jsonResponse.result[0].role);
          
          localStorage.setItem( 'role', role );
          localStorage.setItem( 't' , jsonResponse.token );


     } catch (error) {
          //Alerta
          setShowSpinner(true);
          console.log(error)
          setErrorExist(true);
          setMsgError('Algo salio mal... Intentelo mas tarde');

          setTimeout(() => {
            setErrorExist(false);
            setMsgError('');
          }, 4000);
     }
     

  }   

  return (
    <div className={classes.marginDiv}>
        <Grid container spacing={2} mx={3}>
            <Grid container 
                  item 
                  xs={12} 
                  md={7} 
                  lg={7} 
                  alignItems="center" 
                  justifyContent='center'
            >
                <img src={ImgLogin} alt="img login" style={{height: '28rem'}} />
            </Grid>
            <Grid container 
                  item 
                  xs={12} 
                  md={5} 
                  lg={5} 
                  alignItems="center" 
                  justifyContent='center' 
                  direction='column'
            >
                <form onSubmit={formik.handleSubmit}>
                    {errorExist && (<Alert className={classes.alert} severity="error" fullWidth> {msgError} </Alert>)}
                    <TextField 
                        fullWidth
                        id='code'
                        name='code'
                        label='Código'
                        className={classes.marginTextField}
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                        disabled={showSpinner}
                    />
                    <TextField 
                        fullWidth
                        id='password'
                        name='password'
                        label='Contraseña'
                        className={classes.marginTextField}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        inputProps={{ style: { color: 'black'}}}
                        type='password'
                        disabled={showSpinner}
                    />

                    <Button color="primary" 
                            variant="contained" 
                            fullWidth 
                            type="submit"
                    >
                        Iniciar Sesión
                    </Button>   
                    
                    {showSpinner && <Spinner />}    
                    
                </form>
            </Grid>
        </Grid>
    </div>
  )
}

export default Login

