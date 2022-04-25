import {
  Button,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ActualizaEmplado = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams();

  //   const getEmployee = async () => {
  //     const { developURL } = service;
  //     const url = `${developURL}/employees/`+id;
  //     const fetchConfig = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: localStorage.getItem("t"),
  //       },
  //       body: JSON.stringify(),
  //     };

  //     const response = await fetch(url, fetchConfig);
  //     let json = await response.json();
  //     let datos = json.result;
  //         (json) => {
  //             setFname(json.result[0].firstName)
  //             setLname(result.user.lname)
  //             setUsername(result.user.username)
  //             setEmail(result.user.email)
  //             setAvatar(result.user.avatar)
  //         }
  //         console.log(firstName);

  //   };

  //   useEffect(() => {
  //     getEmployee();
  //   }, []);

  useEffect(() => {
    const { developURL } = service;
    const url = `${developURL}/employees/` + id;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
      body: JSON.stringify(),
    };

    fetch(url, fetchConfig)
      .then((res) => res.json())
      .then((result) => {
        setFirstName(result.result[0].firstName);
        setLastName(result.result[0].lastName);
        setRole(result.result[0].role);
        setStatus(result.result[0].status);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
        'firstName': firstName,
        'lastName': lastName,
        'role': role,
        'status': status,
    }
    // const { developURL } = service;
    // const url = `${developURL}/employees/:id`;
    // const fetchConfig = {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("t"),
    //   },
    fetch('http://localhost:4000/api/v1/employees/'+id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
        (result) =>{
            alert(['Empleado Actualizado con éxito'])
            if(result.result[0].status === 'true'){
                window.location.href = '/empleados'
            }
        }
    )  
    

  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Empleado
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                value={firstName}
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                value={lastName}
                label="Apellido"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="role"
                value={role}
                label="Rol"
              /> */}
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
              fullWidth
              variant="outlined"
                labelId="demo-simple-select-label"
                id="role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <MenuItem value='Cajero'>Cajero</MenuItem>
                <MenuItem value='Ejecutivo'>Ejecutivo</MenuItem>
                <MenuItem value='Gerente'>Gerente</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id='role'
                        value={role}
                        label='Estado'
                        /> */}
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
              fullWidth
              variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value='activo'>Activo</MenuItem>
                <MenuItem value='inactivo'>Inactivo</MenuItem>
              </Select>
            </Grid>
            {/* <Grid item xs={12} sm={4}> */}
              {/* <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id='role'
                        value={role}
                        label='Estado'
                        /> */}
              {/* <InputLabel id="demo-simple-select-label">Area</InputLabel>
              <Select
              variant="outlined"
              fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
              >
                <MenuItem value='activo'>Activo</MenuItem>
                <MenuItem value='inactivo'>Inactivo</MenuItem>
              </Select>
            </Grid> */}
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Actualizar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ActualizaEmplado;
