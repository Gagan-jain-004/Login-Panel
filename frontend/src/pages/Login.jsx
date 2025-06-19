import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';  

import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
     
   

    const res = await axios.post(`${backendUrl}/api/auth/login`, form);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/dashboard');
  };




  return (<> 
      
    <div className='flex  justify-end px-5 rounded'>
  <Link to='/signup' >
        <button className="w-full bg-blue-600 text-white py-2 px-2 rounded-full">SignUp</button>
  </Link>
    </div>
         
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<h1 className='flex flex-col items-center mb-5'>Welcome to the  Portal </h1>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <input className="w-full px-4 py-2 border rounded" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  </>
  );
};

export default Login;
