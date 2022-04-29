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
        enqueueSnackbar("Se ha cambiado tu contrseña satisfactoriamente", {
          preventDuplicate: true,
          variant: "success",
        });
        return;
      }

      //Todo bien
      enqueueSnackbar(responseJSON.msg, {
        preventDuplicate: true,
        variant: "success",
      });
      setCredits(responseJSON.result);
    } catch (error) {
      //alerta algo salio mal
      enqueueSnackbar("Hubo un error intentalo de nuevo", {
        preventDuplicate: true,
        variant: "warning",
      });
    }
  };
  useEffect(() => {
    getCredits();
  }, [filter]);

  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              paddingBottom: "1rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Typography variant="h5" color="initial" sx={{ fontWeight: "600" }}>
              Creditos a Aprobar
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: "300px" }}>
            <InputLabel id="selectFiltro">Filtro de Búsqueda</InputLabel>
            <Select
              labelId="selectFiltro"
              id="status"
              name="status"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value={"Todo"}>Todo</MenuItem>
              <MenuItem value={"Aprobado"}>Aprobado</MenuItem>
              <MenuItem value={"Rechazado"}>Rechazado</MenuItem>
              <MenuItem value={"Pendiente"}>Pendiente</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid container spacing={3} sx={{ width: "90%", margin: "auto", marginTop:'3rem' }}>
          {credits &&
            credits.length > 0 &&
            credits.map((c) => (
              <Grid item xs={12} md={4} key={c.id}>
                <Card>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" component="div">
                      {c.status}
                    </Typography>
                    <Typography variant="body1" component="div">
                      <b>Monto Solicitado:</b>  {`$ ${c.requestedAmount.toLocaleString('en-US', {maximumFractionDigits:2})}`}
                    </Typography>
                    <Typography variant="body1" component="div">
                    {/* <b>Fecha de Solicitud:</b>{c.requestedDate} {new Date(c.requestedDate).toLocaleDateString('en-US')} */}
                      <b>Fecha de Solicitud:</b> {c.applicationDate}
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
