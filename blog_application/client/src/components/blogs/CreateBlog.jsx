import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BlogForm from './BlogForm';
import blogService from '../../services/blog';

const CreateBlog = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    category: '',
    content: '',
    image: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await blogService.createBlog(values);
      toast.success('Blog created successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog</h2>
          <BlogForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            buttonText="Create Blog"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
