import React from "react";
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import { useSnackbar } from "notistack";


const CambiarContrasena = () => {

  // Hook de Notistack
  const { enqueueSnackbar } = useSnackbar();


    // Fetch para crear el cliente
    const cambiaContrasena = async (values) => {
      const { developURL } = service;
      const data = {
        //valores hacia el backend
      };
      // Verifica los datos de la petición
      console.log(data);
      const url = `${developURL}/client`;
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
              variant: "success",
            }
          );
          
  
          return;
        }
        enqueueSnackbar(jsonResponse.msg, {
          variant: "error",
        });
      } catch (error) {
        enqueueSnackbar("Hubo un errorintentalo de nuevo", {
          variant: "error",
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
          id="password"
          name="password"
          label="Contraseña Actual"
          value=""
          onChange={() => {}}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          fullWidth
          size="medium"
          id="password"
          name="password"
          label="Nueva Contraseña"
          value=""
          onChange={() => {}}
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
        >
          Actualizar Contraseña
        </Button>
      </Grid>
    </Grid>
  );
};

export default CambiarContrasena;
