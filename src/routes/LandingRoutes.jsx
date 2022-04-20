import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../components/landing-page/login'

const LandingRoutes = ({setLoginSuccess, setRole, role}) => {
  return (
     <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login setLoginSuccess={setLoginSuccess}
                                              setRole={setRole}
                                              role={role}
                                       />} />
          </Routes>
     </BrowserRouter>
  )
}

export default LandingRoutes