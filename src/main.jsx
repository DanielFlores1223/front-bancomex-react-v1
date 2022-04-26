import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Slide from '@material-ui/core/Slide';
import { SnackbarProvider } from 'notistack';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    TransitionComponent={Slide}
    maxSnack={3}
>
    <App />
    </SnackbarProvider>
  </React.StrictMode>
)
