import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

const CrearEjecutivos = () => {
  return (
    <Formik>
        <Form>
            <label>Nombre(s)</label>
            <Field type="text"/>
            <label>Apellidos</label>
            <Field type="text"/>
            <label>Area</label>
            <Field as="select">
                <option></option>
                <option>Caja</option>
                <option>Credito</option>
                <option>Debito</option>
            </Field>
            <label>Sucursal</label>
            <Field as="select">
                <option>Patria</option>
            </Field>
            <Button variant="contained">Guardar</Button>
        </Form>
    </Formik>
  )
}

export default CrearEjecutivos