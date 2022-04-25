import { useState, useEffect } from 'react';
import service from '../../service';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
import ImgCashBox from '../../img/cashBox (2).png';
import styled from '@emotion/styled';
import Spinner from '../common/spinner/Spinner';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const BoxStyled = styled(Box)`
  background-color: #F4F6F6;
  border: 2px solid #F4F6F6;
  border-top: 10px solid #103160;
  border-radius: 10px;
  padding: 2rem;
  margin-top: 2rem;
  &:hover {
    cursor: pointer;
    background-color: #EAEDED;
  }
`;

const EscogerCaja = ({ setChooseCashBox, setStartCash }) => {
     
     const [token, setToken] = useState((localStorage.getItem('t')) ?? '')
     const [cashBoxes, setCashBoxes] = useState([]);
     const [showSpinner, setShowSpinner] = useState(false);

     //request api
     const getCashBoxes = async () => {
   
       try {
         const { developURL } = service;
         const url = `${developURL}/cashboxes/byFilter/status/true`;
         const fetchConfig = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json', 'Authorization': token } ,
         }
   
         setShowSpinner(true);
         const response = await fetch(url, fetchConfig);
         const jsonResponse = await response.json();
         setShowSpinner(false);

         if(!jsonResponse.success) {
          return;
        }

         setCashBoxes(jsonResponse.result);
       } catch (error) {
         //TODO: Add alert
         console.log(error)
       }
     
     }
   
     useEffect(() => {
       getCashBoxes();
     }, []);

     const choseBox = async ( id ) => {

          try {
            
            const { developURL } = service;

            const data = { status: false }
            const url = `${developURL}/cashboxes/${id}`;
            const fetchConfig = {
               method: 'PUT', 
               headers: { 'Content-Type': 'application/json', 'Authorization': token },
               body: JSON.stringify( data )
            }
      
            setShowSpinner(true);
            const response = await fetch(url, fetchConfig);
            const jsonResponse = await response.json();
            setShowSpinner(false);

            if(!jsonResponse.success) {
              console.log(jsonResponse)
              return;
            }

            localStorage.setItem('cb', `${Date.now()},${id}${Date.now()},${Date.now()},${Date.now()}`);
            setChooseCashBox(true);
            setStartCash('wait');
          
          } catch (error) {
            //TODO: Add alert
            console.log(error)
          }
     }

     return (
          <div>
          <div>
              <Typography variant='h6'>
                  Escoge una Caja
              </Typography>
          </div>
          <Grid container spacing={2}>
            { showSpinner && (<Grid container 
                                    item xs={12} 
                                    alignItems='center' 
                                    justifyContent='center'
                              >    
                                  <Spinner /> 
                              </Grid>) }
            { cashBoxes.length > 0 && !showSpinner &&
  
                cashBoxes.map( cb => (
                  <Grid container 
                        item 
                        xs={12} 
                        md={4} 
                        alignItems='center'
                        justifyContent='center'
                        key={ `${Date.now()}${cb.id}${Math.floor(Math.random * 300)}` }
                  >
                      <BoxStyled onClick={ () =>  choseBox(cb.id) }>
                        <Grid container>
                          <Grid container 
                                item 
                                xs={12} 
                                justifyContent='flex-end' 
                                alignItems='center'
                          >
                               <Typography variant='body2'>
                                 Disponible
                               </Typography>
                              <FiberManualRecordIcon style={{color: '#4caf51'}} /> 
                          </Grid>
                        </Grid>
                        <img src={ImgCashBox} alt="cashbox img" style={{maxWidth: '100%', height: '15rem'}} />
                        <Typography variant='h4' align='center'>
                          {cb.name}
                        </Typography>
                      </BoxStyled>  
                  </Grid>
                ) )
  
            }
            
          </Grid>
      </div>
     )
}

export default EscogerCaja