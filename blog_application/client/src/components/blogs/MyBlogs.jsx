import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogCard from './BlogCard';
import blogService from '../../services/blog';
import { AuthContext } from '../../context/AuthContext';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await blogService.getAllBlogs();
      // Filter blogs by the current user's ID
      const myBlogs = allBlogs.filter(blog => blog.userId === currentUser._id);
      setBlogs(myBlogs);
      setError('');
    } catch (err) {
      setError('Failed to fetch your blogs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted successfully');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 text-center my-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Blogs</h2>
            
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
            
      {blogs.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          You haven't created any blogs yet.{' '}
          <Link 
            to="/create-blog" 
            className="text-blue-800 hover:text-blue-900 underline font-medium"
          >
            Create your first blog!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <div key={blog._id}>
              <BlogCard blog={blog} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
