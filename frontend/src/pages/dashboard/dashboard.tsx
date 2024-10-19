import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, Home, PieChart, Search, Settings, Users, ThumbsUp, Video, TrendingUp } from 'lucide-react';
import './dashboard.css';

interface FollowerData {
  date: string;
  followers: number;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  timestamp: string;
}

const followerData: FollowerData[] = [
  { date: "2023-01", followers: 10000 },
  { date: "2023-02", followers: 12000 },
  { date: "2023-03", followers: 15000 },
  { date: "2023-04", followers: 18000 },
  { date: "2023-05", followers: 22000 },
  { date: "2023-06", followers: 25000 },
];

const recentActivities: RecentActivity[] = [
  { id: 1, user: "John Doe", action: "Liked your post", timestamp: "2023-06-15 10:30 AM" },
  { id: 2, user: "Jane Smith", action: "Commented on your video", timestamp: "2023-06-15 11:45 AM" },
  { id: 3, user: "Bob Johnson", action: "Shared your post", timestamp: "2023-06-15 12:15 PM" },
  { id: 4, user: "Alice Brown", action: "Followed you", timestamp: "2023-06-15 01:30 PM" },
  { id: 5, user: "Charlie Wilson", action: "Mentioned you in a comment", timestamp: "2023-06-15 02:45 PM" },
];

const SocialMediaDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <button><Home size={18} /> Home</button>
          <button><Users size={18} /> Followers</button>
          <button><PieChart size={18} /> Analytics</button>
          <button><Settings size={18} /> Settings</button>
        </nav>
      </aside>
      <main className="main-content">
        <header className="header">
          <h1>Social Media Dashboard</h1>
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="icon-button"><Bell size={18} /></button>
          </div>
        </header>
        <div className="dashboard-content">
          <section className="summary-section">
            <div className="summary-card">
              <Users size={24} />
              <h3>Total Followers</h3>
              <p className="value">25,482</p>
              <p className="change">+5.2% from last month</p>
            </div>
            <div className="summary-card">
              <ThumbsUp size={24} />
              <h3>Total Likes</h3>
              <p className="value">98,741</p>
              <p className="change">+7.1% from last month</p>
            </div>
            <div className="summary-card">
              <Video size={24} />
              <h3>Video Views</h3>
              <p className="value">1,324,567</p>
              <p className="change">+12.3% from last month</p>
            </div>
            <div className="summary-card">
              <TrendingUp size={24} />
              <h3>Engagement Rate</h3>
              <p className="value">4.8%</p>
              <p className="change">+0.5% from last month</p>
            </div>
          </section>
          <section className="chart-section">
            <h3>Follower Growth Over Time</h3>
            <p>Monthly follower count over the past 6 months</p>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={followerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="followers" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="recent-activities">
            <h3>Recent Activities</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Action</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.user}</td>
                      <td>{activity.action}</td>
                      <td>{activity.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <div className="notification-badge">
          3 new notifications
        </div>
        <footer className="footer">
          <p>&copy; 2023 Your Social Media Company. All rights reserved.</p>
          <div>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default SocialMediaDashboard;
