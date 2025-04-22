import React from 'react';
import { Check, Chrome, Code, ExternalLink, Globe, Grid, Layout, Linkedin, Monitor, Share2, X } from 'lucide-react';

const FeatureSection: React.FC = () => {
  return (
    <section className="py-20 bg-dark-900" id="platforms">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Check OpenGraph Tags Across All Platforms</h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Our tool helps you preview and optimize how your content appears when shared across different social media platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Globe className="h-6 w-6 text-purple-400" />}
            title="Website SEO"
            description="Check how your content appears in search results and ensure all essential meta tags are in place."
          />
          
          <FeatureCard 
            icon={<Linkedin className="h-6 w-6 text-purple-400" />}
            title="LinkedIn Preview"
            description="Optimize how your content appears when shared on LinkedIn to maximize professional engagement."
          />
          
          <FeatureCard 
            icon={<X className="h-6 w-6 text-purple-400" />}
            title="X Cards"
            description="Ensure your X cards are properly configured for maximum visibility in the timeline."
          />
          
          <FeatureCard 
            icon={<Layout className="h-6 w-6 text-purple-400" />}
            title="Discord Embeds"
            description="Preview how your links will appear when shared in Discord channels and messages."
          />
          
          <FeatureCard 
            icon={<Grid className="h-6 w-6 text-purple-400" />}
            title="Instagram Sharing"
            description="Test how your content will appear when shared via Instagram stories and posts."
          />
          
          <FeatureCard 
            icon={<Code className="h-6 w-6 text-purple-400" />}
            title="Meta Tag Generator"
            description="Get ready-to-use code snippets for implementing the perfect OpenGraph tags on your site."
          />
        </div>
        
        <div className="mt-16 text-center" id="extensions">
          <h2 className="text-3xl font-bold mb-4 text-white">Extensions Coming Soon</h2>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-10">
            We're working on browser and code editor extensions to make checking OpenGraph tags even easier. Stay tuned!
          </p>
          
          {/* Extension cards commented out - will be enabled when extensions are ready */}
          {/*
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
            <ExtensionCard 
              icon={<Chrome className="h-8 w-8 text-purple-400" />}
              title="Chrome Extension"
              description="Check OpenGraph tags of any page you're browsing with a single click."
              buttonText="Get Chrome Extension"
              buttonLink="#"
            />
            
            <ExtensionCard 
              icon={<Code className="h-8 w-8 text-purple-400" />}
              title="VSCode Extension"
              description="Validate OpenGraph tags directly from your code editor while developing."
              buttonText="Get VSCode Extension"
              buttonLink="#"
            />
          </div>
          */}
          
          {/* Coming Soon Placeholder */}
          <div className="bg-dark-800 p-8 rounded-lg border border-dark-700 shadow max-w-xl mx-auto">
            <div className="mb-4 flex justify-center">
              <div className="bg-purple-900/30 p-3 rounded-full">
                <Code className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Browser & VSCode Extensions</h3>
            <p className="text-dark-300 mb-4">
              Our team is developing powerful extensions for Chrome and VSCode to integrate OpenGraph checking directly into your workflow.
            </p>
            <p className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-300 px-4 py-2 rounded-md text-sm font-medium">
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-dark-300">{description}</p>
    </div>
  );
};

interface ExtensionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({ icon, title, description, buttonText, buttonLink }) => {
  return (
    <div className="bg-dark-800 p-8 rounded-lg border border-dark-700 shadow flex-1 flex flex-col">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-dark-300 mb-6">{description}</p>
      <div className="mt-auto">
        <a 
          href={buttonLink}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {buttonText}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default FeatureSection;