import {
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ListaCreditos = () => {
  const [credits, setCredits] = useState([]);
  const [filter, setFilter] = useState("Todo");
  const navigateTo = useNavigate();
  // Hook de Notistack
  const { enqueueSnackbar } = useSnackbar();

  const getCredits = async () => {
    const { developURL } = service;
    const url = `${developURL}/credit/status/${filter}`;
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
    };

    try {
      const response = await fetch(url, fetchConfig);
      const responseJSON = await response.json();

      if (!responseJSON) {
        //Alerta no se hizo correctamente la peticion
        enqueueSnackbar("Hubo un error al actualizar la información", {
          preventDuplicate: true,
          variant: "error",
        });
        return;
      }

      //Todo bien
      // responseJSON.msg;
      // enqueueSnackbar(`Estos son todos los creditos disponibles`, {
      //   preventDuplicate: true,
      //   variant: "success",
      // });
      setCredits(responseJSON.result);
    } catch (error) {
      //alerta algo salio mal
      enqueueSnackbar("Hubo un error con el servidor intentalo de nuevo", {
        preventDuplicate: true,
        variant: "warning",
      });
    }
  };
  useEffect(() => {
    getCredits();
  }, [filter]);

  //funcion para cambiar fecha de iso 8601 a formato normal
  const changeDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    if (day < 10) {
      return `${day}/0${month}/0${year}`;
    }
    if (month < 10) {
      return `${day}/0${month}/${year}`;
    }
    if (day < 10 && month < 10) {
      return `${day}/0${month}/0${year}`;
    }
    return `${day}/${month}/${year}`;
  };

  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" color="initial" sx={{ fontWeight: "600" }}>
              Creditos a Aprobar
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="selectFiltro">Filtro de Búsqueda</InputLabel>
            <Select
              labelId="selectFiltro"
              id="status"
              name="status"
              value={filter}
              label="Filtro de Búsqueda"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value={"Todo"}>Todo</MenuItem>
              <MenuItem value={"Aprobado"}>Aprobado</MenuItem>
              <MenuItem value={"Rechazado"}>Rechazado</MenuItem>
              <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ width: "95%", margin: "auto", marginTop: "1rem" }}
        >
          {credits &&
            credits.length > 0 &&
            credits.map((c) => (
              <Grid item xs={12} md={4} key={c.id}>
                <Card style={{ backgroundColor: "#fcfcfc" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ marginBottom: "1rem", fontWeight: "500" }}
                    >
                      {c.status}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <b>Monto:</b>{" "}
                      {Intl.NumberFormat("en-US", { style: "currency", currency: "USD"}).format(c.requestedAmount)}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {/* <b>Fecha de Solicitud:</b>{c.requestedDate} {new Date(c.requestedDate).toLocaleDateString('en-US')} */}
                      <b>Solicitud:</b> {changeDate(c.applicationDate)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => navigateTo(`/creditos/${c.id}`)}
                      sx={{ margin: "auto", marginBottom: "1rem" }}
                    >
                      Ver Información
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListaCreditos;
