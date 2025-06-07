import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import blogService from '../../services/blog';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogService.getBlogById(id);
        setBlog(data);
        setError('');
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. It may have been deleted or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        navigate('/blogs');
      } catch (err) {
        setError('Failed to delete blog. Please try again.');
        console.error(err);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 text-center my-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 my-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <hr className="border-red-300 mb-4" />
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/blogs')}
              className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 my-8">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-6 py-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Blog Not Found</h2>
          <p className="mb-4">The blog you're looking for doesn't exist or has been removed.</p>
          <hr className="border-blue-300 mb-4" />
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/blogs')}
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAuthor = currentUser && blog.userId === currentUser._id;

  return (
    <div className="container mx-auto px-4 my-8">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl lg:max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm border">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-h-96 object-cover rounded-t-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                }}
              />
            )}
            <div className="px-6 py-8">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm">
                  {blog.category || 'Uncategorized'}
                </span>
                <small className="text-gray-500">{formatDate(blog.createdAt)}</small>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-6">{blog.title}</h1>
              
              <p className="text-gray-600 mb-6">
                <strong>Author:</strong> {blog.author || 'Unknown'}
              </p>
              
              <div className="blog-content text-gray-700 leading-relaxed">
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate('/blogs')}
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                >
                  Back to Blogs
                </button>
                
                {isAuthor && (
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-blog/${blog._id}`}
                      className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
