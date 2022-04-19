import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

const RetirarEfectivo = () => {
  return (
    <Formik>
        <Form>
            <label>Numero de Cuenta</label>
            <Field type="number"/>
            <label>Cantidad a retirar:</label>
            <Field type="number"/>
            <Button variant="contained">Retirar</Button>
        </Form>
    </Formik>
  )
}

export default RetirarEfectivo