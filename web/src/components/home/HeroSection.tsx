import React from 'react';
import { ArrowRight, Globe, Search } from 'lucide-react';
import UrlForm from '../checker/UrlForm';

interface HeroSectionProps {
  onCheckUrl: (url: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCheckUrl }) => {
  return (
    <section className="bg-dark-950 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.05)_0%,rgba(0,0,0,0)_100%)]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <div className="inline-block p-2 bg-dark-800/50 rounded-full mb-4 backdrop-blur-sm ring-1 ring-purple-900">
            <Globe className="h-6 w-6 text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight bg-gradient-to-r from-white via-purple-300 to-purple-500 text-transparent bg-clip-text">
            Optimize Your Content's Social Media Appearance
          </h1>
          <p className="text-lg text-dark-300 mb-6">
            Check how your website will appear when shared across social media platforms
          </p>
          
          <div className="max-w-2xl mx-auto backdrop-blur-sm">
            <UrlForm onSubmit={onCheckUrl} />
          </div>
          
          <div className="flex flex-wrap justify-center mt-4 gap-4 text-xs">
            <a href="#platforms" className="text-dark-300 hover:text-purple-300 flex items-center gap-1 transition-colors">
              <span>Supported Platforms</span>
              <ArrowRight className="h-3 w-3" />
            </a>
            <span className="text-dark-600">•</span>
            <a href="#extensions" className="text-dark-300 hover:text-purple-300 flex items-center gap-1 transition-colors">
              <span>Browser Extensions</span>
              <ArrowRight className="h-3 w-3" />
            </a>
            <span className="text-dark-600">•</span>
            <a href="#docs" className="text-dark-300 hover:text-purple-300 flex items-center gap-1 transition-colors">
              <span>Documentation</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;