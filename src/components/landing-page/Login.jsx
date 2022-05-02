import {useState} from 'react';
import { useFormik } from 'formik';
import service from '../../service';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { Grid, TextField, makeStyles } from "@material-ui/core";
import {Box,Typography} from "@mui/material"
import ImgLogin from '../../img/login-img.jpeg';
import { Alert } from '@mui/material';
import Spinner from '../common/spinner/Spinner';
import Logo from '../../img/bancomex_color.svg';

const styles = makeStyles((theme) => ({
    marginTextField: {
      marginBottom: '2rem',
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
        marginTop: '2.5rem',
        marginBottom: '1.5rem',
    },
    formLogin: {
        padding: '4rem',
        borderRadius: '10px',
        maxHeight: '100%',
    }

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
          localStorage.setItem( 'name', jsonResponse.result[0].firstName )
          localStorage.setItem( 't' , jsonResponse.token );


     } catch (error) {
          //Alerta
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false); 
            setErrorExist(true);
            setMsgError('Algo salio mal... Intentelo mas tarde'); 
          }, 2000);

          setTimeout(() => {
            setErrorExist(false);
            setMsgError('');
          }, 4000);
     }
     

  }   

  return (
      <Box sx={{ width: "85%", margin: "auto" }}>


        <Grid container justifyContent='center' className={classes.marginLogo}>
            <img src={Logo} alt="logo" height="60px" />
        </Grid>
        <Grid container spacing={1}>
            <Grid container 
                  item 
                  xs={12} 
                  md={7} 
                  lg={7} 
                  direction='column' 
                  alignItems="flex-start" 
                  justifyContent='center'
            >
                {/* <Typography variant="h4" color="initial" sx={{ fontWeight: "500", marginTop:'3rem' }}>
                    Hola, Bienvenido
                </Typography> */}
                <img src={ImgLogin} alt="img login" style={{height: '28rem', marginTop:'3rem'}} />
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
                <form onSubmit={formik.handleSubmit} className={classes.formLogin}>
                    {errorExist && (<Alert className={classes.alert} severity="error" fullWidth> {msgError} </Alert>)}
                    <Typography align="center" variant="h4" sx={{fontWeight: "500", marginBottom:'2rem'}}>
                        Iniciar Sesión
                    </Typography>
                    <TextField 
                        fullWidth
                        id='code'
                        name='code'
                        label='Código'
                        variant="outlined"
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
                        variant="outlined"
                        className={classes.marginTextField}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        inputProps={{ style: { color: 'black'}}}
                        type='password'
                        disabled={showSpinner}
                    />

                    <Button variant="contained"
          color="primary"
          size="large" 
                            fullWidth 
                            type="submit"
                    >
                        Iniciar Sesión
                    </Button>   
                    
                    {showSpinner && <Spinner />}    
                    
                </form>
            </Grid>
        </Grid>
      </Box>
  )
}

export default Login

