import {useState, useEffect} from 'react'
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import FormularioCredito from './FormularioCredito';
import QrReaderEjec from './QrReaderEjec';
import FormularioAvales from './FormularioAvales';

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
             <Tab label="Identificación de cliente" {...a11yProps(0)} />
             <Tab label="Credito" {...a11yProps(1)} />
             <Tab label="Avales" {...a11yProps(2)} />
           </Tabs>
         </AppBar>
         <TabPanel value={value} index={0}>
            <QrReaderEjec setValue={setValue} setClientId={setClientId} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <FormularioCredito setCredit={setCredit} credit={credit} />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <FormularioAvales />
         </TabPanel>
       </div>
     );
}

export default Credito