import {useEffect, useState} from 'react'
import service from '../../service';
import { styled, CardMedia, Paper, Grid, Card, Typography, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/system';



const theme = createTheme({


});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  back
  
}));

const Home = () => {
  const [errorExist, setErrorExist] = useState(false);
  const [msgError,setMsgError] = useState(false);
  const [resultAccounts, setResultAccounts]= useState({});
  const [resultCredits, setResultCredits]= useState({});
  const [resultAmount, setResultAmount]= useState({});


  //GET:Total Cuentas aperturadas 
  const totalAccounts = async()=>{
    const {developURL} = service;

    const url =`${developURL}/accounts/count/countAccounts`;
    const fetchConfig ={
      method:'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,

    }
  
    try{
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      if(!jsonResponse.success){
        setErrorExist(true);
        setMsgError('Algo salió mal...');

        setTimeout(()=>{
          setErrorExist(false);
          setMsgError('');
        }, 4000);

        return;
      }
      setResultAccounts(jsonResponse.result);

    }catch(error){
      setErrorExist(true);
      setMsgError('Algo salíó mal, intentalo más tarde');

      setTimeout(()=>{
        setErrorExist(false);
        setMsgError('');
      }, 4000);
    }
  }

  //GET: Total Creditos otorgados
  const totalCredits = async()=>{
    const {developURL} = service;

    const url =`${developURL}/credit/count/countCredits`;
    const fetchConfig ={
      method:'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,

    }
    try{
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();

      console.log(jsonResponse.result)
      if(!jsonResponse.success){
        setErrorExist(true);
        setMsgError('Algo salió mal...');

        setTimeout(()=>{
          setErrorExist(false);
          setMsgError('');
        }, 4000);

        return;
      }

      setResultCredits(jsonResponse.result);
    }catch(error){
      setErrorExist(true);
      setMsgError('Algo salíó mal, intentalo más tarde');

      setTimeout(()=>{
        setErrorExist(false);
        setMsgError('');
      }, 4000);
    }
  }


  // GET:Total amount bank
  const totalAmountBank = async()=>{
    const {developURL} = service;

    const url =`${developURL}/accounts/count/totalAmountBank/id`;
    const fetchConfig ={
      method:'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,

    }
    try{
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
console.log(jsonResponse);
      if(!jsonResponse.success){
        setErrorExist(true);
        setMsgError('Algo salió mal...');

        setTimeout(()=>{
          setErrorExist(false);
          setMsgError('');
        }, 4000);

        return;
      }
      setResultAmount(jsonResponse.result.toLocaleString('en-US', {maximumFractionDigits:2}));

    }catch(error){
      setErrorExist(true);
      setMsgError('Algo salíó mal, intentalo más tarde');

      setTimeout(()=>{
        setErrorExist(false);
        setMsgError('');
      }, 4000);
    }
  }


  useEffect(()=>{
    totalAccounts();
    totalCredits();
    totalAmountBank();


  }, [])

  
  const renderCard = (title, subTitle, img) =>(
    <Card sx={{ display:'flex', alignItems: 'center',
      justifyContent: 'center' , flexDirection:'column', height: 300,maxWidth: 300 }}> 
      <CardMedia
      component="img"
      height="340"
      image={img}
      alt="Paella dish"
      />
      
       <Typography sx={{ fontSize: 20, fontWeight: '600',marginTop:'20px' }} color="text.primary" gutterBottom>
             {title}
            </Typography>
            <Typography variant="h5" component="div" sx={{marginBottom:'20px'}}>
              {subTitle}
            </Typography>
        </Card>
      )
  return (

    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} mb={5}>
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" color="initial" sx={{ fontWeight: "600" }}>
              Información General del Banco
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={12}>
       
                <Grid container spacing={3} sx={{margin: "auto"}}>
                <Grid item xs={12} md={7} lg={4}>
                  
                {renderCard('Cuentas Activas', `${resultAccounts}`, 'https://res.cloudinary.com/cardiadev/image/upload/v1651160167/bancomex/cuentas_activas_hpiez5.jpg')}
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
            
                {renderCard('Creditos Otorgados', `${resultCredits}`, 'https://res.cloudinary.com/cardiadev/image/upload/v1651160166/bancomex/creditos_aprobado_hvm5lg.jpg')}
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
                {renderCard('Saldo en Sucursal', `$ ${resultAmount} MXN`, 'https://res.cloudinary.com/cardiadev/image/upload/v1651160167/bancomex/monto_total_banco_eodh0o.jpg')}
                </Grid>
              </Grid>


        </Grid>







      </Grid>
    </Box>
  )
}

export default Home