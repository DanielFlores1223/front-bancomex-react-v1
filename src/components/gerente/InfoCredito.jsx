import {
  Grid,
  TextField,
  FormHelperText,
  Button,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  InputAdornment,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import service from "../../service";
import { useSnackbar } from "notistack";

const validationSchema = Yup.object({
  status: Yup.string().required("*Este campo es obligatorio"),
  approvedAmount: Yup.number()
    .min(0, "La cantidad debe ser mayor")
    .integer("Solo se aceptan cantidades enteras")
    .required("*Este campo es obligatorio"),
});

const InfoCredito = () => {
  const { id } = useParams();
  const [credit, setCredit] = useState({});
  const [client, setClient] = useState({});
  const [employee, setEmployee] = useState({});
  const [properties, setProperties] = useState([]);
  const navigateTo = useNavigate();

  // Hook de Notistack
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      status: "",
      approvedAmount: "0",
    },
    validationSchema,
    onSubmit: (values) => {
      allowOrDenyCredit(values);
    },
  });

  const getInfo = async () => {
    const { developURL } = service;
    const url = `${developURL}/credit/creditAll/${id}`;
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
      // responseJSON.msg
      // enqueueSnackbar(`Credito fue encontrado`, {
      //   preventDuplicate: true,
      //   variant: "success",
      // });
      setCredit(responseJSON.result.credit);
      setClient(responseJSON.result.credit.Client);
      setEmployee(responseJSON.result.credit.Employee);
      setProperties(responseJSON.result.properties);
    } catch (error) {
      //alerta algo salio mal
      enqueueSnackbar("Hubo un error con el servidor intentalo de nuevo", {
        preventDuplicate: true,
        variant: "warning",
      });
    }
  };

  const allowOrDenyCredit = async (values) => {
    const { developURL } = service;
    const url = `${developURL}/credit/allowOrDenyCredit/${id}`;
    const data = { ...values };
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
      const responseJSON = await response.json();

      console.log(responseJSON);
      if (!responseJSON) {
        //Alerta no se hizo correctamente la peticion
        enqueueSnackbar("Hubo un error al actualizar la información", {
          preventDuplicate: true,
          variant: "error",
        });
        return;
      }

      //Todo bien

      //Redireccionamos a la vista principal de creditos
      navigateTo("/creditos");
    } catch (error) {
      //alerta algo salio mal
      enqueueSnackbar("Hubo un error con el servidor intentalo de nuevo", {
        preventDuplicate: true,
        variant: "warning",
      });
    }
  };


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
 



  useEffect(() => {
    getInfo();
  }, []);

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
              Información del Credito
            </Typography>
          </Box>
        </Grid>

        {credit && Object.keys(credit).length > 0 && (

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Card>
                <CardContent
                  sx={{ textAlign: "center", backgroundColor: "#103160" }}
                >
                  <Typography
                    variant="h4"
                    color="initial"
                    sx={{ fontWeight: "600", color: "white" }}
                  >
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(credit.requestedAmount)}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="initial"
                    sx={{ color: "white", marginTop: ".3rem" }}
                  >
                    Monto Solicitado
                  </Typography>
                </CardContent>

                <CardContent>
                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600", textAlign: "right" }}
                      >
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400", textAlign: "left" }}
                      >
                        {credit.status}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600", textAlign: "right" }}
                      >
                        Plazo:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400", textAlign: "left" }}
                      >
                        {`${credit.debTerm} Meses`}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600", textAlign: "right" }}
                      >
                        Interes:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400", textAlign: "left" }}
                      >
                        {`${credit.interest} %`}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600", textAlign: "right" }}
                      >
                        Fecha de Solicitud:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400", textAlign: "left" }}
                      >
                        {changeDate(credit.applicationDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontWeight: "400" }}
              >
                Información del Cliente
              </Typography>
              <Card sx={{ marginTop: "1rem", marginBottom: "2rem" }}>
                <CardContent>
                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                      >
                        Nombre:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400" }}
                      >
                        {client.firstName} {client.lastName}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                      >
                        Dirección:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400" }}
                      >
                        {`${client.street} ${client.extNumber}, ${client.intNumber} ${client.suburb}, ${client.zipcode}, ${client.city}, ${client.state}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                      >
                        Telefono:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400" }}
                      >
                        {client.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                      >
                        CURP:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400" }}
                      >
                        {client.curp}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                      >
                        RFC:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400" }}
                      >
                        {client.rfc}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3} mb=".5rem">
                    <Grid item xs={12} sm={12} md={12} lg={2}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "600" }}
                      >
                        Email:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={10}>
                      <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontWeight: "400" }}
                      >
                        {client.email}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        )}

        {credit.status === "Pendiente" && (

        <Grid xs={12} sm={12} md={12} lg={4}>
          <form onSubmit={formik.handleSubmit}>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{marginBottom:'1.5rem'}}>
                <FormControl fullWidth>
                  <InputLabel id="aprodenselect">Aprobar o Rechazar</InputLabel>
                  <Select
                    labelId="aprodenselect"
                    id="status"
                    name="status"
                    label="Aprobar o Rechazar"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
                  >
                    <MenuItem value={"Aprobado"}>Aprobar</MenuItem>
                    <MenuItem value={"Rechazado"}>Rechazar</MenuItem>
                  </Select>
                  <FormHelperText style={{ color: "red" }}>
                    {formik.touched.status && formik.errors.status}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="approvedAmount">
                    Cantidad aprobada para el credito
                  </InputLabel>
                  <OutlinedInput
                    id="approvedAmount"
                    name="approvedAmount"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Cantidad aprobada para el credito"
                    value={formik.values.approvedAmount}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.approvedAmount &&
                      Boolean(formik.errors.approvedAmount)
                    }
                    helperText={
                      formik.touched.approvedAmount &&
                      formik.errors.approvedAmount
                    }
                  />
                </FormControl>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  Enviar
                </Button>
                  </Grid>
              </Grid>
          </form>
        </Grid>

        )}

        
      </Grid>
    </Box>
  );
};

export default InfoCredito;
