import React from 'react';
import '../../../styles/dashboard/dashheader.css'
import '../../../pages/dashboard/dashboard.css'

interface HeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const DashboardHeader: React.FC<HeaderProps> = ({ timeRange, setTimeRange, darkMode, setDarkMode }) => (
  <header className={`dash-header ${darkMode ? 'dark-mode' : ''}`}>
    <h1>Hi, Wyatt</h1>
    <div className="dash-controls">
      <select 
        className={`time-range-select ${darkMode ? 'dark-mode' : ''}`} 
        value={timeRange} 
        onChange={(e) => setTimeRange(e.target.value)}
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>
      <button 
        className={`dark-mode-toggle ${darkMode ? 'dark-mode' : ''}`} 
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  </header>
);


export default DashboardHeader;
