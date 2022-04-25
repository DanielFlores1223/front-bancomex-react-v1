import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import service from '../../service';
import { Button, ButtonGroup, Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Edit from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
      color: '',
    },
    paper: {
      padding: theme.spacing(2),
      color: 'white',
    },
    button:{
        alignItems: 'right',
        textAlign: 'right',
        marginTop: theme.spacing(2),
        backgroundColor: '#103160',
        color: 'white',
    },
    thead:{
        backgroundColor: '#103160',
    },
    trow: {
        color: '#ebedf1',
        backgroundColor: '#103160',
    }
}));

const EmpleadosId = () => {
    const classes = useStyles();

  const [employees, setEmployees] = useState([]);

  const { id } = useParams()

  const getEmployee = async () => {
    const { developURL } = service;
    const url = `${developURL}/employees/`+id;
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
    getEmployee();
  }, []);
  return (
    <div className={classes.root}>
      <Box display = "flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h4" color="primary">
                Empleado
              </Typography>
            </Box>
            </Box>  
      <Container className={classes.container} maxWidth="lg">
        <Paper className = {classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow className={classes.trow}>
                    <TableCell className={classes.trow} align="right">Id</TableCell>
                    <TableCell className={classes.trow} align="center">Nombre</TableCell>
                    <TableCell className={classes.trow} align="left">Apellido</TableCell>
                    <TableCell className={classes.trow} align="left">Rol</TableCell>
                    <TableCell className={classes.trow} align="center">Estado</TableCell>
                    <TableCell className={classes.trow} align="center">Area</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.ID}>
                      <TableCell align="right">{employee.id}</TableCell>
                      <TableCell align="center">{employee.firstName}</TableCell>
                      <TableCell align="left">{employee.lastName}</TableCell>
                      <TableCell align="left">{employee.role}</TableCell>
                      <TableCell align="center">{employee.status}</TableCell>
                      <TableCell align="center">{employee.BusinessUnitId}</TableCell>
                      
                    </TableRow>

                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Paper>
      </Container>
      <Link
      className={classes.button}
      align="right" 
      to='/empleados'
      >
          Ok</Link>
    </div>
  )
}

export default EmpleadosId