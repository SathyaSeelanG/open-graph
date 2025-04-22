import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Download, Github, Home, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-900 sticky top-0 z-50 border-b border-dark-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-4">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="bg-white rounded-full p-1 flex items-center justify-center">
            <img 
              src="https://raw.githubusercontent.com/SathyaSeelanG/open-graph/refs/heads/main/open-graph-icon.png" 
              alt="OpenGraph Checker Logo" 
              className="h-8 w-8"
            />
          </div>
          <Link to="/" className="text-xl font-bold text-white">OpenGraph Checker</Link>
        </div>
        
        <nav className="flex gap-2 md:gap-4 items-center">
          <Link to="/" className="text-dark-300 hover:text-accent-300 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/about" className="text-dark-300 hover:text-accent-300 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
            <Info className="h-4 w-4" />
            <span>About</span>
          </Link>
          <Link to="/docs" className="text-dark-300 hover:text-accent-300 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
            <AlertCircle className="h-4 w-4" />
            <span>Docs</span>
          </Link>
          <a 
            href="#"
            className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-full text-sm font-medium ml-2 flex items-center gap-1 transition-colors shadow-soft"
          >
            <Download className="h-4 w-4" />
            <span>Extensions</span>
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-dark-300 hover:text-white p-2 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;