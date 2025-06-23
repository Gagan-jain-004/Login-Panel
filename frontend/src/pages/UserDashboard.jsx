import React from "react";
import { getUser } from "../utils/auth";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = getUser();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('src/assets/userdsh.jpg')",
      }}
    >
     
     
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      
      
      <div className="relative z-10 flex justify-end p-4">
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition">
            Logout
          </button>
        </Link>
      </div>

    
    
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-black bg-opacity-20 backdrop-blur-lg text-white border border-white/30 shadow-xl rounded-xl p-8 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}</h1>
          <p className="text-xl mb-2">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p className="text-xl">
            <span className="font-semibold">Department:</span> {user.department}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;





































































/*
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
*/