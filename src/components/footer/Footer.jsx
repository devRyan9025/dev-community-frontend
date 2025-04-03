import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from 'react-icons/fa6';

import './Footer.module.css';

export default function Footer() {
  return (
    <footer className='bg-white py-10'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        {/* Navigation Links */}
        <div className='flex justify-center space-x-6 text-sm text-gray-500 mb-6'>
          <a href='#' className='hover:text-gray-900'>
            About
          </a>
          <a href='#' className='hover:text-gray-900'>
            Blog
          </a>
          <a href='#' className='hover:text-gray-900'>
            Jobs
          </a>
          <a href='#' className='hover:text-gray-900'>
            Press
          </a>
          <a href='#' className='hover:text-gray-900'>
            Accessibility
          </a>
          <a href='#' className='hover:text-gray-900'>
            Partners
          </a>
        </div>

        {/* Social Icons */}
        <div className='flex justify-center space-x-6 text-gray-500 mb-4 text-xl'>
          <a href='#' className='hover:text-gray-700'>
            <FaFacebookF />
          </a>
          <a href='#' className='hover:text-gray-700'>
            <FaInstagram />
          </a>
          <a href='#' className='hover:text-gray-700'>
            <FaXTwitter />
          </a>
          <a href='#' className='hover:text-gray-700'>
            <FaGithub />
          </a>
          <a href='#' className='hover:text-gray-700'>
            <FaYoutube />
          </a>
        </div>

        {/* Copyright */}
        <p className='text-sm text-gray-400'>
          © 2025 Dev Community, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
