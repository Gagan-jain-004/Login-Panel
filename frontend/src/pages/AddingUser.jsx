import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { getToken } from '../utils/auth';

const AddingUser = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '',organizationCode: '' });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${backendUrl}/api/auth/signup`, form, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      navigate('/dashboard');
    } catch (err) {
      alert("Signup failed. Please check the credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/SL.jpg')"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Header Nav */}
      <div className="relative z-10 flex justify-between px-5 py-4 items-center">
        <Link to="/">
          <h1 className="text-white text-xl font-semibold hover:text-blue-300 transition">
            Home
          </h1>
        </Link>
      </div>

      {/* Add User Form */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-black bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/30">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Add User</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <input
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
              placeholder="Email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500  text-black"
              placeholder="Password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
    <option value="Accounts">Accounts</option>
    <option value="Sales">Sales</option>
    <option value="IT">IT</option>
    <option value="Dispatch">Dispatch</option>
  </select>
  
  
  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-600">
    ▼
  </div>
</div>

<input
  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
  placeholder="Organization Code"
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
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddingUser;





















































