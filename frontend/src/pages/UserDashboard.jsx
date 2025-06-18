import React from "react";
import { getUser } from "../utils/auth";

import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = getUser();

  return (
    <>   <div className='flex  justify-end px-5 rounded'>
  <Link to='/login' >
        <button className="w-full bg-blue-600 text-white py-2 px-2 rounded-full">Logout</button>
  </Link>
    </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <p className="text-lg mt-2">Role: {user.role}</p>
      <p className="text-lg">Department: {user.department}</p>
    </div>
    </>
  );
};

export default UserDashboard;
