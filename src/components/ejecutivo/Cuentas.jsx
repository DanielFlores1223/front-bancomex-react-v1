import { Box, Button, Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../../service';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(-5),
    },
    tittle: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        paddin: theme.spacing(-1),
        color: theme.palette.text.secondary,
    },
    thead: {
        backgroundColor: "#103160",
    },
    trow: {
        color: "#ebedf1",
        backgroundColor: "#103160",
    },
    trow2: {
        color: "#ebedf1",
    },
}));

const Cuentas = ({id}) => {
    const classes = useStyles();
    const navigateTo = useNavigate();
    const[clients, setClients] = useState([]);


    const getClients = async () => {
        const { developURL } = service;
        const url = `${developURL}/client`;
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
        setClients(json.result);
      };
    
    //   const getAccount = async () =>{
    //       const { developURL }  = service;
    //       const url = `${developURL} /client/` + id `/accounts`;
    //       const fetchConfig = {
    //           method: "GET",
    //           headers: {
    //               "Content-Type": "application/json",
    //               Authorization: localStorage.getItem("t")
    //           },
    //           body: JSON.stringify(),
    //       };

    //       const response = await fetch(url, fetchConfig);
    //       const json = await response.json();
    //       console.log(json)
    //   }

    const EstadoCuenta = (id) => {
        navigateTo("/clientes/" + id);
      };



      useEffect(() => {
        getClients();
        // getAccount();
      }, []);
      

  return (
    <div>
        <Box display= 'flex'>
            <Grid
                container
                direction="column"
                alignItems='center'
                justifyContent='center'
                >
                    <Typography component="h2" variant="h4" color="primary">
                         Clientes
                    </Typography>
                </Grid>
        </Box>
        <Container className={classes.container} maxWidth="lg">
            <Paper className={classes.paper}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.trow} align="center">
                                    Nombre
                                </TableCell>
                                <TableCell className={classes.trow} align="center">
                                    Apellido
                                </TableCell>
                                <TableCell className={classes.trow} align="center">
                                    Curp
                                </TableCell>
                                <TableCell className={classes.trow} align="center">
                                    Email
                                </TableCell>
                                <TableCell className={classes.trow} align="center">
                                    Estado de Cuenta
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow
                                key={client.id}
                                >
                                    <TableCell
                                    align='center'
                                    >
                                        {client.firstName}
                                    </TableCell>
                                    <TableCell
                                    align='center'
                                    >
                                        {client.lastName}
                                    </TableCell>
                                    <TableCell
                                    align='center'
                                    >
                                        {client.curp}
                                    </TableCell>
                                    <TableCell
                                    align='center'
                                    >
                                        {client.email}
                                    </TableCell>
                                    <TableCell
                                    align='center'
                                    >
                                        <Button
                                        onClick={() => EstadoCuenta(client.id)}
                                        >Mostrar</Button>
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

export default Cuentas