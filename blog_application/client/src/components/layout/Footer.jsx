import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-5">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-0">© {new Date().getFullYear()} Blogify. All rights reserved.</p>
        <p className="mb-0 text-sm">A multi-user blogging platform</p>
      </div>
    </footer>
  );
};

export default Footer;
