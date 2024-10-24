import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './dashboard.css';

// Mock data
const followerData = [
  { date: "Jan", followers: 8000, engagement: 2.8, posts: 20 },
  { date: "Feb", followers: 8500, engagement: 3.0, posts: 22 },
  { date: "Mar", followers: 9000, engagement: 3.1, posts: 25 },
  { date: "Apr", followers: 9500, engagement: 3.3, posts: 28 },
  { date: "May", followers: 10000, engagement: 3.0, posts: 30 },
  { date: "Jun", followers: 10500, engagement: 3.2, posts: 35 },
];

const audienceData = [
  { name: 'Instagram', value: 5000 },
  { name: 'Twitter', value: 3000 },
  { name: 'Facebook', value: 2500 },
];

const recentPosts = [
  { platform: "Instagram", content: "Check out our new product!", likes: 1200, comments: 89, shares: 45, impressions: 15000, date: "2023-06-15" },
  { platform: "Twitter", content: "Big announcement coming soon!", likes: 532, comments: 23, retweets: 78, impressions: 8900, date: "2023-06-14" },
  { platform: "Facebook", content: "Thank you for 10K followers!", likes: 2100, comments: 145, shares: 67, impressions: 22000, date: "2023-06-13" },
];

const sentimentData = [
  { name: 'Positive', value: 70 },
  { name: 'Neutral', value: 20 },
  { name: 'Negative', value: 10 },
];

const activityFeed = [
  { type: 'like', platform: 'Instagram', user: 'johndoe', content: 'liked your post', time: '2 minutes ago' },
  { type: 'comment', platform: 'Facebook', user: 'janedoe', content: 'commented: "Great product!"', time: '5 minutes ago' },
  { type: 'share', platform: 'Twitter', user: 'techguru', content: 'retweeted your post', time: '10 minutes ago' },
  { type: 'follow', platform: 'Instagram', user: 'newuser123', content: 'started following you', time: '15 minutes ago' },
  { type: 'mention', platform: 'Twitter', user: 'industryexpert', content: 'mentioned you in a tweet', time: '20 minutes ago' },
];

const contentCalendar = [
  { date: '2023-06-20', platform: 'Instagram', content: 'Product showcase', status: 'Scheduled' },
  { date: '2023-06-22', platform: 'Twitter', content: 'Industry news roundup', status: 'Draft' },
  { date: '2023-06-25', platform: 'Facebook', content: 'Customer success story', status: 'Idea' },
  { date: '2023-06-28', platform: 'Instagram', content: 'Behind-the-scenes video', status: 'In Progress' },
  { date: '2023-07-01', platform: 'LinkedIn', content: 'Thought leadership article', status: 'Scheduled' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <header className="dashboard-header">
        <h1>Advanced Social Media Dashboard</h1>
        <div className="dashboard-controls">
          <select 
            className="time-range-select" 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button 
            className="dark-mode-toggle" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <h2>Followers</h2>
          <p className="metric-value">10.5K</p>
          <p className="metric-change positive">+5.2%</p>
        </div>
        <div className="metric-card">
          <h2>Likes</h2>
          <p className="metric-value">32.4K</p>
          <p className="metric-change negative">-2.1%</p>
        </div>
        <div className="metric-card">
          <h2>Engagement Rate</h2>
          <p className="metric-value">3.2%</p>
          <p className="metric-change positive">+0.8%</p>
        </div>
        <div className="metric-card">
          <h2>Reach</h2>
          <p className="metric-value">87.9K</p>
          <p className="metric-change positive">+12.5%</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h2>Follower Growth & Engagement Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={followerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#8884d8" name="Followers" />
              <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#82ca9d" name="Engagement Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Audience Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Post Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={followerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posts" fill="#8884d8" name="Posts" />
              <Bar dataKey="engagement" fill="#82ca9d" name="Engagement Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Sentiment Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="recent-posts-card">
          <h2>Recent Posts</h2>
          <table className="recent-posts-table">
            <thead>
              <tr>
                <th>Platform</th>
                <th>Content</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Shares/Retweets</th>
                <th>Impressions</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.map((post, index) => (
                <tr key={index}>
                  <td>{post.platform}</td>
                  <td>{post.content}</td>
                  <td>{post.likes}</td>
                  <td>{post.comments}</td>
                  <td>{post.shares || post.retweets}</td>
                  <td>{post.impressions}</td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="activity-feed-card">
          <h2>Real-time Activity Feed</h2>
          <ul className="activity-feed">
            {activityFeed.map((activity, index) => (
              <li key={index} className="activity-item">
                <span className="activity-platform">{activity.platform}</span>
                <span className="activity-user">{activity.user}</span>
                <span className="activity-content">{activity.content}</span>
                <span className="activity-time">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="content-calendar-card">
          <h2>Content Calendar</h2>
          <table className="content-calendar-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Platform</th>
                <th>Content</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contentCalendar.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.platform}</td>
                  <td>{item.content}</td>
                  <td>
                    <span className={`status-badge status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default dashboard;