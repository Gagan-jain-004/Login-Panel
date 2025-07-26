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

  const [interestStats, setInterestStats] = useState({
    interested: 0,
    notInterested: 0,
  });

  const [statuses, setStatuses] = useState({
    testStatus: 'Pending',
    paidStatus: 'Pending',
    paperPacked: 'No',
    conducted: 'No',
    omrReceived: 'No',
    itReceived: 'No',
    checked: 'No',
    result: 'Not Declared',
    kitPrepared: 'No',
    kitDispatched: 'No',
    kitDistributed: 'No',
  });

  const [paperDispatchedSets, setPaperDispatchedSets] = useState(0);

  const fetchCounts = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      const deptCounts = {
        School: 0,
        IT: 0,
        Dispatch: 0,
        Accounts: 0,
      };
      let interested = 0;
      let notInterested = 0;

      res.data.forEach((user) => {
        const dept = user.department?.toLowerCase();
        if (dept === 'school') {
          deptCounts.School++;
          if (user.bookForTest?.toLowerCase() === 'interested') interested++;
          else if (user.bookForTest?.toLowerCase() === 'not interested') notInterested++;
        } else if (dept === 'it') deptCounts.IT++;
        else if (dept === 'dispatch') deptCounts.Dispatch++;
        else if (dept === 'accounts') deptCounts.Accounts++;
      });

      setCounts(deptCounts);
      setInterestStats({ interested, notInterested });
    } catch (err) {
      console.error('Error fetching department stats:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const departments = [
    { name: 'School', color: 'bg-teal-700', route: '/admin/schools' },
    // { name: 'IT', color: 'bg-blue-800', route: '/admin/it' },
    // { name: 'Dispatch', color: 'bg-purple-700', route: '/admin/dispatch' },
    // { name: 'Accounts', color: 'bg-pink-600', route: '/admin/accounts' },
  ];

  const chartData = departments.map((dept) => ({
    department: dept.name,
    count: counts[dept.name],
  }));

  const statusOptions = {
    testStatus: ['Pending', 'Confirmed'],
    paidStatus: ['Pending', 'Confirmed'],
    paperPacked: ['No', 'Yes'],
    conducted: ['No', 'Yes'],
    omrReceived: ['No', 'Yes'],
    itReceived: ['No', 'Yes'],
    checked: ['No', 'Yes'],
    result: ['Not Declared', 'Declared'],
    kitPrepared: ['No', 'Yes'],
    kitDispatched: ['No', 'Yes'],
    kitDistributed: ['No', 'Yes'],
  };

  const cardOrder = [
    { key: 'testStatus', title: 'Test Status', bg: 'bg-orange-400' },
    { key: 'paidStatus', title: 'Paid Status', bg: 'bg-yellow-500' },
    { key: 'paperPacked', title: 'Paper Packed', bg: 'bg-indigo-400' },
    { key: 'paperDispatched', title: 'Paper Dispatched Sets', bg: 'bg-yellow-300', isCount: true },
    { key: 'conducted', title: 'Conducted', bg: 'bg-green-400' },
    { key: 'omrReceived', title: 'OMR Received', bg: 'bg-blue-400' },
    { key: 'itReceived', title: 'IT Received', bg: 'bg-purple-400' },
    { key: 'checked', title: 'Checked', bg: 'bg-pink-400' },
    { key: 'result', title: 'Result', bg: 'bg-red-400' },
    { key: 'kitPrepared', title: 'Kit Prepared', bg: 'bg-emerald-500' },
    { key: 'kitDispatched', title: 'Kit Dispatched', bg: 'bg-sky-400' },
    { key: 'kitDistributed', title: 'Kit Distributed', bg: 'bg-lime-500' },
  ];

  const handleStatusChange = (key, value) => {
    setStatuses((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept) => (
          <div key={dept.name} className={`rounded-lg shadow-md p-4 text-white ${dept.color}`}>
            <h3 className="text-lg font-semibold">Total {dept.name}</h3>
            <p className="text-3xl font-bold mt-2">{counts[dept.name]}</p>
            <Link to={dept.route} className="underline mt-2 inline-block text-sm hover:text-gray-200">
              View List
            </Link>
          </div>
        ))}

        <div className="rounded-lg shadow-md p-4 text-white bg-green-600">
          <h3 className="text-lg font-semibold">Interested </h3>
          <p className="text-3xl font-bold mt-2">{interestStats.interested}</p>
        </div>

        <div className="rounded-lg shadow-md p-4 text-white bg-red-600">
          <h3 className="text-lg font-semibold">Not Interested </h3>
          <p className="text-3xl font-bold mt-2">{interestStats.notInterested}</p>
        </div>
<br></br>
        {/* Status + Paper Dispatched Sets */}
        {cardOrder.map((item) =>
          item.key === 'paperDispatched' ? (
            <div key={item.key} className={`rounded-lg shadow-md p-4 ${item.bg}`}>
              <h3 className="text-md font-semibold mb-2">{item.title}</h3>
              <input
                type="number"
                className="w-full p-2 border rounded text-black"
                value={paperDispatchedSets}
                onChange={(e) => setPaperDispatchedSets(e.target.value)}
                placeholder="Enter number of sets"
              />
            </div>
          ) : (
            <div key={item.key} className={`rounded-lg shadow-md p-4 text-white ${item.bg}`}>
              <h3 className="text-md font-semibold mb-2">{item.title}</h3>
              <select
                className="p-2 rounded border text-black w-full"
                value={statuses[item.key]}
                onChange={(e) => handleStatusChange(item.key, e.target.value)}
              >
                {statusOptions[item.key].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          )
        )}
      </div>

      {/* <div className="mt-12">
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
      </div> */}
    </div>
  );
};

export default AdminDashboard;


































/*
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

*/

































