import React from 'react';
import { Form,Field,Formik } from 'formik';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function createData(cuenta,fecha,ejecutivo){

    return{ cuenta,fecha,ejecutivo };
}

const rows = [
    createData('','','' )
];

const Cuentas = () => {
  return (
    <Formik>
        <Form>
            <label>Nombre del cliente:</label>
            <Field type="text"/>
            <label>No. Ejecutivo</label>
            <Field as="select">
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </Field>
            <label>Fecha</label>
            <Field type="date"/>
        </Form>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Cuentas</TableCell>
                        <TableCell align="right">Cuenta</TableCell>
                        <TableCell align="right">Fecha</TableCell>
                        <TableCell align="right">Ejecutivo</TableCell>
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
                        <TableCell align="right">{row.cuenta}</TableCell>
                        <TableCell align="right">{row.fecha}</TableCell>
                        <TableCell align="right">{row.ejecutivo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Formik>
  )
}

export default Cuentas