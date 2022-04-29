import {
  Button,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../service";
import DoneIcon from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(-5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CEE0E0",
    width: "900px",
    alignItems: "center",
  },
  paper1: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CEE0E0",
    width: "900px",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#103160",
    color: "#ebedf1",
  },
  container2: {
    marginTop: theme.spacing(-1),
  },
}));

const EstadoCuenta = () => {
  const { id } = useParams();

  const classes = useStyles();

  const [client, setClient] = useState([]);
  const [cuenta, setCuenta] = useState([]);

  const getAccount = async () => {
    const { developURL } = service;
    const url = `${developURL}/client/` + id + `/accounts`;
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
    setClient(json.result);
    setCuenta(json.result.Accounts);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Container className={classes.container}>
      <div>
        <Grid className={classes.paper2}>
          <Typography className={classes.paper2} component="h2" variant="h7 ">
            Información de la Cuenta
          </Typography>
          <Grid item xs={1} sm={5} className={classes.paper2}>
            {cuenta &&
              cuenta.length > 0 &&
              cuenta.map((c) => {
                return (
                  <>
                    <InputLabel id="cuentas">Cuenta</InputLabel>
                    <Select
                      labelId="cuentas"
                      id="cuentas"
                      name="cuentas"
                      variant="outlined"
                      value={c.type}
                      label="Cuentas"
                    >
                      <MenuItem key={c.id} value={c.type}>
                        {c.type}
                      </MenuItem>
                    </Select>
                  </>
                );
              })}
          </Grid>
          <>
            {cuenta &&
              cuenta.length > 0 &&
              cuenta.map((c) => {
                return (
                  <Container className={classes.container2}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="h5" color="initial">
                          Información personal
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          variant="h5"
                          color="initial"
                          sx={{ fontWeight: "600", color: "red" }}
                        >
                          Cuenta
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography
                          variant="h5"
                          color="initial"
                          sx={{ fontWeight: "600", color: "red" }}
                        >
                          Transacciones
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Grid>
                          <Typography component="h3" variant="h6">
                            Nombre
                          </Typography>
                          <p key={client.id}>{client.firstName}</p>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <Typography component="h3" variant="h6">
                            Apellido
                          </Typography>
                          <p key={client.id}>{client.lastName}</p>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Typography component="h3" variant="h6">
                            RFC
                          </Typography>
                          <p key={client.id}>{client.rfc}</p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Grid>
                          <Typography component="h3" variant="h6">
                            Tipo de Cuenta
                          </Typography>
                          <p key={c.id}>{c.type}</p>
                        </Grid>
                        <Grid>
                          <Typography component="h3" variant="h6">
                            Número de Cuenta
                          </Typography>
                          {c.Cards.map((cu) => (
                            <p key={cu.id}>{cu.cardNumber}</p>
                          ))}
                        </Grid>
                        <Grid>
                          <Typography component="h3" variant="h6">
                            Estado
                          </Typography>
                          {/* {c.map((cu) => (
                            <p>{cu.state}</p>
                          ))} */}
                          <p key={c.id}>
                            {c.state === true ? <DoneIcon /> : <Clear />}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Grid>
                          {c.Transactions.map((t) => (
                            <Grid item xs={12}>
                              <Typography component="h3" variant="h6">
                                Tipo
                              </Typography>
                              <p key={t.id}>{t.type}</p>
                              <Typography component="h3" variant="h6">
                                Fecha
                              </Typography>
                              <p>{t.date}</p>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>

                      <Grid className={classes.paper1}>
                        <Button className={classes.button}>Imprimir</Button>
                      </Grid>
                    </Grid>
                  </Container>
                );
              })}
          </>
        </Grid>
      </div>
    </Container>
  );
};

export default EstadoCuenta;
