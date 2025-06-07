import React from 'react';

const CATEGORIES = ['All', 'Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Other'];

const Filters = ({ filters, setFilters }) => {
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilters({
      ...filters,
      category: category === 'All' ? '' : category,
    });
  };

  const handleAuthorChange = (e) => {
    setFilters({
      ...filters,
      author: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({ category: '', author: '' });
  };

  return (
    <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">Filter Blogs</h5>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category || 'All'}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="md:col-span-5">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                placeholder="Search by author name"
                value={filters.author || ''}
                onChange={handleAuthorChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="md:col-span-2 flex items-end">
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors mb-4"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filters;
