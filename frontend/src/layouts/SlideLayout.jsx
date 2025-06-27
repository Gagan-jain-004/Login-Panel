import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import { Menu, X } from 'lucide-react'; // Hamburger & close icons

const SlideLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Schools", path: "/admin/schools" },
      { name: "IT", path: "/admin/it" },
  { name: "Dispatch", path: "/admin/dispatch" },
  { name: "Accounts", path: "/admin/accounts" },
  ];

  return (
    <div> 
      <Header />
    <div className="min-h-screen bg-gray-200 text-black flex flex-col">

      {/*  Navbar Ham */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-800">
          <Menu size={28} />
        </button>
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-screen w-64 bg-white p-4 z-40 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
        >
          {/* Close button  */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-800">
              <X size={24} />
            </button>
          </div>

          {/*  Title  */}
          <div className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</div>

          <nav className="space-y-2">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded ${
                  location.pathname === item.path
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-300"
                }`}
                onClick={() => setSidebarOpen(false)} // Auto-close on mobile
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main*/}
        <main className="flex-1 p-6 md:ml-90 mt-4 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
    </div>
  );
};

export default SlideLayout;
