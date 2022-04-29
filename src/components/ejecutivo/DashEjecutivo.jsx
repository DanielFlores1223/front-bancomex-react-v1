import React from 'react';
import {useEffect, useState} from 'react'
import service from '../../service';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const DashEjecutivo = () => {
  const [errorExist, setErrorExist] = useState(false);
  const [msgError,setMsgError] = useState(false);
  const [resultAccounts, setResultAccounts]= useState({});
  const [resultCredits, setResultCredits]= useState({});
  const [resultAmount, setResultAmount]= useState({});


  return (
    <div>
         <h1>Home de Ejecutivo</h1>
    <Grid container spacing={3}>
    <Grid item xs={4}>
    {renderCard('Total cuentas activas')}
    </Grid>
    <Grid item xs={4}>
    {renderCard('Total creditos otorgados')}
    </Grid>
    <Grid item xs={4}>
    {renderCard('Monto total del banco')}
    </Grid>
  </Grid> 
    </div>
  )
}

export default DashEjecutivo