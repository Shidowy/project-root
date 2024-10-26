import React from 'react';
import '../../../styles/dashboard/recent.css';

interface Post {
  platform: string;
  content: string;
  likes: number;
  comments: number;
  impressions: number;
  date: string;
}

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <div className="recent-posts-card">
      <h2>Recent Posts</h2>
      <table className="recent-posts-table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Content</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Impressions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{post.platform}</td>
              <td>{post.content}</td>
              <td>{post.likes}</td>
              <td>{post.comments}</td>
              <td>{post.impressions}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPosts;
