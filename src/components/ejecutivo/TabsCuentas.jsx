import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "../common/tab-panel/TabPanel";
import CrearCliente from "./CrearCliente";
import FormularioBeneficiario from "./FormularioBeneficiario";

const TabsCuentas = () => {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Crear Cliente" {...a11yProps(0)} />
          <Tab label="Beneficiario" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CrearCliente />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormularioBeneficiario />
      </TabPanel>
    </Box>
  );
};

export default TabsCuentas;
