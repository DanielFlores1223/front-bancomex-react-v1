import React from 'react'
import { Button } from '@material-ui/core'

import { getCCBCOId, getCashBoxId } from '../common/functions/general'

const ReporteDiario = () => {

  console.log(getCCBCOId())
  console.log(getCashBoxId())
  const name = localStorage.name;



  return (
    <div>
      <Button color="primary" 
                       variant="contained" 
                       fullWidth
                       onClick={generatePDF}
                       style={{marginTop:'2rem'}}
             >
                       Generar PDF
             </Button> 
    </div>
  )
}

export default ReporteDiario
