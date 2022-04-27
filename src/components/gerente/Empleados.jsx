import { Button, ButtonGroup, Container, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Edit from "@material-ui/icons/Edit";
import React, { useEffect, useState } from 'react'
import service from '../../service';
import {useNavigate} from 'react-router-dom'
import ActualizaEmplado from './ActualizaEmplado';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  thead:{
    backgroundColor: '#103160',
},
trow: {
    color: '#ebedf1',
    backgroundColor: '#103160',
},
  // modal: {
  //   position: 'absolute',
  //   width: 400,
  //   backgroundColor: 'white',
  //   border: '2px solid #000',
  //   padding: '16px 32px 24px',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  // },

}));


const Empleados = () => {

  const classes = useStyles();
  const navigateTo= useNavigate();
  const [employees, setEmployees] = useState([]);
  // const [modal, setModal] = useState(false);

  // const abrirCerrarModal = () => {
  //   setModal(!modal)
  // }

  // const body = (
  //   <div className= {classes.modal}>
  //     <div align = "center">
  //       <h2>Empleado</h2>
  //     </div>
  //     <p>Lorem ipsum dolor sit, amet consectetur adipisicing
  //        elit. Animi aut adipisci non aperiam, beatae laboriosam
  //         architecto optio at nam quidem corporis. Corrupti commodi
  //          eos excepturi itaque amet sed, explicabo culpa?</p>
  //          <div align='right'>
  //            <Button onClick={() => abrirCerrarModal()}>Ok</Button>
  //          </div>
  //   </div>
  // )

  const getEmployees = async () => {
    const { developURL } = service;
    const url = `${developURL}/employees`;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
      body: JSON.stringify(),
    };

    const response = await fetch(url, fetchConfig);
    const json = await response.json();
    setEmployees(json.result);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const EmpladoUpdate = id => {
    navigateTo('/empleados/actualiza/'+id)
  }
  const EmpladoId = id => {
    navigateTo('/empleados/'+id); 
  }

  return (
    <div className={classes.root}>
      <Box display = "flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h4" color="primary">
                Empleados
              </Typography>
            </Box>
            </Box>  
      <Container className={classes.container} maxWidth="lg">
        <Paper className = {classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>

                    <TableCell className={classes.trow} align="center">Nombre</TableCell>
                    <TableCell className={classes.trow} align="left">Apellido</TableCell>
                    <TableCell className={classes.trow} align="left">Rol</TableCell>
                    <TableCell className={classes.trow} align="center">Estado</TableCell>
                    <TableCell className={classes.trow} align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell align="center">{employee.firstName}</TableCell>
                      <TableCell align="left">{employee.lastName}</TableCell>
                      <TableCell align="left">{employee.role}</TableCell>
                      <TableCell align="center">{employee.status}</TableCell>
                      <TableCell align="center">
                        {/* <ButtonGroup color="primary" aria-label="outlined"> */}
                          <Button onClick={()=> EmpladoId(employee.id)} size='large' startIcon = {<InfoIcon/>}/>
                          {/* <Modal
                          open={modal}
                          onClose={abrirCerrarModal}>
                            {body}
                          </Modal> */}
                          &nbsp;
                          <Button onClick={() => EmpladoUpdate(employee.id)} size='large' startIcon = {<Edit/>}/>
                        {/* </ButtonGroup> */}
                      </TableCell>
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Paper>
      </Container>
    </div>
  )
}

export default Empleados