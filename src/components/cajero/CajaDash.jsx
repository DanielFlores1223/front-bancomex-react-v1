import { Button, Grid, Typography, makeStyles, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCCBCOId } from "../common/functions/general";
import service from "../../service";
import { useNavigate } from "react-router-dom";
import ImgCashBox from "../../img/cashBox (2).png";
import Spinner from "../common/spinner/Spinner";

const styles = makeStyles((theme) => ({}));

const CajaDash = () => {
  const [info, setInfo] = useState({});
  const navigateTo = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const classes = styles();

  const getCashInfo = async () => {
    try {
      const { developURL } = service;
      const url = `${developURL}/cashcutoff/getAllInfo/${getCCBCOId()}`;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("t"),
        },
      };

      setShowSpinner(true);
      const response = await fetch(url, fetchConfig);
      const jsonResponse = await response.json();
      setShowSpinner(false);

      if (!jsonResponse.success) {
        return;
      }

      setInfo(jsonResponse.result);
    } catch (error) {
      //TODO: Add alert
      console.log(error);
    }
  };

  useEffect(() => {
    getCashInfo();
  }, []);

  return (
    <div>
      {showSpinner && (
        <Grid constainer justifyContent="center">
          <Spinner />
        </Grid>
      )}
      {Object.keys(info).length > 0 && !showSpinner && (
        <>
          <Grid container>
            <Grid container item xs={12} justifyContent="flex-end"></Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid container item xs={12} md={5} justifyContent="flex-end">
              <img
                src={ImgCashBox}
                alt="cashbox img"
                style={{ maxWidth: "100%", height: "15rem" }}
              />
            </Grid>
            <Grid container item xs={12} md={5}>
              <Typography variant="h5" color="primary">
                Información de la Caja
              </Typography>

              <Typography variant="body1" paragraph={true}>
                <b>Nombre: </b> {info.CashBox.name}
                <Typography variant="body1">
                  <b>Cantidad de efectivo inicial: </b>{" "}
                  {`$${info.totalStart} MXN`}
                </Typography>
                <Typography variant="body1">
                  <b>Fecha de apertura: </b> {info.date.split("T")[0]}
                </Typography>
                <Typography variant="body1">
                  <b>Hora de apertura: </b>{" "}
                  {new Date(info.date).toLocaleTimeString()}
                </Typography>
                <Typography variant="body1">
                  <b>Cajero: </b>{" "}
                  {`${info.Employee.firstName} ${info.Employee.lastName}`}
                </Typography>
              </Typography>
            </Grid>
          </Grid>

          
          <Grid container justifyContent='center'>
            
              <Typography
                variant="body1"
                align="center"
                style={{ margin: "3rem" }}
              >
                <b>Nota: </b> Para poder cerrar sesión, necesitas hacer corte en
                la caja.
              </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => {
                navigateTo("/hacer-corte");
              }}
            >
              Corte de caja
            </Button>
          </Grid>
        </>
      )}
    </div>
  );
};

export default CajaDash;
