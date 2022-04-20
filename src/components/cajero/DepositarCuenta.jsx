import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';


//Agregar un toast al momento de dar click en depositar: deposito exitoso o no exitoso
//se limpiara el formulario
const DepositarCuenta = () => {
  return (
    <Formik>
        <Form>
            <label>Numero de Cuenta</label>
            <Field type="number"/>
            <label>Nombre del cliente</label>
            <Field type="text"/>
            <label>Cantidad a depositar:</label>
            <Field type="number"/>
            <Button variant="contained">Depositar</Button>
        </Form>
    </Formik>
  )
}

export default DepositarCuenta