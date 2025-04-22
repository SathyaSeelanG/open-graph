import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Github, Linkedin, X } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">OpenGraph Checker</span>
            </div>
            <p className="text-gray-400 mb-4">
              Optimize your web content's appearance across social media platforms with our powerful OpenGraph checker tool.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-500">Chrome Extension</span> <span className="text-xs text-purple-400 ml-2">Coming Soon</span></li>
              <li><span className="text-gray-500">VSCode Extension</span> <span className="text-xs text-purple-400 ml-2">Coming Soon</span></li>
              <li><span className="text-gray-500">API Access</span> <span className="text-xs text-purple-400 ml-2">Coming Soon</span></li>
              <li><span className="text-gray-500">Integrations</span> <span className="text-xs text-purple-400 ml-2">Coming Soon</span></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-center">
            © {currentYear} OpenGraph Checker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;