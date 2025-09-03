import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This will be configured with your Strapi URL later
  const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${STRAPI_URL}/api/blogs?populate=*`);
      setBlogs(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs. Please check if Strapi is running.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [STRAPI_URL]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (blogs.length === 0) {
    return <div className="no-blogs">No blogs found. Create some blogs in your Strapi admin panel!</div>;
  }

  return (
    <div className="blog-list">
      <h1>Blog Posts</h1>
      <div className="blogs-container">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.attributes.title}</h2>
            <p className="blog-excerpt">{blog.attributes.description}</p>
            <div className="blog-meta">
              <span className="blog-date">
                Published: {new Date(blog.attributes.publishedAt).toLocaleDateString()}
              </span>
            </div>
            {blog.attributes.content && (
              <div className="blog-content">
                <p>{blog.attributes.content.substring(0, 200)}...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;