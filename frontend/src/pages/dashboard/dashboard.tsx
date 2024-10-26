import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/ui/dashboard/dashheader';
import Metrics from '../../components/ui/dashboard/metrics';
import FollowersChart from '../../components/ui/dashboard/followerchart';
import RecentPosts from '../../components/ui/dashboard/recent';
// import DashNav from '../../components/ui/dashboard/dashnav'; // Uncomment if using

// Mock data
const followerData = [
  { date: "Jan", followers: 8000, engagement: 2.8, posts: 20 },
  { date: "Feb", followers: 8500, engagement: 3.0, posts: 22 },
  { date: "Mar", followers: 9000, engagement: 3.1, posts: 25 },
  { date: "Apr", followers: 9500, engagement: 3.3, posts: 28 },
  { date: "May", followers: 10000, engagement: 3.0, posts: 30 },
  { date: "Jun", followers: 10500, engagement: 3.2, posts: 35 },
];

const recentPostsData = [
  { platform: "Instagram", content: "Check out our new product!", likes: 1200, comments: 89, impressions: 15000, date: "2023-06-15" },
  { platform: "Twitter", content: "Big announcement coming soon!", likes: 532, comments: 23, impressions: 8900, date: "2023-06-14" },
  { platform: "Facebook", content: "Thank you for 10K followers!", likes: 2100, comments: 145, impressions: 22000, date: "2023-06-13" },
];

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {/* <DashNav/> */}
      <DashboardHeader 
        timeRange={timeRange} 
        setTimeRange={setTimeRange} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
      <div className="dashboard-content">
        <Metrics />
        <FollowersChart data={followerData} />
      </div>
      <RecentPosts posts={recentPostsData} />
    </div>
  );
};

export default Dashboard;
