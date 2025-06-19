import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';  
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' });

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${backendUrl}/api/auth/signup`, form ,{
      headers: {
  Authorization: `Bearer ${getToken()}`,
}

    });
    navigate('/login');
  };

  return (
    <>
       <div className='flex  justify-end px-5 rounded'>
      <Link to='/login' >
            <button className="w-full bg-blue-600 text-white py-2 px-2 rounded-full">Login</button>
      </Link>
        </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <input className="w-full px-4 py-2 border rounded" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Department" onChange={(e) => setForm({ ...form, department: e.target.value })} />
        <button className="w-full bg-green-600 text-white py-2 rounded">Signup</button>
      </form>
    </div>
    </>
  );
};

export default Signup;
