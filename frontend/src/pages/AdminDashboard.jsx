import React, { useEffect, useState } from "react";
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
















