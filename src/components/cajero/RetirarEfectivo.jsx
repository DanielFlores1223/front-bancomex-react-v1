import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Grid, TextField, makeStyles, Typography } from "@material-ui/core";
import { Alert, Snackbar, Button, Modal, Box, IconButton, Stack} from '@mui/material';
import { Divider, Chip } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { Card, CardActionArea, CardContent } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {QrCodeScanner} from '@mui/icons-material';
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
  marginCard: {
    margin: '1rem',
  },
  marginDiv: {
      padding: '1rem 5rem',
      maxHeight: '100vh',
  },
  alert: {
      maxWidth: '100%',
      marginBottom: '2rem'
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

const RetirarEfectivo = (props) => {

  let waitFindClient = false

  const [dataClient, setDataClient] = useState(false);
  const [dataRetirar, setDataRetirar] = useState(false);
  const [showBackdrop, setshowBackdrop] = useState(false);

  const [openQrReader, setopenQrReader] = useState(false);
  const [openFormRetirar, setOpenFormRetirar] = useState(false);
  const handleOpenFormRetirar = () => {
    setOpenFormRetirar(true);
  };

  const handleCloseFormRetirar = () => {
    setOpenFormRetirar(false);
  };
  const handleOpenQrReader = () => {
    waitFindClient = false
    setopenQrReader(true);
  }
  const handleCloseQrReader = () => {
    waitFindClient = true
    setopenQrReader(false);
  }

  const [showSpinner, setShowSpinner] = useState(false);
  const [msg, setMsg] = useState({show:false, txt:null, type:null});

  const classes = styles();

  const findClient = async id => {

    const { developURL } = service
    const token = localStorage.getItem('t')
    const url = `${developURL}/client/${id}/accounts`
    const fetchConfig = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json', 'Authorization': token}
    }

    try {
      setShowSpinner(true);
      const response = await fetch( url, fetchConfig );
      const jsonResponse = await response.json();
      setShowSpinner(false);
      if( !jsonResponse.success ) {
        waitFindClient = false
        setshowBackdrop(false)
        changeMsg('error','No se encontró una cuenta');
        return;
      }
      let client = jsonResponse.result
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
    <IconButton  color="primary" onClick={handleOpenQrReader}>
      <QrCodeScanner sx={{ fontSize: 200 }}/>
    </IconButton>
    <Modal
      open={openQrReader}
      onClose={handleCloseQrReader}
    >
      <Box sx={style}>
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
        {msg.show && msg.type==='error' && (<Alert className={classes.alert} severity={msg.type} fullWidth> {msg.txt} </Alert>)}
      </Box>
    </Modal>

  </Grid>
  )
  }

  const viewCard = ({cardNumber}) => {
    return (
      <Grid
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
      return (<Alert className={classes.alert} severity='error' fullWidth> No tiene cuentas </Alert>)
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
    const data = { cardNumber, amount, nip, type:'Retirar'}
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
        changeMsg('success', 'Se realizó el retiro')
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
    <Dialog open={openFormRetirar} close={handleCloseFormRetirar}>
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
        />
        <TextField
          inputMode="numeric"
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
    justifyContent='center' 
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
      
      {msg.show && (<Alert className={classes.alert} severity={msg.type} fullWidth> {msg.txt} </Alert>)}

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