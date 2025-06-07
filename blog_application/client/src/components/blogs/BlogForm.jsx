import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CATEGORIES = ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  category: Yup.string()
    .oneOf(CATEGORIES, 'Please select a valid category')
    .required('Category is required'),
  content: Yup.string()
    .min(20, 'Content must be at least 20 characters')
    .required('Content is required'),
  image: Yup.string().url('Must be a valid URL').nullable(),
});

const BlogForm = ({ initialValues, onSubmit, buttonText }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={BlogSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter blog title"
                />
                <ErrorMessage 
                  name="title" 
                  component="div" 
                  className="text-red-600 text-sm mt-1" 
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Field 
                  as="select" 
                  name="category" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Field>
                <ErrorMessage 
                  name="category" 
                  component="div" 
                  className="text-red-600 text-sm mt-1" 
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <Field
                  as="textarea"
                  name="content"
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  placeholder="Write your blog content here"
                />
                <ErrorMessage 
                  name="content" 
                  component="div" 
                  className="text-red-600 text-sm mt-1" 
                />
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (optional)
                </label>
                <Field
                  type="text"
                  name="image"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter image URL"
                />
                <ErrorMessage 
                  name="image" 
                  component="div" 
                  className="text-red-600 text-sm mt-1" 
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : buttonText}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
