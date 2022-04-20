import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

const EstadosCuenta = () => {
  return (
    <Formik>
        <Form>
            <label>Número de cuenta</label>
            <Field type="number"/>
            <label>Seleccionar periodo</label>
            <Field as="select">
                <option></option>
                <option></option>
                <option></option>
                <option></option>
            </Field>
            <Button variant="contained">Consultar</Button>
        </Form>
    </Formik>
  )
}

export default EstadosCuenta