import React from "react";
import CambiarContrasena from "./CambiarContrasena";
import { Box, Grid, Typography, Stack } from "@mui/material";

const Opciones = () => {
  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} mb={5}>
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" color="initial" sx={{ fontWeight: "600" }}>
              Opciones de la Cuenta
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={4} sx={{margin:"auto"}}>
          <CambiarContrasena />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Opciones;
