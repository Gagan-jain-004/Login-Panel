import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-center relative"
      style={{
        backgroundImage:
          "url('/home.avif')",
      }}
    >
     
     
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-40">
          Welcome to the Dashboard
        </h1>

        <div className="space-x-4 flex flex-wrap justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Existing User? Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition mt-4 md:mt-0"
          >
            New User? Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;































































/*import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-500 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-8">
        Welcome to the Dashboard
      </h1>
     
      <div className="space-x-4 flex flex-wrap justify-center">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
        >
          Existing User? Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition mt-4 md:mt-0"
        >
          New User? Signup
        </button>
      </div>
    </div>
  );
};

export default Home

*/