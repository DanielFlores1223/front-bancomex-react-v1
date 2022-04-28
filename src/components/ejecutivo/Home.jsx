import React from 'react'
import {useEffect, useState} from 'react'
import service from '../../service';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box  from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  
}));

const Home = () => {
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState(false);
  const [resultClients, setResultClients] = useState({});
  const [resultEmployeeCredits, setResultEmployeeCredits] = useState({});

  //Función para obtener clientes
  
  const totalClients = async () => {
    const {developURL} = service;
    const url = `${developURL}/client/count/countClients`;
    const fetchConfig = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')},
    }
    try{
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      if(!jsonResponse.success){
        setErrorExist(true);
        setMsgError('Algo salió mal');

        setTimeout(()=>{
          setErrorExist(false);
          setMsgError('');
        }, 4000);

        return;
      }
      setResultClients(jsonResponse.result);
    } catch(error){
      setErrorExist(true);
      setMsgError('Algo salió mal, intentalo más tarde');

      setTimeout(()=>{
        setErrorExist(false);
        setMsgError('');
      },4000);
    }
  }

  const totalCredits = async () => {
    const {developURL} = service;
    const url = `${developURL}/credit/count/countEmployeesCredits`;
    const fetchConfig = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')},
    }
    try{
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      if(!jsonResponse.success){
        setErrorExist(true);
        setMsgError('Algo salio mal');

        setTimeout(()=>{
          setErrorExist(false);
          setMsgError('');
        },4000)

        return;

      }
      setResultEmployeeCredits(jsonResponse.result);
    }catch(error){
      setErrorExist(true);
      setMsgError('Algo salio mal, intente más tarde');

      setTimeout(()=>{
        setErrorExist(false);
        setMsgError('');
      },4000);
    }
  }

  //Función para obtener el total de empleados

  useEffect(()=>{
    totalClients();
    totalCredits();
  }, [])

  const renderCard = (title, subTitle) =>(
    <Card sx={{ display:'flex', alignItems: 'center',
      justifyContent: 'center' , flexDirection:'column', height: 200}}> 
       <Typography sx={{ fontSize: 20, fontWeight: "bold", textTransform: 'capitalize'}} color="text.secondary" gutterBottom>
             {title}
            </Typography>
            <Typography variant="h5" component="div">
              {subTitle}
            </Typography>
        </Card>
      )
  return (
    <>
    <h1>Home de Ejecutivo</h1>
    <Grid container spacing={3}>
    <Grid item xs={6}>
    {renderCard('Total de clientes', `${resultClients}`)}
    </Grid>
    <Grid item xs={6}>
    {renderCard('Total de creditos', `${resultEmployeeCredits}`)}
    </Grid>
  </Grid> 
  </>
  )
}

export default Home