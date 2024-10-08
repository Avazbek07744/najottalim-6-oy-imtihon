import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Error from './pages/Error'
import Login from './pages/forma/Login'
import Register from './pages/forma/Register'
import Home from './pages/Home'
import Mainleout from './pages/leyout/Mainleout'
import Deteils from './pages/Deteils'
import DeteilsLeout from './pages/leyout/DeteilsLeout'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
    else {
      if (!location.pathname.includes('/register')) {
        navigate('/login')
      }
    }
  }, [navigate])

  function Peoportiy({ aser, children }) {
    if (!aser) {
      navigate('/')
    }
    return children
  }

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Peoportiy aser={token}>
              <Mainleout>
                <Home />
              </Mainleout>
            </Peoportiy>
          }
        />

        <Route
          path='/books/:id'
          element={
            <Peoportiy aser={token}>
              <DeteilsLeout>
                <Deteils />
              </DeteilsLeout>
            </Peoportiy>
          }
        />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
