import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import service from "../../service";
import * as Yup from "yup";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#01579b",
    },
  },
});

const CrearCuenta = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 8 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} sx={{textAlign:'center', marginBottom:'3rem'}}>
          <Typography variant="h4" color="initial">
            Seleccione el tipo de cuenta
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 300, cursor: "pointer", textAlign: "center" }}>
            <Link
              to="/crear-cliente/debito"
              state={{ type: "Debito" }}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{
                    mt: 2,
                    color: "rgba(0, 0, 0, 0.87)",
                    textDecoration: "inherit",
                    fontWeight: "bold",
                }}
                >
                  Débito
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
        <br></br>

        <Grid item xs={12} sm={6}>
          <Link
            to="/crear-cliente/credito"
            state={{ type: "Credito" }}
            style={{ textDecoration: "none" }}
            >
              
            <Card
              sx={{ maxWidth: 300, cursor: "pointer", textAlign: "center"}}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  sx={{
                    mt: 2,
                    color: "rgba(0, 0, 0, 0.87)",
                    textDecoration: "inherit",
                    fontWeight: "bold"
                  }}
                >
                  Crédito
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CrearCuenta;
