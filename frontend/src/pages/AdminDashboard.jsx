
// pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

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

  const chartData = departments.map(dept => ({
    department: dept.name,
    count: counts[dept.name],
  }));

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

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">User Registration by Department</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;




































/*
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


*/






