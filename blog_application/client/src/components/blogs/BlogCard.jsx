import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BlogCard = ({ blog, onDelete }) => {
  const { currentUser } = useContext(AuthContext);
    
  // Safety check - if blog is undefined or null, don't render anything
  if (!blog) {
    return null;
  }
    
  const isAuthor = currentUser && blog.userId === currentUser._id;
    
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-4 h-full flex flex-col">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
          }}
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {blog.category || 'Uncategorized'}
          </span>
          <small className="text-gray-500 text-sm">
            {blog.createdAt ? formatDate(blog.createdAt) : 'Unknown date'}
          </small>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {blog.title || 'Untitled Blog'}
        </h3>
        <p className="text-gray-600 mb-3 flex-grow">
          {truncateContent(blog.content)}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          Author: {blog.author || 'Unknown'}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <Link 
            to={`/blogs/${blog._id}`} 
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            Read More
          </Link>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link 
                to={`/edit-blog/${blog._id}`} 
                className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Edit
              </Link>
              <button 
                onClick={() => onDelete(blog._id)}
                className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
