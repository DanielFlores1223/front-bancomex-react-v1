import {React, useState} from "react";
import service from "../../../service";
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";



const CambiarContrasena = () => {

  // Hook de Notistack
  const { enqueueSnackbar } = useSnackbar();

  const [passwordBefore, setPasswordBefore] = useState('');
  const [password, setPassword] = useState('');


    // Fetch para crear el cliente
    const cambiaContrasena = async (values) => {
      const { developURL } = service;
      const data = {
        //valores hacia el backend
        passwordBefore,
        password
      };
      // Verifica los datos de la petición
      console.log(data);
      const url = `${developURL}/employees/changePassword`;
      const fetchConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("t"),
        },
        body: JSON.stringify(data),
      };
  
      try {
        const response = await fetch(url, fetchConfig);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
  
        if (jsonResponse.success) {
          enqueueSnackbar(
            "Se ha cambiado tu contrseña satisfactoriamente",
            {
              preventDuplicate: true,
              variant: "success",
            }
          );
          return;
        }
        enqueueSnackbar(jsonResponse.msg, {
          preventDuplicate: true,
          variant: "error",
        });
      } catch (error) {
        enqueueSnackbar("Hubo un error intentalo de nuevo", {
          preventDuplicate: true,
          variant: "warning",
        });
      }
    };


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" color="initial" sx={{ fontWeight: "500" }}>
          Cambiar Contraseña
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          size="medium"
          id="passwordBefore"
          name="passwordBefore"
          label="Contraseña Actual"
          value={passwordBefore}
          onChange={() => setPasswordBefore(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          size="medium"
          id="Password"
          name="Password"
          label="Nueva Contraseña"
          value={password}
          onChange={() => setPassword(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            marginTop: "1rem",
          }}
          onClick={() => cambiaContrasena()}
        >
          Actualizar Contraseña
        </Button>
      </Grid>
    </Grid>
  );
};

export default CambiarContrasena;
