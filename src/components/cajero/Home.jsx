import { useState, useEffect } from 'react';
import service from '../../service';
import { Grid } from '@material-ui/core';

const Home = () => {

  const [token, setToken] = useState((localStorage.getItem('t')) ?? '')
  const [cashBoxes, setCashBoxes] = useState([]);


  const getCashBoxes = async () => {

    try {
      const { developURL } = service;
      const url = `${developURL}/cashboxes`;
      const fetchConfig = {
         method: 'GET', 
         headers: { 'Content-Type': 'application/json', 'Authorization': token } ,
      }

      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      setCashBoxes(jsonResponse.result);
    } catch (error) {
      console.log(error)
    }
  
  }

  useEffect(() => {
    getCashBoxes();
  }, []);

  return (
    <div>
        <Grid container>
          { cashBoxes.length > 0 &&

              cashBoxes.map( cb => (
                <Grid item xs={12} md={4}>
                    <p> {cb.name} </p>
                </Grid>
              ) )

          }
          
        </Grid>
    </div>
  )
}

export default Home