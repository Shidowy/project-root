import React, { useState } from 'react';
import { FaChartLine, FaUsers, FaFileAlt, FaCog, FaTachometerAlt } from 'react-icons/fa'; // Import icons
import '../../../styles/dashboard/dashnav.css';

const DashNav: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <nav className={`dash-nav ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul>
          <li className="nav-item active">
            <FaTachometerAlt className="nav-icon" />
            Dashboard
          </li>
          <li className="nav-item">
            <FaUsers className="nav-icon" />
            Followers
          </li>
          <li className="nav-item">
            <FaFileAlt className="nav-icon" />
            Posts
          </li>
          <li className="nav-item">
            <FaChartLine className="nav-icon" />
            Analytics
          </li>
          <li className="nav-item">
            <FaCog className="nav-icon" />
            Settings
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashNav;
