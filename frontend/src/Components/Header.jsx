import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="relative z-10 p-4 flex justify-between items-center bg-white/20 backdrop-blur-lg shadow-md">
        <Link to="/" className="text-red text-xl font-semibold">
          Home
        </Link>
        <div className="space-x-2">
          {/* <Link to="/addinguser">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition">
              Add User
            </button>
          </Link> */}
          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow transition">
              Logout
            </button>
          </Link>
        </div>
      </header>
  )
}

export default Header
