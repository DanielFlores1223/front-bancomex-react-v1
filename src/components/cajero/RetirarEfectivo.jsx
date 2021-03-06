import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import { Alert, Snackbar, Button, Modal, Box, IconButton} from '@mui/material';
import { Divider, Chip } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { Card, CardActionArea, CardContent } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {QrCodeScanner} from '@mui/icons-material';
import Spinner from '../common/spinner/Spinner';
import { getCashBoxId } from '../common/functions/general'
import service from '../../service';
import styled from '@emotion/styled';

const styleBoxCam = { //Estilo del contenedor al abrir la modal del escaner de QR
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

const QrButton = styled.a`
 background: linear-gradient(to right,#103160 ,#19437e);
 background-color: #103160;
 color: #fff;
 font-family: Verdana;
 font-size: 18px;
 font-weight: 800;
 font-style: normal;
 text-decoration: none;
 padding: 50px 55px;
 border: 0px solid #000;
 border-radius: 12px;
 display: inline-flex;
 justify-content: center;
 align-items: center;
 flex-flow: column;
 cursor: pointer;
span{
 margin-bottom:40px;
 display: block;
 width: 150px;
 height: 150px;
 background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAAH3uAZaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFBRjg0RkY5QkU2ODExRUM4RjUzRjAzREU0MEIzOEYyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFBRjg0RkZBQkU2ODExRUM4RjUzRjAzREU0MEIzOEYyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUFGODRGRjdCRTY4MTFFQzhGNTNGMDNERTQwQjM4RjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUFGODRGRjhCRTY4MTFFQzhGNTNGMDNERTQwQjM4RjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5f7a2JAABPG0lEQVR42uxa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);
 background-repeat: no-repeat;
 background-size: contain;
 transform: rotate(0deg);
}
:hover{
 background: linear-gradient(to right,hsl(215, 72%, 27%) ,hsl(215, 67%, 35%));
 background-color: #525d7a;
}
:active{
 transform: scale(.99);
}
  
`;

const styles = makeStyles((theme) => ({ //Estilos generales de ciertos componentes
  marginTextField: {
    marginBottom: '1rem',
  },
  marginCard: {
    margin: '1rem',
  },
  marginDiv: {
      padding: '1rem 5rem',
      maxHeight: '100vh',
  },
  alert: {
      maxWidth: '100%',
      marginTop: '1rem'
  },
  gridContainer: {
      padding: '2rem 4rem 1rem',
      border: '2px solid #F8F9F9',
      borderRadius: '10px',
      background: '#F8F9F9',
      maxHeight: '100%',
  },
  divider: {
    background: '#F8F9F9',
},
}));

const RetirarEfectivo = () => {

  //Verifica si se encuentra el cliente para no volver a solicitar a la API
  let waitFindClient = false

  const [dataClient, setDataClient] = useState(false); //Almacena y edita la informaci??n del cliente
  const [dataRetirar, setDataRetirar] = useState(false); //Almacena y edita los datos para hacer un retiro
  const [showBackdrop, setshowBackdrop] = useState(false); //Almacena y edita si es necesario poner pantalla de espera

  const [openQrReader, setopenQrReader] = useState(false); //Permite decidir cuando mostrar el lector de QR
  const [openFormRetirar, setOpenFormRetirar] = useState(false);//Decide si se va mostrar la ventana final de retirar
  
  const handleOpenFormRetirar = () => { //Cambia a mostrar la ventana de retirar
    setOpenFormRetirar(true);
  };

  const handleCloseFormRetirar = () => { //Cambia a cerrar la ventana de retirar
    setOpenFormRetirar(false);
  };
  const handleOpenQrReader = () => { //Cambia a mostrar el lector de QR
    waitFindClient = false //Permite mandar solicitud a la API
    setopenQrReader(true);
  }
  const handleCloseQrReader = () => { //Cambia a cerrar el lector de QR
    waitFindClient = true //No permite mandar solicitud a la API
    setopenQrReader(false);
  }

  const [showSpinner, setShowSpinner] = useState(false); //Decide cuando mostrar un progreso
  const [msg, setMsg] = useState({show:false, txt:null, type:null}); //Datos del mensaje a mostrar

  const classes = styles(); //Se guardan los estilos generales

  const findClient = async id => { //Funcion que permite buscar a un cliente por ID en la API

    const { developURL } = service //Se obtiene la URL base
    const token = localStorage.getItem('t') //Se obtiene el token de la sesi??n
    const url = `${developURL}/client/${id}/accounts` //Se define la URL general mandando el ID
    const fetchConfig = { //Configuraci??n general para el fetch
        method: 'GET',  //Metodo a utilizar
        headers: { 'Content-Type': 'application/json', 'Authorization': token} //Encabezado
    }

    try {
      setShowSpinner(true); //Se muestra progreso
      const response = await fetch( url, fetchConfig ); //Se espera a la respuesta de la API al entablar la conexi??n
      const jsonResponse = await response.json(); //La respuesta de la API se convierte a JSON
      setShowSpinner(false); //Se deja de mostrar progreso
      if( !jsonResponse.success ) { //Se verifica si ocurrio un error
        waitFindClient = false //Se deja de esperar la respuesta de la API y permite volver a generar una nueva solicitud.
        setshowBackdrop(false) //Deja de poner de fondo la interaccion
        changeMsg('error','No se encontr?? una cuenta'); //Se manda un mensaje de error
        return; //Se sale de la funci??n en caso de ocurrir un error
      }
      let client = jsonResponse.result //Se guarda la respuesta del cliente en una variable
      if(!client.active){
        waitFindClient = false
        setshowBackdrop(false)
        changeMsg('error', 'El cliente se encuentra desactivado')
        }else if(!client.Accounts){
          waitFindClient = false
          setshowBackdrop(false)
          changeMsg('error', 'El cliente no tiene cuentas asociadas')
      }else{
        const fullName = `${client.firstName} ${client.lastName}`,
        curp = client.curp,
        debitAccounts = client.Accounts.filter(a => a.type === 'Debito' && a.state === true),
        creditAccounts = client.Accounts.filter(a => a.type === 'Credito' && a.state === true)

        setDataClient({
          fullName,
          curp,
          debitAccounts,
          creditAccounts
        })
        
      setshowBackdrop(false)
      }
    } catch (error) {
      setShowSpinner(false);
      waitFindClient = false
      setshowBackdrop(false)
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

  const codeQrReading = (result, error) => {
    if (!!result && !waitFindClient) {
      let arr = result?.text.trim().split(':')
      if(arr.length === 2){
        if(arr[0] === 'ID') {
          waitFindClient = true
          setshowBackdrop(true)
          findClient(arr[1])
          //setTimeout(() => {findClient(arr[1])}, 3000); //Ver la funcionalidad del Backdrop
          return
        }
      } 
      console.log("Formato de Codigo QR incorrecto!")
    }
  }

  const finderClientByQR = () => {
    return (
    <Grid align="center">
    <QrButton onClick={handleOpenQrReader}><span></span>Escaner QR</QrButton>
    
    {/* <IconButton  color="primary" onClick={handleOpenQrReader}>
      <QrCodeScanner sx={{ fontSize: 200 }}/>
    </IconButton> */}
    
    <Modal
      open={openQrReader}
      onClose={handleCloseQrReader}
    >
      <Box sx={styleBoxCam}>
        <QrReader
          videoId="videoQR"
          onResult={codeQrReading}
          videoContainerStyle = {{ paddingTop: '75%' }}
        />
        
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        {msg.show && msg.type==='error' && (<Alert className={classes.alert} severity={msg.type}> 
        {msg.txt} </Alert>)}
      </Box>
    </Modal>

  </Grid>
  )
  }

  const viewCard = ({cardNumber}) => {
    return (
      <Grid item
            xs={12} 
            md={6} 
            lg={6} >
      <Card className={classes.marginCard}>
      <CardActionArea onClick={()=>{
        setDataRetirar({client:dataClient.fullName, cardNumber})
        handleOpenFormRetirar(true)
      }}>
        <CardContent>
          <Typography variant="body2">
            {cardNumber}
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
    )
  }

  const verifyAccounts = (accounts) => {
    if(accounts.length){
      return accounts.map(drawCards)
    }else{
      return (
        <Grid item 
        xs={12} 
        md={12} 
        lg={12}>
      <Alert className={classes.alert} severity='error'> No tiene cuentas </Alert>
      </Grid>
      )
    }
  }

  const drawCards = (account) => {
    if(account.Cards.length){
      return account.Cards.map(viewCard)
    }else{
      //return if you can render something when account doesn't find any card
    }
  }

  const viewClientWithCards = (props) => {

    return (
      <Grid>
        <Typography align="center" variant="h6" className={classes.marginTextField}>
        {props.fullName}
        <br/>
        <b>{props.curp}</b>
      </Typography>
      <Divider classes={{root: classes.divider}} flexItem>
        <Chip label="Tarjetas de Debito"/>
      </Divider>
      <Grid container>
      {verifyAccounts(props.debitAccounts)}
      </Grid>
      <Divider classes={{root: classes.divider}} flexItem>
        <Chip label="Tarjetas de Credito"/>
      </Divider>
      <Grid container>
      {verifyAccounts(props.creditAccounts)}
      </Grid>
      </Grid>
    )
  }

  const retirarCuenta = async () => {
    setshowBackdrop(true)
    const {cardNumber,amount, nip} = dataRetirar
    const { developURL } = service
    const token = localStorage.getItem('t')
    const data = { cardNumber, amount, nip, type:'Retirar', box:getCashBoxId()}
    const url = `${developURL}/transactions`
    const fetchConfig = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': token} ,
        body: JSON.stringify( data )
    }
    try {
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      console.log(jsonResponse)
      if( !jsonResponse.success ) {
        if(jsonResponse.error === 'insufficient amount in account'){
          changeMsg('error','La cantidad disponible es insuficiente');
        }else{
          changeMsg('error','Los datos proporcionados son incorrectos');
        }
      }else{
        changeMsg('success', 'Se realiz?? el retiro')
        setDataClient(false)
        setDataRetirar(false)
        setopenQrReader(false)
        handleCloseFormRetirar()
      }
    } catch (error) {
      changeMsg('error','Algo salio mal... Intentelo mas tarde!');
    }
    setshowBackdrop(false)
  }

  const handleChangeDataRetirar = (event) => {
    setDataRetirar({...dataRetirar, [event.target.id]:event.target.value})
  };

  const viewFormRetirar = ({client, cardNumber}) => {
    return (
    <Dialog open={openFormRetirar} onClose={handleCloseFormRetirar}>
      <DialogTitle>Retirar</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cliente: <b>{client}</b>
          <br/>
          Tarjeta: <b>{cardNumber}</b>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Cantidad ($)"
          type="number"
          onChange={handleChangeDataRetirar}
          fullWidth
          variant="standard"
          required
        />
        <TextField
          margin="dense"
          id="nip"
          label="NIP"
          type="password"
          onChange={handleChangeDataRetirar}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseFormRetirar}>Cancelar</Button>
        <Button onClick={retirarCuenta}>Retirar</Button>
      </DialogActions>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>)
  }

  return (
    <Grid container 
    item 
    xs={12} 
    md={12} 
    lg={12} 
    alignItems="center" 
    direction='column'>
      <Grid className={classes.gridContainer}>

      <Typography align="center" variant="h4" className={classes.marginTextField}>
        {dataClient?'':'Buscar '}Cliente
      </Typography>

      {!dataClient && finderClientByQR()}

      {dataClient && viewClientWithCards(dataClient)}

      {showSpinner && <Spinner />} 
            {showSpinner && <Spinner />} 
      {showSpinner && <Spinner />} 
      
      {msg.show && (<Alert className={classes.alert} severity={msg.type}> {msg.txt} </Alert>)}

      <Snackbar 
        open={msg.show} 
        severity={msg.type}
        message={msg.txt}>
      </Snackbar>

      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {dataRetirar&&viewFormRetirar(dataRetirar)}
    </Grid>
  );
};

export default RetirarEfectivo