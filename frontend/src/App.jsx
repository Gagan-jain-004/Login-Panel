import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import AddingUser from './pages/AddingUser'
import Schools from './pages/Schools'
import SlideLayout from './layouts/SlideLayout'
import AdminDashboard from './pages/AdminDashboard'
import IT from './pages/IT'
import Dispatch from './pages/Dispatch'
import Accounts from './pages/Accounts'

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addinguser" element={<AddingUser />} />

      {/* Protected Dashboard Route - redirects to admin or user dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin-only Routes */}
      <Route path="/admin" element={<SlideLayout />}>
        <Route index element={<AdminDashboard />} /> {/* /admin */}
        <Route path="schools" element={<Schools />} /> {/* /admin/schools */}
        {/* Add more admin routes here */}
        <Route path="it" element={<IT />} />                 {/* /admin/it */}
  <Route path="dispatch" element={<Dispatch />} />     {/* /admin/dispatch */}
  <Route path="accounts" element={<Accounts />} />     {/* /admin/accounts */}
      </Route>
    </Routes>
  )
}

export default App
