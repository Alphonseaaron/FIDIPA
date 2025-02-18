import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-4 bg-white dark:bg-dark-lighter border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025{' '}
          <a 
            href="https://alphonseaaronmumbo.web.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Alphonse Mumbo
          </a>
          {' '}– Professional UI/UX Designer and Developer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}