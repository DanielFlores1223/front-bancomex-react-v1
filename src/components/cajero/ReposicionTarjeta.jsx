import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

const ReposicionTarjeta = () => {
  return (
    <Formik>
        <Form>
            <label>Ingrese el nombre del cliente</label>
            <Field type="text"/>
            <label>Numero de tarjeta</label>
            <Field type="number"/>
            <label>Motivo de reposicion</label>
            <Field as ="select">
                <option></option>
                <option>Extravio</option>
                <option>Robo</option>
                <option>Deterioro</option>
                <option>Destrucion</option> 
            </Field>
            <Button variant="contained">Reponer</Button>
        </Form>
    </Formik>
  )
}

export default ReposicionTarjeta