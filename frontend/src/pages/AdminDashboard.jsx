import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosConfig'; // Custom axios with token

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    School: 0,
    IT: 0,
    Dispatch: 0,
    Accounts: 0,
  });

  const fetchCounts = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      const deptCounts = {
        School: 0,
        IT: 0,
        Dispatch: 0,
        Accounts: 0,
      };

      // res.data.forEach(user => {
      //   const dept = user.department;
      //   if (dept && deptCounts[dept] !== undefined) {
      //     deptCounts[dept]++;
      //   }
      // });
res.data.forEach(user => {
  const dept = user.department?.toLowerCase();
  if (dept === 'school') deptCounts.School++;
  else if (dept === 'it') deptCounts.IT++;
  else if (dept === 'dispatch') deptCounts.Dispatch++;
  else if (dept === 'accounts') deptCounts.Accounts++;
});

      setCounts(deptCounts);
    } catch (err) {
      console.error("Error fetching department stats:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const departments = [
    { name: "School", color: "bg-teal-700", route: "/admin/schools" },
    { name: "IT", color: "bg-blue-800", route: "/admin/it" },
    { name: "Dispatch", color: "bg-purple-700", route: "/admin/dispatch" },
    { name: "Accounts", color: "bg-pink-600", route: "/admin/accounts" },
  ];

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className={`rounded-lg shadow-md p-4 text-white ${dept.color}`}
          >
            <h3 className="text-lg font-semibold">Total {dept.name}</h3>
            <p className="text-3xl font-bold mt-2">{counts[dept.name]}</p>
            <Link
              to={dept.route}
              className="underline mt-2 inline-block text-sm hover:text-gray-200"
            >
              View List
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;










/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredUsers = res.data.filter(
        (user) => user.role.toLowerCase() !== "admin"
      );
      setUsers(filteredUsers);
      processStats(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/reject/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const processStats = (data) => {
    const departmentCounts = {};
    data.forEach((user) => {
      const dept = user.department || "Unknown";
      departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
    });

    const formatted = Object.entries(departmentCounts).map(
      ([department, count]) => ({ department, count })
    );
    setStats(formatted);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('/admdsh.jpg')",
      }}
    >
  
  
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

  
  
      <header className="relative z-10 p-4 flex justify-between items-center bg-white/20 backdrop-blur-lg shadow-md">
        <Link to="/" className="text-white text-xl font-semibold hover:text-blue-300">
          Home
        </Link>
        <div className="space-x-2">
          {/* <Link to="/addinguser">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition">
              Add User
            </button>
          </Link> 
          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow transition">
              Logout
            </button>
          </Link>
        </div>
      </header>

   
   
      <div className="relative z-10 p-4 sm:p-8 flex flex-col items-center">
        
        <div className="bg-black/20 backdrop-blur-md w-full max-w-6xl rounded-xl shadow-lg p-8 text-white border border-white/30">
          <h1 className="text-4xl font-bold mb-6 text-center"> Dashboard</h1>

  


          <div className="w-full overflow-x-auto">
            
            <div className="min-w-full">

            <table className="w-full table-auto text-sm bg-white/100 backdrop-blur-sm text-white border border-white/30 rounded">
              <thead>
                <tr className="bg-red-500 text-white-800">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-black/10  text-black transition">
                    <td className="border px-4 py-2">{u.name}</td>
                    <td className="border px-4 py-2">{u.email}</td>
                    <td className="border px-4 py-2">{u.role}</td>
                    <td className="border px-4 py-2">{u.department}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

*/











































/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const fetchUsers = async () => {
    const token = getToken();

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const filteredUsers = res.data.filter((user) => user.role.toLowerCase() !== "admin");

      setUsers(filteredUsers);
      processStats(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/reject/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      fetchUsers(); 
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const processStats = (data) => {
    const departmentCounts = {};
    data.forEach((user) => {
      const dept = user.department || "Unknown";
      departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
    });

    const formatted = Object.entries(departmentCounts).map(([department, count]) => ({
      department,
      count,
    }));

    setStats(formatted);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>

     <div className='flex  justify-end px-5 rounded'>
      <Link to="/" >
            <h1 className='text-lg font-semibold'>Home</h1>
      </Link>
         
         <Link to='/addinguser' >
        <button className="w-full bg-blue-600 text-white py-2 px-2 rounded-full">AddUser</button>
  </Link>

  <Link to='/login' >
        <button className="w-full bg-blue-600 text-white py-2 px-2 rounded-full">Logout</button>
  </Link>
  
    </div>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users by Department</h2>
        <BarChart width={600} height={300} data={stats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3182ce" />
        </BarChart>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        <table className="min-w-full table-auto border text-sm bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role}</td>
                <td className="border px-4 py-2">{u.department}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
                      </>
  );
};

export default AdminDashboard;


*/













