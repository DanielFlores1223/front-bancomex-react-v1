import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function createData(nombre,cuenta,tipo,status){
    return{nombre,cuenta,tipo,status,
    otras:[
        {nombre:'',cuenta:1234,tipo:'debito',status:true}
    ]}
   
}


const CuentasCliente = () => {
  return (
    <div>CuentasCliente</div> 
  )
}

export default CuentasCliente