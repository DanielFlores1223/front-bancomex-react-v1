import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id,nombre,apellido,clave){

    return{ id,nombre,apellido,clave };
}

const rows = [
    createData('1', 'Mayte', 'Medrano', '12REM0' )
];


const Ejecutivos = () => {
  return (
    <Formik>
        <Form>
            <label>Seleccionar ejecutivo</label>
            <Field as="select">
                <option>Ejecutivo 1</option>
                <option>Ejecutivo 2</option>
                <option>Ejecutivo 3</option>
                <option>Ejecutivo 4</option>
            </Field>
        </Form>
        <br></br>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ejecutivos</TableCell>
                        <TableCell align="right">id</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Apellidos</TableCell>
                        <TableCell align="right">Clave</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key = {row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                         <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.nombre}</TableCell>
                        <TableCell align="right">{row.apellido}</TableCell>
                        <TableCell align="right">{row.clave}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Formik>
  )
}

export default Ejecutivos