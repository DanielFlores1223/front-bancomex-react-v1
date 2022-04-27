import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import EscogerCaja from './EscogerCaja';
import IniciarCaja from './IniciarCaja';
import CajaDash from './CajaDash';


const Home = ({setLinkDisabled}) => {

  const [chooseCashBox, setChooseCashBox] = useState( Boolean(localStorage.getItem('cb')) );
  const [startCash, setStartCash] = useState( 
                                    ( localStorage.getItem('cb') && localStorage.getItem('cb') !== '') ? 'ready':'' );

  useEffect(() => {
    setLinkDisabled((chooseCashBox && startCash !== 'ready' ));
  }, [chooseCashBox, startCash]);

  return (
    <div>
        { chooseCashBox && startCash === 'ready' && 
              ( <CajaDash /> )
        }
        {
          !chooseCashBox && startCash === '' && 
                  (<EscogerCaja setChooseCashBox={setChooseCashBox} setStartCash={setStartCash} />)
        }
        {
          startCash === 'wait' && (<IniciarCaja setStartCash={setStartCash} />)
        }
    </div>
  )
}

export default Home