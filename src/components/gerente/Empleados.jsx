import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Typography, Button, Grid } from "@mui/material";
import { Box } from "@mui/material";
import Edit from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import service from "../../service";
import { useNavigate, useParams } from "react-router-dom";
import DoneIcon from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(-5),
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
    padding: theme.spacing(-1),
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
    width: 1,
    backgroundColor: "#103160",
  },
  row: {
    "& > *": {
      borderBotton: "unset",
    },
  },
}));

const Empleados = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  //Petición para obtener los registros de los empleados
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

  //Funcion que envia al componente de actualizar
  const EmpladoUpdate = (id) => {
    navigateTo("/empleados/actualiza/" + id);
  };

  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} mb={3}>
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" color="initial" sx={{ fontWeight: "600" }}>
              Empleados
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} mb={3}>
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
                      Rol
                    </TableCell>
                    <TableCell className={classes.trow} align="center">
                      Estado
                    </TableCell>
                    <TableCell className={classes.trow} align="center">
                      Area
                    </TableCell>
                    <TableCell className={classes.trow} align="center">
                      Acción
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className={classes.row}>
                      <TableCell align="center">{employee.firstName}</TableCell>
                      <TableCell align="center">{employee.lastName}</TableCell>
                      <TableCell align="center">{employee.role}</TableCell>
                      <TableCell align="center">
                        {employee.status === "true" ? <DoneIcon /> : <Clear />}
                      </TableCell>
                      <TableCell align="center">
                        {employee.BusinessUnit.name}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => EmpladoUpdate(employee.id)}
                          size="large"
                          startIcon={<Edit />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Empleados;
