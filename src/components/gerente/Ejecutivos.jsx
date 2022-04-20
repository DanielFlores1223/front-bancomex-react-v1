import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@material-ui/icons/Edit';
import DeleteIcon from   '@material-ui/icons/Delete';


function createData(id,nombre,apellido,clave){
    return {id, nombre,apellido,clave};
}
const rows = [
    createData('1','Mayte','Medrano','1234'),
    createData('2','Georgina','Perez','5678')
];



const Ejecutivos = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
         <TableContainer component={Paper}>
             <Table>
                 <TableHead>
                     <TableRow>
                        <TableCell align="right">id</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Apellido</TableCell>
                        <TableCell align="right">Clave</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                 </TableHead>
                 <TableBody>
                     {rows.map((row)=>(
                     <TableRow key={row.id}>
                         <TableCell align="right">{row.id}</TableCell>
                         <TableCell align="right">{row.nombre}</TableCell>
                         <TableCell align="right">{row.apellido}</TableCell>
                         <TableCell align="right">{row.clave}</TableCell>
                         <TableCell align="right">
                             <IconButton>
                                 <ModeEditIcon/>
                             </IconButton>
                             <IconButton>
                                 <DeleteIcon/>
                             </IconButton>
                         </TableCell>
                     </TableRow>
                     ))}
                 </TableBody>
             </Table>
         </TableContainer>
  </div>
  )
}

export default Ejecutivos