import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "../common/tab-panel/TabPanel";
import CrearCliente from "./CrearCliente";

const TabsCredito = () => {
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
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CrearCliente />
      </TabPanel>
    </Box>
  )
}

export default TabsCredito