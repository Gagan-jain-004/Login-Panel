

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // console.log("Logged in user:", res.data.user);

      navigate('/dashboard');
    } catch (err) {
      alert("Login failed. Please check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/SL.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 px-5 py-3 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-white text-lg font-semibold hover:text-blue-400 transition duration-300">
            Home
          </h1>
        </Link>

        <Link to="/signup">
          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-blue-100 transition duration-300">
            Sign Up
          </button>
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-20 backdrop-blur-lg shadow-lg rounded-xl p-10 w-full max-w-md text-center border border-white border-opacity-30">
          <h1 className="text-white text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-200 mb-6">Login to continue to the Portal</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-gray-300 mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


























































/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';  

import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL
 const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    try {

    const res = await axios.post(`${backendUrl}/api/auth/login`, form);

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/dashboard');

    }catch(err){
      alert("Login failed. Please check your credentials")
    }finally{
      setLoading(false);
    }

  };




  return (<> 
      <div className='flex items-center justify-between px-5 py-2'>
<Link to="/" >
      <h1 className='text-lg font-semibold'>Home</h1>
</Link>
   
  <Link to='/signup' >
        <button className=" bg-blue-600 text-white py-2 px-2 rounded-full">SignUp</button>
  </Link>
    </div>
    
         
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<h1 className='flex flex-col items-center mb-5'>Welcome to the  Portal </h1>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <input className="w-full px-4 py-2 border rounded" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
       
       <button
            className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
      </form>
    </div>
  </>
  );
};

export default Login;

*/
