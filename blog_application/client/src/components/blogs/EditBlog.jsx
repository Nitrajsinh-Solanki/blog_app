import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogForm from './BlogForm';
import blogService from '../../services/blog';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        console.error('Error in fetchBlog:', err);
        if (err.response && err.response.status === 404) {
          setError('Blog not found. It may have been deleted or you may not have permission to view it.');
        } else {
          setError('Failed to fetch blog. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await blogService.updateBlog(id, values);
      toast.success('Blog updated successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update blog');
    } finally {
      setSubmitting(false);
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

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h2>
          {blog && (
            <BlogForm
              initialValues={{
                title: blog.title,
                category: blog.category,
                content: blog.content,
                image: blog.image || '',
              }}
              onSubmit={handleSubmit}
              buttonText="Update Blog"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
