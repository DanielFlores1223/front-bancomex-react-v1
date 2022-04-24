import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import service from '../../service';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nombre', width: 190 },
    { field: 'lastName', headerName: 'Apellido', width: 190 },
    { field: 'type', headerName: 'Tipo de cuenta', width: 190 },
    { field: 'amount', headerName: 'Saldo', width: 190 },
    { field: 'state', headerName: 'Estado', width: 190 }
  ];
  
  const rows = []; 

const Cuentas = () => {

    /*const cuentas = async = ({firstName, lastName, type, amount, state}) => {
        const { developURL } = service;
        const data = {firstName, lastName, type, amount, state}
        const url = `${developURL}/accounts`;
        const fetchConfig = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'} ,
            body: JSON.stringify( data )
        }
      };*/

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default Cuentas