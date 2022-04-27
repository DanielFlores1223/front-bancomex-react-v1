import { useState, useRef, ReactDOM } from 'react'
import { QrReader } from 'react-qr-reader'
import service from '../../service'
import { Typography, Grid, Button } from '@material-ui/core'

const QrReaderEjec = ( { setValue, setClientId } ) => {
     const [data, setData] = useState('');
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

          console.log(jsonResponse)
          if (!jsonResponse.success) {
               return;

          }

          setName(jsonResponse.result[0].firstName);
          setLastName(jsonResponse.result[0].lastName);
          setCurp(jsonResponse.result[0].curp);
          setClientId(jsonResponse.result[0].id)
     }
    
     return (
        <Typography component="span">
               <Grid component="span">
                    <>
                      <QrReader
                        onResult={(result, error) => {
                          if (!!result) {
                            setData(result?.text);
                            getCliente(result?.text)
                          }                  
                        }}
                        style={{ width: '100px' }}
                      />
                      <p>{data}</p>
                      <p>Nombre completo del cliente: {name} {lastName} </p>
                      <p>Solicitale al cliente una identificación para comprar su CURP</p>
                      <p>CURP: {curp}</p>
                      <Button color='primary' onClick={() => { setValue(1) }}>
                           Cliente verificado
                      </Button>
                    </>
               </Grid>
        </Typography>
     )
}

export default QrReaderEjec