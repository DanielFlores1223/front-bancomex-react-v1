import { Button, Grid, InputLabel, Select, MenuItem } from '@material-ui/core'
import {useState, useEffect} from 'react'
import service from '../../service'
import { useNavigate } from 'react-router-dom'

const ListaCreditos = () => {

     const [ credits, setCredits ] = useState([]);
     const [ filter, setFilter ] = useState('Todo');
     const navigateTo = useNavigate();

     const getCredits = async () => {
          const { developURL } = service;
          const url = `${developURL}/credit/status/${filter}`;
          const fetchConfig = {
               method: 'GET', 
               headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('t')} ,
          }

          try {
               const response = await fetch(url, fetchConfig);
               const responseJSON = await response.json();

               if (!responseJSON) {
                    //Alerta no se hizo correctamente la peticion
                    return;
               }

               //Todo bien
               setCredits(responseJSON.result);

          } catch (error) {
               //alerta algo salio mal
          }
     }

     useEffect(() => {
          getCredits();
     }, [filter]);

     return (
       <div>
            <Grid container>
                 <Grid container item xs={12} >
                    <InputLabel id="selectFiltro">Filtro de Búsqueda</InputLabel>
                         <Select
                           labelId="selectFiltro"
                           id="status"
                           name='status'
                           value={filter}
                           onChange={ (e) => setFilter(e.target.value) }
                         >
                         <MenuItem value={'Todo'}>Todo</MenuItem>
                         <MenuItem value={'Aprobado'}>Aprobado</MenuItem>
                         <MenuItem value={'Rechazado'}>Rechazado</MenuItem>
                         <MenuItem value={'Pendiente'}>Pendiente</MenuItem>
                    </Select>
                 </Grid>
               {
                    credits && credits.length > 0 && (
                         credits.map( c => (
                              <Grid item xs={12} md={4} key={c.id}>
                                   <p>{c.status}</p>
                                   <Button color='primary' 
                                           onClick={() => navigateTo(`/creditos/${c.id}`)}
                                   >
                                        Info
                                   </Button>
                              </Grid>
                         ) )
                    )
               }
            </Grid>
       </div>
     )
}    

export default ListaCreditos