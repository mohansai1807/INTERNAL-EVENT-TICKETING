import { NavLink } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">EventPass</span>
          </div>
          
          <div className="flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`
              }
              id="nav-home"
            >
              Home
            </NavLink>
            <NavLink 
              to="/book" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`
              }
              id="nav-book"
            >
              Book Now
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`
              }
              id="nav-history"
            >
              History
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
