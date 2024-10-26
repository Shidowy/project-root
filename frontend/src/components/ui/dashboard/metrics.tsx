import React from 'react';
import '../../../styles/dashboard/metrics.css'

const MetricCard: React.FC<{ title: string; value: string; change: string; changeType: string }> = ({ title, value, change, changeType }) => (
  <div className="metric-card">
    <h2>{title}</h2>
    <p className="metric-value">{value}</p>
    <p className={`metric-change ${changeType}`}>{change}</p>
  </div>
);

const Metrics: React.FC = () => (
  <div className="metrics-grid">
    <MetricCard title="Followers" value="10.5K" change="+5.2%" changeType="positive" />
    <MetricCard title="Likes" value="32.4K" change="-2.1%" changeType="negative" />
    <MetricCard title="Engagement Rate" value="3.2%" change="+0.8%" changeType="positive" />
    <MetricCard title="Reach" value="87.9K" change="+12.5%" changeType="positive" />
  </div>
);

export default Metrics;