import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import { getUser } from '../utils/auth';

const Dashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === 'admin') {
      navigate('/admin'); // redirect to admin layout
    }
  }, [user, navigate]);

  if (user.role !== 'admin') {
    return <UserDashboard />;
  }

  return null; // admin users get redirected
};

export default Dashboard;
