import { useState, useRef, ReactDOM } from 'react'
import { QrReader } from 'react-qr-reader'
import service from '../../service'
import { Typography, Grid, Button } from '@mui/material'
import Spinner from '../common/spinner/Spinner'

const QrReaderEjec = ( { setValue, setClientId, setDisabledTabs } ) => {
     const [name, setName] = useState('');
     const [lastName,  setLastName] = useState('');
     const [curp, setCurp] = useState('');

     const getCliente = async ( id = '' ) => {
          const idNew = id.split(':')
          const url = `${service.developURL}/client/${idNew[1]}`
          const fetchConfig = {
               method: 'GET',
               headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t') } 
          }

          const response = await fetch(url, fetchConfig);
          const jsonResponse = await response.json();

          if (!jsonResponse.success) {
               return;

          }

          setName(jsonResponse.result[0].firstName);
          setLastName(jsonResponse.result[0].lastName);
          setCurp(jsonResponse.result[0].curp);
          setClientId(jsonResponse.result[0].id)
     }
    
     return (
          <Grid container>
               <Grid container
                     item
                     xs={12}
                     justifyContent='center'
          >
               <div>
                    {/* QR Section */}
                    <div style={{width: '300px', margin: '0 auto'}}>
                       
                           <QrReader
                             onResult={(result, error) => {
                               if (!!result) {
                                 getCliente(result?.text)
                               }                  
                             }}
                             style={{ width: '100%' }}
                           />
                         
                    </div>
                      { curp !== '' ? (
                           /* Client Info section */
                           <Grid container xs={12} direction='column' sx={{textAlign: "center"}}>
                              <Typography variant='h6'sx={{fontWeight: '500'}}>
                                   Cliente:
                              </Typography>
                              <Typography variant='h5'sx={{fontWeight: '600', marginBottom: '1rem'}}>
                              {name} {lastName}
                              </Typography>

                                   <Typography variant='body1' sx={{marginBottom: '1rem'}} >
                                        Solicitale al cliente una identificación para comprar su CURP
                                   </Typography>
                                   <Typography variant='h6' >
                                        CURP: {curp}
                                   </Typography>
                              <Grid container xs={12} justifyContent='center'
                              sx={{marginTop:'2rem'}}>
                                <Button color="primary" 
                                        variant="contained"  
                                        onClick={() => { setValue(1); setDisabledTabs(false) }}
                                >
                                     Cliente verificado
                                </Button>
                              </Grid>
                           </Grid>

                      ) : (
                         /* Spinner section */
                         <div>
                              <Spinner />
                              <Typography variant='body1' align='center'>
                                   Esperando QR...
                              </Typography>
                         </div>

                      ) }

               </div>
          </Grid>
          </Grid>
     )
}

export default QrReaderEjec