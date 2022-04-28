import {useState, useEffect, useRef} from 'react'
import { Box, Button, Grid, TextField, Typography, Fab } from '@material-ui/core'
import service from '../../service'
import styled from '@emotion/styled'
import AddIcon from "@material-ui/icons/Add";
import { useFormik } from 'formik'
import * as Yup from 'yup'

const DivAvales = styled.div`
     padding: 1.5rem 3rem;
     margin: 0 1rem;
     border-top: 2px solid #F8F9F9;
`;

const CardAval = styled.div`
     background-color: #F8F9F9;
     padding: 1rem;
     border-radius: 10px;
     margin: 1rem 1rem;

`;


const PropiedadesAvales = ( { setDisabledTabs, 
                              setDisabledIdentifyTab, 
                              setDisabledPropertiesTab, 
                              setValue,
                              setGuaranteesStateMain,
                              setCredit } ) => {

     // Refs and Sataes about the form every Aval
     const inputFile1 = useRef();
     const inputFile2 = useRef();
     const inputFile3 = useRef();
     const [valueInput1, setValueInput1] = useState('');
     const [valueInput2, setValueInput2] = useState('');
     const [valueInput3, setValueInput3] = useState('');
     const [errorInput1, setErrorInput1] = useState('');
     const [errorInput2, setErrorInput2] = useState('');
     const [errorInput3, setErrorInput3] = useState('');

     const [guarantees, setGuarentees] = useState( JSON.parse(localStorage.getItem('gua')) )
   

     const validateForm = ( valueInputP, index ) => {
          if(valueInputP === '') {
               if (index === 0) setErrorInput1('*Los campos son obligatorios');
               if (index === 1) setErrorInput2('*Los campos son obligatorios');
               if (index === 2) setErrorInput3('*Los campos son obligatorios');
               return false;
          }

          if(!Number(valueInputP)) {
               if (index === 0) setErrorInput1('*Los valor deben ser númericos');
               if (index === 1) setErrorInput2('*Los valor deben ser númericos');
               if (index === 2) setErrorInput3('*Los valor deben ser númericos');
               return false;
          }

          if (Number(valueInputP) <= 0) {
               if (index === 0) setErrorInput1('*El valor debe ser mayor a 0');
               if (index === 1) setErrorInput2('*El valor debe ser mayor a 0');
               if (index === 2) setErrorInput3('*El valor debe ser mayor a 0');
               return false;
          }

          if (index === 0) setErrorInput1('');
          if (index === 1) setErrorInput2('');
          if (index === 2) setErrorInput3('');
          return true;
     }

     const savePropierties = async ( e, gId, noTextField ) => {
          
          e.preventDefault();
          let valueInputF;
          let fileInputF;

          if (noTextField === 0) {
              valueInputF = valueInput1;
              fileInputF = inputFile1;
          }

          if (noTextField === 1) {
               valueInputF = valueInput2;
               fileInputF = inputFile2;
          }

          if (noTextField === 2) {
               valueInputF = valueInput3;
               fileInputF = inputFile3;
          }

          if(!validateForm(valueInputF, noTextField))
               return; 

          let formData = new FormData();
          formData.append('GuaranteeId', gId);
          formData.append('file', fileInputF.current.files[0]);
          formData.append('value', valueInputF);

          const { developURL } = service;
          const url = `${developURL}/properties`;
          const fetchConfig = {
               method: 'POST', 
               body: formData,
               headers: { 'Authorization': localStorage.getItem('t') }
          }

          try {
               const response = await fetch(url, fetchConfig);
               const responseJSON = await response.json();
               if (!responseJSON.success) {
                    //Alerta de que algo salio mal
                    return
               }

               //Alerta de que todo salio bien
               const gua = JSON.parse(localStorage.getItem('gua'));
               const newGua = gua.filter( g => g.id != gId  );
               localStorage.setItem('gua', JSON.stringify(newGua) );
               setGuarentees( JSON.parse(localStorage.getItem('gua')) );

               if (noTextField === 0) setValueInput1('');
               if (noTextField === 1) setValueInput2('');
               if (noTextField === 2) setValueInput3('');
          } catch (error) {
               //Alerta algo salio mal con el servidor
          }
          
     }

     return (
       <div>
            <Grid container>
                  {    guarantees && guarantees.length > 0 &&
                       guarantees.map( (g, index) => (
                            <Grid item xs={12} md={4} key={g.id}>
                                 <CardAval>
                                      <Grid container item xs={12} justifyContent='flex-end'>
                                      </Grid>
                                      <Typography variant='body1'>
                                           { g.firstName } { g.lastName }
                                           <Typography variant='body1'>
                                                <b>Dirección:</b> { g.address }
                                           </Typography>
                                           <Typography variant='body1'>
                                                <b>Tel:</b> { g.phone }
                                           </Typography>
                                      </Typography>
                                      <form onSubmit={(e) => savePropierties(e, g.id, index)}>

                                        {/* INPUTS FILES */}
                                        { index === 0 && (
                                             <input
                                                  id={`upload${index}`}
                                                  name={`upload${index}`}
                                                  type="file"
                                                  ref={inputFile1}
                                                  style={{marginBottom: '1rem', marginTop: '1rem'}}
                                                  required
                                           />
                                        )}

                                        { index === 1 && (
                                             <input 
                                                  type="file"
                                                  id={`upload${index}`}
                                                  name={`upload${index}`}
                                                  ref={inputFile2}
                                                  style={{marginBottom: '1rem', marginTop: '1rem'}}
                                                  required
                                             />
                                        )}
                                        
                                        { index === 2 && (
                                             <input 
                                             type="file"
                                             id={`upload${index}`}
                                             name={`upload${index}`}
                                             ref={inputFile3}
                                             style={{marginBottom: '1rem', marginTop: '1rem'}}
                                             required
                                        />
                                        )}

                                        {/* INPUTS Text (value) */}
                                        { index === 0 && (
                                             <TextField 
                                                  fullWidth
                                                  id={index}
                                                  name={index}
                                                  label='Valor de la Propiedad'
                                                  value={valueInput1}
                                                  onChange={ (e) => setValueInput1(e.target.value)}
                                                  style={{marginBottom: '1rem'}}
                                                  error={Boolean(errorInput1 !== '')}
                                                  helperText={errorInput1}
                                             />
                                        )}

                                        { index === 1 && (
                                             <TextField 
                                                  fullWidth
                                                  id={index}
                                                  name={index}
                                                  label='Valor de la Propiedad'
                                                  value={valueInput2}
                                                  onChange={ (e) => setValueInput2(e.target.value)}
                                                  style={{marginBottom: '1rem'}}
                                                  error={Boolean(errorInput2 !== '')}
                                                  helperText={errorInput2}
                                             />
                                        )}
                                        
                                        { index === 2 && (
                                             <TextField 
                                                  fullWidth
                                                  id={index}
                                                  name={index}
                                                  label='Valor de la Propiedad'
                                                  value={valueInput3}
                                                  onChange={ (e) => setValueInput3(e.target.value)}
                                                  style={{marginBottom: '1rem'}}
                                                  error={Boolean(errorInput3 !== '')}
                                                  helperText={errorInput3}
                                             />
                                        )}
                                        
                                             <Button color='primary' 
                                                     variant="contained" 
                                                     type='submit'
                                             >
                                                  Guardar Propiedad del aval
                                             </Button>
                                      </form>
                                 </CardAval>
                            </Grid>
                       ) )
                  }
                  {
                       guarantees && guarantees.length === 0 && (
                            <Grid container justifyContent='center' alignItems='center'>
                                 <Grid container 
                                       item={12} 
                                       justifyContent='center' 
                                       alignItems='center' 
                                       direction='column' style={{width: '30rem', height: '20rem'}}>  
                                 <Typography variant="h5" color="initial">
                                        El proceso ha terminado correctamente!
                                 </Typography>
                                <Button color='primary' 
                                        variant="contained" 
                                        type='button'
                                        onClick={() => {
                                             //Disabled tabs "Credito" y "Avales"
                                             setDisabledTabs(true);
                                             //Active tab "Identifición de cliente"
                                             setDisabledIdentifyTab(false);
                                             //Disabled "Propiedades de avales"
                                             setDisabledPropertiesTab(true);
                                             //Go to tab "Identificación de cliente"
                                             setValue(0);
                                             //Remove guarantees state of Credito.jsx
                                             setGuaranteesStateMain([]);
                                             //Put default values of state credit of Credito.jsx
                                             setCredit({requestedAmount: '', debTerm: ''});
                                        }}
                                >
                                    Regresar al inicio
                                </Button> 
                                </Grid>
                            </Grid>

                       )
                  }

             </Grid>
       </div>
     )
}

export default PropiedadesAvales