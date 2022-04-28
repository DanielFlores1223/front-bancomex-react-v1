import {useState, useEffect} from 'react'
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import FormularioCredito from './FormularioCredito';
import QrReaderEjec from './QrReaderEjec';
import FormularioAvales from './FormularioAvales';
import PropiedadesAvales from './PropiedadesAvales';

function TabPanel(props) {
     const { children, value, index, ...other } = props;
   
     return (
       <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
       >
         {value === index && (
           <Box p={3}>
             <Typography>{children}</Typography>
           </Box>
         )}
       </div>
     );
   }
   
   TabPanel.propTypes = {
     children: PropTypes.node,
     index: PropTypes.any.isRequired,
     value: PropTypes.any.isRequired,
   };
   
   function a11yProps(index) {
     return {
       id: `simple-tab-${index}`,
       'aria-controls': `simple-tabpanel-${index}`,
     };
   }
   
   const useStyles = makeStyles((theme) => ({
     root: {
       flexGrow: 1,
       backgroundColor: theme.palette.background.paper,
     },
   }));
   

const Credito = () => {
     const classes = useStyles();
     //This state change the tab
     const [value, setValue] = useState(0);
     const [clientId, setClientId] = useState(0);
     const [credit, setCredit] = useState({requestedAmount: '', debTerm: ''});
     const [guarantees, setGuarantees] = useState([]);
     const [disabledTabs, setDisabledTabs] = useState(true);
     const [disabledIdentifyTab, setDisabledIdentifyTab] = useState(false);
     const [disabledPropertiesTab, setDisabledPropertiesTab] = useState(true);

     useEffect(() => {

      setCredit({...credit, ClientId: clientId});
    
     }, [clientId])
   
     const handleChange = (event, newValue) => {
       setValue(newValue);
     };
   
     return (
       <div className={classes.root}>
         <AppBar position="static">
           <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
             <Tab label="Identificación de cliente" {...a11yProps(0)} disabled={disabledIdentifyTab} />
             <Tab label="Credito" {...a11yProps(1)} disabled={disabledTabs} />
             <Tab label="Avales" {...a11yProps(2)} disabled={disabledTabs} />
             <Tab label="Propiedades de Avales" {...a11yProps(3)} disabled={disabledPropertiesTab} />
           </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            <QrReaderEjec setValue={setValue} 
                          setClientId={setClientId} 
                          setDisabledTabs={setDisabledTabs}
             />
         </TabPanel>
      
            
                <TabPanel value={value} index={1}>
                  <FormularioCredito setCredit={setCredit} 
                                     credit={credit} 
                                     setDisabledIdentifyTab={setDisabledIdentifyTab}
                                     setDisabledTabs={setDisabledTabs}
                                     setValue={setValue}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <FormularioAvales guarantees={guarantees} 
                                     setGuarantees={setGuarantees} 
                                     credit={credit}
                                     setDisabledPropertiesTab={setDisabledPropertiesTab}
                                     setValue={setValue}
                                     setDisabledTabs={setDisabledTabs}
                   />
                </TabPanel>
                <TabPanel value={value} index={3}>
                   <PropiedadesAvales setDisabledTabs={setDisabledTabs} 
                                      setDisabledIdentifyTab={setDisabledIdentifyTab}
                                      setDisabledPropertiesTab={setDisabledPropertiesTab}
                                      setValue={setValue}
                                      setCredit={setCredit}
                                      setGuaranteesStateMain={setGuarantees}

                   />
                </TabPanel>
             
         
       </div>
     );
}

export default Credito