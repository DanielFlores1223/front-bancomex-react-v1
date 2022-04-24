/*
import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

//llevara el lector de codigo qr => pintara nombre o curp, clave de ine para que cajero verifique identidad
//el cajero buscara por telefono y correo
//
const RetirarEfectivo = () => {
  return (
    <Formik>
        <Form>
            <label>Numero de Cuenta</label>
            <Field type="number"/>
            <label>Cantidad a retirar:</label>
            <Field type="number"/>
            <Button variant="contained">Retirar</Button>
        </Form>
    </Formik>
  )
}

export default RetirarEfectivo
*/

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import { Alert, Snackbar, Button, Modal, Box } from '@mui/material';
import Spinner from '../common/spinner/Spinner';
import service from '../../service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

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
  form: {
      padding: '2rem 4rem',
      border: '2px solid #F8F9F9',
      borderRadius: '10px',
      background: '#F8F9F9',
      maxHeight: '100%',
  }

}));

//FindClient
const validationSchemaFindClient = Yup.object({
  clientId: Yup
    .number()
    .typeError('Necesitas agregar un numero de cliente')
    .required('El número de cliente es obligatorio')
});
//

const RetirarEfectivo = (props) => {

  const [openQrReader, setopenQrReader] = useState(false);
  const handleOpenQrReader = () => setopenQrReader(true);
  const handleCloseQrReader = () => setopenQrReader(false);

  const [data, setData] = useState('No result');
  const [showSpinner, setShowSpinner] = useState(false);
  const [msg, setMsg] = useState({show:false, txt:null, type:null});

  const classes = styles();

  //FindClient
  const formikFindClient = useFormik({
    initialValues: {
      clientId: ''
        
    },
    validationSchema: validationSchemaFindClient,
    onSubmit: (values, {resetForm}) => {
      findClient(values, resetForm);
    }
  })
  const findClient = async ({clientId}, resetForm) => {
    const { developURL } = service
    const token = localStorage.getItem('t')
    const url = `${developURL}/client/${clientId}`
    const fetchConfig = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json', 'Authorization': token}
    }

    try {
      setShowSpinner(true);
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      setShowSpinner(false);
      console.log(jsonResponse)
      if( !jsonResponse.success ) {
        changeMsg('error','No se encontró una cuenta');
        return;
      }
      let client = jsonResponse.result
      if(!client.state){
        changeMsg('error', 'La cuenta se encuentra desactivada')
      }else if(!client.active){
        changeMsg('error', 'El cliente se encuentra desactivada')
      }else{
        //setCanDeposit(true);
        resetForm();
      }
    } catch (error) {
      setShowSpinner(false);
      changeMsg('error','Algo salio mal... Intentelo mas tarde!');
    }
  }
  //

  const changeMsg = (type, txt) => {

    setTimeout(() => {
      setMsg({ show: true, type, txt});
    }, 0);
    setTimeout(() => {
      setMsg({...msg, show: false});
    }, 3000);

  }
  
  return (
        <div>
        <Button onClick={handleOpenQrReader}>Buscar por QR</Button>
        <Modal
          open={openQrReader}
          onClose={handleCloseQrReader}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {openQrReader&&(<QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              videoContainerStyle = {{ paddingTop: '75%' }}
            />)}
            {showSpinner && <Spinner />} 
            {msg.show && (<Alert className={classes.alert} severity={msg.type} fullWidth> {msg.txt} </Alert>)}
          </Box>
        </Modal>
      </div>
    /*
    <form onSubmit={formikFindClient.handleSubmit} className={classes.form}>
            <Typography align="center" variant="h4" className={classes.marginTextField}>
              Buscar Cliente
            </Typography>
            <Grid>
              <QrReader
                      onResult={(result, error) => {
                        if (!!result) {
                          setData(result?.text);
                        }

                        if (!!error) {
                          console.info(error);
                        }
                      }}
                      videoContainerStyle = {{ paddingTop: '30%' }}
                    />
                    <p>{data}</p>
            </Grid>
            <TextField
              fullWidth
              id='clientId'
              name='clientId'
              label='Número de Cuenta'
              className={classes.marginTextField}
              value={formikFindClient.values.clientId}
              onChange={formikFindClient.handleChange}
              error={formikFindClient.touched.clientId && Boolean(formikFindClient.errors.clientId)}
              helperText={formikFindClient.touched.clientId && formikFindClient.errors.clientId}
              disabled={showSpinner}
            />
            <Button color="primary" 
                    variant="contained" 
                    fullWidth 
                    type="submit"
            >
              Buscar
            </Button>

            {showSpinner && <Spinner />} 
            
            {msg.show && (<Alert className={classes.alert} severity={msg.type} fullWidth> {msg.txt} </Alert>)}

            <Snackbar 
            open={msg.show} 
            severity={msg.type}
            message={msg.txt}>
            </Snackbar>

          </form>*/
  );
};

export default RetirarEfectivo