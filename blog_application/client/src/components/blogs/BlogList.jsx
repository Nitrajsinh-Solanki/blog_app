import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import BlogCard from './BlogCard';
import Filters from '../common/Filters';
import blogService from '../../services/blog';


const BlogList = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', author: '' });

  // Fetch blogs only once when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllBlogs();
        setAllBlogs(data);
        setFilteredBlogs(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters, allBlogs]);

  // Function to apply filters to allBlogs
  const applyFilters = () => {
    let result = [...allBlogs];
        
    // Apply category filter
    if (filters.category) {
      result = result.filter(blog => blog.category === filters.category);
    }
        
    // Apply author filter (case-insensitive partial match)
    if (filters.author) {
      const authorLower = filters.author.toLowerCase();
      result = result.filter(blog => 
        blog.author && blog.author.toLowerCase().includes(authorLower)
      );
    }
        
    setFilteredBlogs(result);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        // Update both arrays
        const updatedBlogs = allBlogs.filter(blog => blog._id !== id);
        setAllBlogs(updatedBlogs);
        setFilteredBlogs(filteredBlogs.filter(blog => blog._id !== id));
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Blogs</h2>
            
      <Filters filters={filters} setFilters={setFilters} />
            
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
            
      {filteredBlogs.length === 0 ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          No blogs found. {filters.category || filters.author ? 'Try changing your filters.' : ''}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(blog => (
            <div key={blog._id}>
              <BlogCard blog={blog} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
