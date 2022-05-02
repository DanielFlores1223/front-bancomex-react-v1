import React from "react";
import { useEffect, useState } from "react";
import service from "../../service";
import { styled } from "@mui/material/styles";
import { Grid, Box, Paper, Card, CardMedia, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [errorExist, setErrorExist] = useState(false);
  const [msgError, setMsgError] = useState(false);
  const [resultClients, setResultClients] = useState({});
  const [resultEmployeeCredits, setResultEmployeeCredits] = useState({});

  //Función para obtener clientes

  const totalClients = async () => {
    const { developURL } = service;
    const url = `${developURL}/client/count/countClients`;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        setErrorExist(true);
        setMsgError("Algo salió mal");

        setTimeout(() => {
          setErrorExist(false);
          setMsgError("");
        }, 4000);

        return;
      }
      setResultClients(jsonResponse.result);
    } catch (error) {
      setErrorExist(true);
      setMsgError("Algo salió mal, intentalo más tarde");

      setTimeout(() => {
        setErrorExist(false);
        setMsgError("");
      }, 4000);
    }
  };

  const totalCredits = async () => {
    const { developURL } = service;
    const url = `${developURL}/credit/count/countEmployeesCredits`;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      if (!jsonResponse.success) {
        setErrorExist(true);
        setMsgError("Algo salio mal");

        setTimeout(() => {
          setErrorExist(false);
          setMsgError("");
        }, 4000);

        return;
      }
      setResultEmployeeCredits(jsonResponse.result);
    } catch (error) {
      setErrorExist(true);
      setMsgError("Algo salio mal, intente más tarde");

      setTimeout(() => {
        setErrorExist(false);
        setMsgError("");
      }, 4000);
    }
  };

  //Función para obtener el total de empleados

  useEffect(() => {
    totalClients();
    totalCredits();
  }, []);

  const renderCard = (title, subTitle, img) => (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: 300,
        maxWidth: 300,
      }}
    >
      <CardMedia component="img" height="340" image={img} alt="Paella dish" />

      <Typography
        sx={{ fontSize: 20, fontWeight: "600", marginTop: "20px" }}
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography variant="h5" component="div" sx={{ marginBottom: "20px" }}>
        {subTitle}
      </Typography>
    </Card>
  );
  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} mb={5}>
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" color="initial" sx={{ fontWeight: "600" }}>
              Información General del Banco
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={3} sx={{ margin: "auto" }}>
            <Grid item xs={12} md={6}>
              {renderCard(
                "Total de clientes",
                `${resultClients}`,
                "https://res.cloudinary.com/cardiadev/image/upload/v1651160167/bancomex/cuentas_activas_hpiez5.jpg"
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {renderCard(
                "Total de creditos",
                `${resultEmployeeCredits}`,
                "https://res.cloudinary.com/cardiadev/image/upload/v1651160166/bancomex/creditos_aprobado_hvm5lg.jpg"
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
