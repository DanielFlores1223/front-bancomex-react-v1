import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

const SolicitarCredito = () => {
  return (
    <Formik>
        <Form>
            <label>Trabajo actual</label>
            <Field type="text"/>
            <label>Salario</label>
            <Field type="number"/>
            <label>Antiguedad</label>
            <Field type="number"/>
            <label>Domicilio</label>
            <Field type="text"/>
            <label>Patrimonio</label>
            <Field type="checkbox"/><label>Casa propia</label>
            <Field type="checkbox"/><label>Casa rentada</label>
            <label>Monto solicitado</label>
            <Field type="number"/>
        </Form>
    <Formik>
        <Form>
            <label>Nombre</label>
            <Field type="text"/>
            <label>Apellido</label>
            <Field type="text"/>
            <label>Telefono</label>
            <Field type="text"/>
            <label>Correo electrónico</label>
            <Field type="email"/>
            <label>Domicilio</label>
            <Field type="text"/>
            <label>Valor propiedad</label>
            <Field type="number"/>
            <Button variant="contained">Guardar</Button>
        </Form>
    </Formik>
    </Formik>
  )
}

export default SolicitarCredito
