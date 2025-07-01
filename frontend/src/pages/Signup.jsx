import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getToken } from '../utils/auth';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    department: '',
     city: '',
    address: '',
    organizationCode: '',
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/api/auth/signup`,
        form,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      navigate('/login');
    } catch (err) {
      alert('Signup failed. Please check your credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/SL.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>


      <div className="relative z-10 flex justify-between px-5 py-4 items-center">
        <Link to="/">
          <h1 className="text-white text-xl font-semibold hover:text-blue-300 transition">
            Home
          </h1>
        </Link>

        <Link to="/login">
          <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-blue-100 transition">
            Login
          </button>
        </Link>
      </div>

    
    
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-black bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/30">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <input
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

  {/* City (NEW) */}
            <input
              className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />

            {/* Address (NEW) */}
            <input
              className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Mobile no."
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              required
            />

        <div className="relative">
  <select
    className="w-full appearance-none px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
    value={form.department}
    onChange={(e) => setForm({ ...form, department: e.target.value })}
    required
  >
    <option value="" disabled hidden >
     Select Department 
    </option>
  <option value="school">School</option>
<option value="accounts">Accounts</option>
<option value="it">IT</option>
<option value="dispatch">Dispatch</option>

  </select>
  
  
  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-600">
    ▼
  </div>
</div>
  
  <input
  className="w-full px-4 py-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
  placeholder="Organization Code"
  value={form.organizationCode}
  onChange={(e) => setForm({ ...form, organizationCode: e.target.value })}
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
              {loading ? 'Signing up...' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;


















































































/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';  
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' });

  const backendUrl = import.meta.env.VITE_BACKEND_URL
const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   try{
    await axios.post(`${backendUrl}/api/auth/signup`, form ,{
      headers: {
  Authorization: `Bearer ${getToken()}`,
}

    }, );

    navigate('/login');

}catch(err){
  alert("signup failed , check your credentials")
}finally{
  setLoading(false);
}
  
  }
  
  return (
    <>
        <div className='flex items-center justify-between px-5 py-2'>
      <Link to="/" >
            <h1 className='text-lg font-semibold'>Home</h1>
      </Link>
         
        <Link to='/login' >
              <button className=" bg-blue-600 text-white py-2 px-2 rounded-full">Login</button>
        </Link>
          </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3">
        <input className="w-full px-4 py-2 border rounded" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input className="w-full px-4 py-2 border rounded" placeholder="Department" onChange={(e) => setForm({ ...form, department: e.target.value })} />
      
       <button
            className={`w-full py-2 rounded text-white ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
      </form>
    </div>
    </>
  );
};

export default Signup;
*/