import React from 'react';
import { CheckCircle, Chrome, Code, ExternalLink, Github, Globe, User } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About OpenGraph Checker</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              OpenGraph Checker is a powerful tool designed to help website owners, developers, and marketers optimize 
              how their content appears when shared across social media platforms.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to help website owners make the best first impression when their content is shared online. 
              We believe that properly configured OpenGraph meta tags are essential for maximizing engagement 
              and ensuring your content looks great no matter where it's shared.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">What Are OpenGraph Tags?</h2>
            <p className="text-gray-700 mb-6">
              OpenGraph protocol was originally created by Facebook to enable any web page to become a rich object 
              in a social graph. Today, most major platforms including LinkedIn, X, and Discord use OpenGraph 
              tags to generate rich previews when content is shared.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-700">
                OpenGraph tags are meta tags that control how URLs are displayed when shared on social media.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">Web App</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Our free online tool lets you analyze any URL and see how it will appear across platforms.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-2">
                  <Chrome className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">Chrome Extension</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">Coming Soon</span>
                </div>
                <p className="text-sm text-gray-600">
                  Check OpenGraph tags of any page you're browsing with a single click.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-2">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">VSCode Extension</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">Coming Soon</span>
                </div>
                <p className="text-sm text-gray-600">
                  Validate OpenGraph tags directly from your code editor while developing.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">API Access</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">Coming Soon</span>
                </div>
                <p className="text-sm text-gray-600">
                  Integrate OpenGraph validation into your workflow with our REST API.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              We're a small team of web developers and marketers who understand the importance of how content 
              appears when shared online. Our tools are built with attention to detail and focus on user experience.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1 text-center">
                <div className="inline-block p-1 border-2 border-blue-500 rounded-full mb-3">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="font-semibold">John Smith</h3>
                <p className="text-sm text-gray-600">Lead Developer</p>
              </div>
              
              <div className="flex-1 text-center">
                <div className="inline-block p-1 border-2 border-blue-500 rounded-full mb-3">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="font-semibold">Jane Doe</h3>
                <p className="text-sm text-gray-600">UX Designer</p>
              </div>
              
              <div className="flex-1 text-center">
                <div className="inline-block p-1 border-2 border-blue-500 rounded-full mb-3">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
                <h3 className="font-semibold">Alex Wilson</h3>
                <p className="text-sm text-gray-600">Marketing Specialist</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-6">
              Have questions or suggestions? We'd love to hear from you.
            </p>
            
            <a 
              href="mailto:contact@opengraphchecker.com" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              contact@opengraphchecker.com
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a 
                href="https://github.com" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <Github className="h-5 w-5 mr-2" />
                Find us on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;