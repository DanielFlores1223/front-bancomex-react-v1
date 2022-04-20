import React from 'react';
import { Form,Field,Formik } from 'formik';
import Button from '@mui/material/Button';

//llevara el lector de codigo qr => pintara nombre o curp, clave de ine para que cajero verifique identidad
//el cajero buscara por telefono y correo
//
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