
import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <Routes>
          <Route path ="/" element={<Home/>} />
          <Route path ="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </>
     )
}

export default App
