import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import ResultsContainer from '../components/checker/ResultsContainer';
import { CheckerResult } from '../types/opengraph';
import { fetchOpenGraphData, validateOpenGraphData } from '../utils/opengraph';

const HomePage: React.FC = () => {
  const [result, setResult] = useState<CheckerResult | null>(null);
  
  const handleCheckUrl = async (url: string) => {
    // Show loading state for all platforms
    setResult({
      url,
      data: null,
      validationResults: [],
      isLoading: true
    });
    
    try {
      // Fetch real data from the website
      const data = await fetchOpenGraphData(url);
      // Validate data for all social media platforms
      const validationResults = validateOpenGraphData(data);
      
      setResult({
        url,
        data,
        validationResults,
        isLoading: false
      });
    } catch (error) {
      setResult({
        url,
        data: null,
        error: (error as Error).message,
        validationResults: [],
        isLoading: false
      });
    }
  };
  
  const handleRefresh = () => {
    if (result?.url) {
      handleCheckUrl(result.url);
    }
  };
  
  return (
    <div className="bg-dark-950">
      {/* Hero Section with Search */}
      <HeroSection onCheckUrl={handleCheckUrl} />
      
      {/* Results Section - Directly below hero */}
      <div className="container mx-auto px-4 pb-8 -mt-4">
        {result ? (
          <>
            <ResultsContainer result={result} onRefresh={handleRefresh} />
            <div className="text-center mt-2 text-dark-400 text-xs">
              <p>This tool attempts to fetch and analyze real OpenGraph tags from the provided URL.</p>
              <p>Due to browser security restrictions, we use a proxy service which may have limitations with some websites.</p>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-dark-400 text-sm">
            <p>Enter a website URL above to check its real OpenGraph tags across different social media platforms.</p>
            <p className="text-xs mt-1 opacity-75">We'll analyze the actual meta tags from the website to show how it appears when shared.</p>
          </div>
        )}
      </div>
      
      {/* Features Section */}
      <FeatureSection />
      
      {/* Why OpenGraph Tags Matter Section */}
      <section className="py-20 bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Why OpenGraph Tags Matter</h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Make your content stand out when shared on social media with properly optimized OpenGraph meta tags.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-white">Increased Click-Through Rates</h3>
              <p className="text-dark-300">
                Content with proper OpenGraph tags generates 50% more engagement than content without them.
              </p>
            </div>
            
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-white">Brand Consistency</h3>
              <p className="text-dark-300">
                Control how your content appears across different platforms to maintain brand consistency.
              </p>
            </div>
            
            <div className="bg-dark-800 p-6 rounded-lg border border-dark-700 shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-white">Improved SEO</h3>
              <p className="text-dark-300">
                While not a direct ranking factor, proper OpenGraph tags can increase social engagement, indirectly helping SEO.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;