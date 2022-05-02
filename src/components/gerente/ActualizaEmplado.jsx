import {
  Button,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../service";
import * as Yup from "yup";
import RegExpression from "../common/functions/RestringE";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("El nombre es obligatorio")
    .matches(RegExpression, "Ingrese un nombre valido"),
  lastName: Yup.string()
    .required("El apellido es obligatorio")
    .matches(RegExpression, "Ingrese un apellido valido"),
  role: Yup.string().required("El rol es obligatorio"),
  BusinessUnitId: Yup.number(),
});

// Inicia el formulario
const ActualizaEmplado = () => {
  const classes = useStyles();
  const navigateTo = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [area, setArea] = useState([]);
  const [areas, setAreas] = useState([]);

  // Notistack
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  // Fetch
  const getEmployee = async () => {
    const { developURL } = service;
    const url = `${developURL}/employees/` + id;
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
    formik.values.firstName = json.result[0].firstName;
    formik.values.lastName = json.result[0].lastName;
    formik.values.role = json.result[0].role;
    formik.values.status = json.result[0].status;
    formik.values.BusinessUnitId = json.result[0].BusinessUnit.id;
    setFirstName(json.result[0].firstName);
    setLastName(json.result[0].lastName);
    setRole(json.result[0].role);
    setStatus(json.result[0].status);
    setArea(json.result[0].BusinessUnit.name);
  };

  const getBU = async () => {
    const { developURL } = service;
    const url = `${developURL}/businessunits`;
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
    setAreas(jsonResponse.result);

    setShowSpinner(false);
  };

  useEffect(() => {
    getEmployee();
    getBU();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "",
      status: "",
      BusinessUnitId: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateEmpleados(values);
    },
  });

  const UpdateEmpleados = async ({
    firstName,
    lastName,
    role,
    status,
    BusinessUnitId,
  }) => {
    let data = {
      firstName,
      lastName,
      role,
      status,
      BusinessUnitId,
    };

    fetch("http://localhost:4000/api/v1/employees/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("t"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        enqueueSnackbar("Empleado Actualizado con éxito", {
          variant: "success",
        });
        // alert(["Empleado Actualizado con éxito"]);
        if (result.success === true) {
          navigateTo("/empleados");
        }
      })
      .catch((error) => 
        enqueueSnackbar("Error al actualizar el empleado", {
          variant: "error",
          }));
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Empleado
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                id="firstName"
                label="Nombre"
                name="firstName"
                value={formik.values.firstName}
                autoFocus
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                label="Apellido"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>
              <Select
                fullWidth
                variant="outlined"
                labelId="demo-simple-select-label"
                id="role"
                name="role"
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                <MenuItem value="Cajero">Cajero</MenuItem>
                <MenuItem value="Ejecutivo">Ejecutivo</MenuItem>
                <MenuItem value="Gerente">Gerente</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                fullWidth
                variant="outlined"
                labelId="demo-simple-select-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <MenuItem value="true">Activo</MenuItem>
                <MenuItem value="false">Inactivo</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="BusinessUnitId">Área</InputLabel>
              <Select
                labelId="BusinessUnitId"
                id="BusinessUnitId"
                name="BusinessUnitId"
                fullWidth
                variant="outlined"
                value={formik.values.BusinessUnitId}
                label="Area"
                onChange={formik.handleChange}
              >
                {areas &&
                  areas.length > 0 &&
                  areas.map((a) => {
                    return (
                      <MenuItem key={a.id} value={a.id}>
                        {a.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Actualizar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ActualizaEmplado;
