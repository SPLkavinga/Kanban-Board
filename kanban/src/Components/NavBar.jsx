import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaTasks,
  FaUsers,
  FaCalendarAlt,
  FaComments,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.png";
import Calendar from "react-calendar"; 
import 'react-calendar/dist/Calendar.css'; 

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false); // State for controlling calendar popup

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCalendar = () => setCalendarOpen(!calendarOpen); // Function to toggle calendar popup

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full py-2 bg-white border-b-2">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-14 w-36" />
      </div>

      {/* Hamburger Icon */}
      <div className="flex items-center md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="text-gray-700" />
          ) : (
            <FaBars className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden space-x-6 text-gray-700 md:flex">
        <Link
          to="/Projects"
          className="flex items-center space-x-2 hover:text-gray-900"
        >
          <FaClipboardList />
          <span>Project</span>
        </Link>
        <Link
          to="/tasks"
          className="flex items-center space-x-2 hover:text-gray-900"
        >
          <FaTasks />
          <span>Task</span>
        </Link>
        <Link
          to="/TeamPage"
          className="flex items-center space-x-2 hover:text-gray-900"
        >
          <FaUsers />
          <span>Team</span>
        </Link>
        <Link
          to="#"
          onClick={toggleCalendar} // On click, toggle calendar popup
          className="flex items-center space-x-2 hover:text-gray-900"
        >
          <FaCalendarAlt />
          <span>Calendar</span>
        </Link>
        <Link
          to="/messages"
          className="flex items-center space-x-2 hover:text-gray-900"
        >
          <FaComments />
          <span>Message</span>
        </Link>
      </div>

      {/* Search and Profile for Desktop */}
      <div className="items-center hidden space-x-20 md:flex">
        {/* Search Input */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
        </div>
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full "
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-0 left-0 w-full bg-white shadow-md md:hidden`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link
            to="/projects"
            className="flex items-center space-x-2 hover:text-gray-900"
          >
            <FaClipboardList />
            <span>Project</span>
          </Link>
          <Link
            to="/tasks"
            className="flex items-center space-x-2 hover:text-gray-900"
          >
            <FaTasks />
            <span>Task</span>
          </Link>
          <Link
            to="/team"
            className="flex items-center space-x-2 hover:text-gray-900"
          >
            <FaUsers />
            <span>Team</span>
          </Link>
          <Link
            to="#"
            onClick={toggleCalendar} // On click, toggle calendar popup
            className="flex items-center space-x-2 hover:text-gray-900"
          >
            <FaCalendarAlt />
            <span>Calendar</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center space-x-2 hover:text-gray-900"
          >
            <FaComments />
            <span>Message</span>
          </Link>
        </div>
      </div>

      {/* Calendar Modal Popup */}
      {calendarOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={toggleCalendar}
        >
          <div
            className="p-6 bg-white rounded-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevents closing on modal click
          >
            <h2 className="mb-4 text-xl font-bold">Calendar</h2>
            <div className="calendar-container">
              <Calendar /> {/* Render the actual Calendar component */}
            </div>
            <button
              onClick={toggleCalendar}
              className="w-full p-2 mt-4 text-white bg-purple-500 rounded-lg"
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
