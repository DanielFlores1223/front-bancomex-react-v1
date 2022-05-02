import { React, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "../common/tab-panel/TabPanel";
import CrearCliente from "./CrearCliente";
import FormularioBeneficiario from "./FormularioBeneficiario";
import { useLocation } from "react-router-dom";

const TabsCuentas = () => {
  const location = useLocation();

  const [value, setValue] = useState(0);
  const [cliente, setCliente] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    street: "",
    intNumber: "",
    extNumber: "",
    suburb: "",
    zipcode: "",
    city: "",
    state: "",
    phone: "",
    curp: "",
    rfc: "",
    ine: "",
    email: "",
  });

  const [beneficiario, setBeneficiario] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: "",
    relation: "",
    porcentage: "100",
  });

  // console.log(location);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "85%", margin: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Cliente" {...a11yProps(0)} />
          <Tab label="Beneficiario" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CrearCliente
          setValue={setValue}
          value={value}
          setCliente={setCliente}
          cliente={cliente}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormularioBeneficiario
          beneficiario={beneficiario}
          setBeneficiario={setBeneficiario}
          setValue={setValue}
          setCliente={setCliente}
          cliente={cliente}
        />
      </TabPanel>
    </Box>
  );
};

export default TabsCuentas;
