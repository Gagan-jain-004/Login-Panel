import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import { getUser } from '../utils/auth';

const Dashboard = () => {
  const user = getUser();
  if (user.role === 'admin') return <AdminDashboard />;
  return <UserDashboard />;
};

export default Dashboard;
