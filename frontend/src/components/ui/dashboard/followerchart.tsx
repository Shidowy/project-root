import React from 'react';
import '../../../styles/dashboard/followerchart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FollowersChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="followers" stroke="#8884d8" />
      <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);

export default FollowersChart;