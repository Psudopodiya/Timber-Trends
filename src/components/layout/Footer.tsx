// src/components/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-5 items-center justify-between border -mx-32 text-black text-lg">
      <div className="bg-white flex flex-col w-full items-center justify-center gap-5">
        <div className="my-5">
          <img src="/assets/logo.png" className="w-36" alt="Logo" />
        </div>
        <div className="flex justify-around w-full">
          <div className="flex flex-col gap-2 items-center text-gray-600">
            <span className="text-black">About</span>
            <span>Our Compny</span>
            <span>Our Story</span>
            <span>Blog</span>
          </div>
          <div className="flex flex-col gap-2 items-center text-gray-600">
            <span className="text-black">About</span>
            <span>Our Compny</span>
            <span>Our Story</span>
            <span>Blog</span>
          </div>
          <div className="flex flex-col gap-2 items-center text-gray-600">
            <span className="text-black">About</span>
            <span>Our Compny</span>
            <span>Our Story</span>
            <span>Blog</span>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Furniture Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
