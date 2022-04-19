import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';


const DepositarCuenta = () => {
  return (
    <Formik>
        <Form>
            <label>Numero de Cuenta</label>
            <Field type="number"/>
            <label>Cantidad a depositar:</label>
            <Field type="number"/>
            <Button variant="contained">Depositar</Button>
        </Form>
    </Formik>
  )
}

export default DepositarCuenta