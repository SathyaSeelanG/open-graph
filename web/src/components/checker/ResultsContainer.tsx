import React, { useState } from 'react';
import { AlertCircle, Check, CheckCircle, ClipboardCopy, Code, Copy, Download, ExternalLink, RefreshCw, Maximize, Minimize, Eye, Heart, MessageCircle, Share } from 'lucide-react';
import { CheckerResult, OpenGraphData, ValidationResult } from '../../types/opengraph';
import WebsitePreview from './previews/WebsitePreview';
import LinkedInPreview from './previews/LinkedInPreview';
import DiscordPreview from './previews/DiscordPreview';
import InstagramPreview from './previews/InstagramPreview';
import CodeSnippet from './CodeSnippet';

// Inline X Preview component to avoid import issues
const InlineXPreview: React.FC<{data: OpenGraphData}> = ({ data }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">
        X Card Preview
      </h3>

      {/* X Post Preview */}
      <div className="border border-dark-700 rounded-lg overflow-hidden bg-dark-800 max-w-md">
        {/* Post Header */}
        <div className="p-3 flex items-start">
          <div className="w-10 h-10 bg-dark-700 rounded-full flex-shrink-0"></div>
          <div className="ml-3">
            <div className="flex items-center">
              <span className="font-bold text-white">{data.siteName || "Company Name"}</span>
              <span className="text-dark-400 ml-1 text-sm">@{data.twitterSite?.replace('@', '') || "company"}</span>
            </div>
            <div className="text-sm text-dark-300">Check out our latest article!</div>
          </div>
        </div>
        
        {/* Link Preview */}
        <div className="border border-dark-700 rounded-lg mx-3 overflow-hidden">
          {data.image ? (
            <div className="aspect-[1.91/1] bg-dark-700 overflow-hidden">
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[1.91/1] bg-dark-700 flex items-center justify-center">
              <span className="text-dark-400">No Image</span>
            </div>
          )}
          
          <div className="p-3 bg-dark-800">
            <h4 className="font-bold line-clamp-1 text-white">
              {data.title || "Title Missing"}
            </h4>
            <p className="text-sm text-dark-300 mt-1 line-clamp-2">
              {data.description || "Description Missing - Your meta description will appear here."}
            </p>
            <div className="text-xs text-dark-400 mt-1 flex items-center">
              🔗 {new URL(data.url).hostname}
            </div>
          </div>
        </div>
        
        {/* Post Actions */}
        <div className="px-4 py-2 flex items-center justify-between text-dark-400">
          <button className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">24</span>
          </button>
          <button className="flex items-center space-x-1">
            <RefreshCw className="h-4 w-4" />
            <span className="text-xs">5</span>
          </button>
          <button className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span className="text-xs">98</span>
          </button>
          <button className="flex items-center space-x-1">
            <Share className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* X Specific Tags */}
      <div>
        <h4 className="font-medium text-white mb-2">
          X Card Recommendations
        </h4>
        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4 text-sm text-dark-300 space-y-2">
          <p>For optimal X sharing:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Use <code className="bg-dark-800 px-1 py-0.5 rounded text-xs text-purple-300">twitter:card</code> with value "summary_large_image" for best display</li>
            <li>Include <code className="bg-dark-800 px-1 py-0.5 rounded text-xs text-purple-300">twitter:site</code> with your X handle</li>
            <li>Add <code className="bg-dark-800 px-1 py-0.5 rounded text-xs text-purple-300">twitter:creator</code> if content has a specific author</li>
            <li>Use a 1200×675 pixel image (1.91:1 ratio) for optimal display</li>
            <li>Keep your title under 70 characters</li>
            <li>Keep your description under 200 characters</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface ResultsContainerProps {
  result: CheckerResult;
  onRefresh: () => void;
}

const ResultsContainer: React.FC<ResultsContainerProps> = ({ result, onRefresh }) => {
  const [showCode, setShowCode] = useState(false);
  const [compactView, setCompactView] = useState(true);

  if (result.isLoading) {
    return (
      <div className="text-center py-12 bg-dark-800 rounded-2xl border border-dark-700 shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
        <p className="text-purple-400 font-medium">Analyzing OpenGraph data for all platforms...</p>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 my-6 shadow-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-red-400">Error fetching OpenGraph data</h3>
            <p className="mt-2 text-dark-300">{result.error}</p>
            <div className="mt-4">
              <button 
                onClick={onRefresh}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result.data) {
    return null;
  }

  const data = result.data;

  const renderValidationSummary = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {result.validationResults.map((validationResult) => {
          if (validationResult.platform === 'website') return null;
          
          return (
            <div key={validationResult.platform} className="bg-dark-800 border border-dark-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                {validationResult.isValid ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <h4 className="font-medium text-white capitalize">{validationResult.platform}</h4>
              </div>
              
              {!validationResult.isValid && validationResult.missingTags.length > 0 && (
                <div className="mt-2">
                  <p className="text-dark-300 text-xs mb-1">Missing tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {validationResult.missingTags.map((tag, idx) => (
                      <span key={idx} className="bg-dark-700 px-2 py-0.5 rounded-full text-xs text-amber-300">
                        og:{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCompactPreview = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">OpenGraph Summary</h3>
            <div className="flex gap-2">
              {data.image && (
                <div className="w-12 h-12 bg-dark-700 rounded overflow-hidden">
                  <img src={data.image} alt="OG" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-dark-400 uppercase">Title</div>
              <div className="text-white font-medium truncate">{data.title || "Missing"}</div>
            </div>
            
            <div>
              <div className="text-xs text-dark-400 uppercase">Description</div>
              <div className="text-dark-300 text-sm line-clamp-2">{data.description || "Missing"}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-dark-400 uppercase">URL</div>
                <div className="text-purple-400 text-sm truncate">{data.url}</div>
              </div>
              <div>
                <div className="text-xs text-dark-400 uppercase">Site Name</div>
                <div className="text-dark-300 text-sm">{data.siteName || "Missing"}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
          <div className="border-b border-dark-700 px-4 py-2 bg-dark-850 flex justify-between items-center">
            <h3 className="text-sm font-medium text-white">Social Media Previews</h3>
            <button 
              onClick={() => setCompactView(false)}
              className="text-dark-400 hover:text-white p-1 rounded"
              title="Expand previews"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Mini LinkedIn preview */}
            <div className="border border-dark-700 rounded overflow-hidden bg-dark-850">
              <div className="p-2 border-b border-dark-700 flex items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-sm mr-1"></div>
                <span className="text-xs font-medium text-white">LinkedIn</span>
              </div>
              {data.image ? (
                <div className="aspect-video bg-dark-800 overflow-hidden">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-dark-800 flex items-center justify-center">
                  <span className="text-dark-400 text-xs">No Image</span>
                </div>
              )}
              <div className="p-2">
                <h4 className="text-xs font-medium text-white truncate">{data.title || "Title Missing"}</h4>
                <p className="text-xs text-dark-400 truncate mt-1">{data.siteName || "Company"}</p>
              </div>
            </div>
            
            {/* Mini X preview */}
            <div className="border border-dark-700 rounded overflow-hidden bg-dark-850">
              <div className="p-2 border-b border-dark-700 flex items-center">
                <div className="w-4 h-4 bg-dark-600 text-white rounded-full flex items-center justify-center mr-1 text-xs font-bold">X</div>
                <span className="text-xs font-medium text-white">X</span>
              </div>
              {data.image ? (
                <div className="aspect-video bg-dark-800 overflow-hidden">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-dark-800 flex items-center justify-center">
                  <span className="text-dark-400 text-xs">No Image</span>
                </div>
              )}
              <div className="p-2">
                <h4 className="text-xs font-medium text-white truncate">{data.title || "Title Missing"}</h4>
                <p className="text-xs text-dark-400 flex items-center gap-1 truncate mt-1">
                  <span>🔗</span>
                  <span>{new URL(data.url).hostname}</span>
                </p>
              </div>
            </div>
            
            {/* Mini Discord preview */}
            <div className="border border-dark-700 rounded overflow-hidden bg-dark-850">
              <div className="p-2 border-b border-dark-700 flex items-center">
                <div className="w-4 h-4 bg-indigo-600 rounded-full mr-1"></div>
                <span className="text-xs font-medium text-white">Discord</span>
              </div>
              {data.image ? (
                <div className="aspect-video bg-dark-800 overflow-hidden">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-dark-800 flex items-center justify-center">
                  <span className="text-dark-400 text-xs">No Image</span>
                </div>
              )}
              <div className="p-2 border-l-4 border-indigo-500">
                <h4 className="text-xs font-medium text-white truncate">{data.title || "Title Missing"}</h4>
                <p className="text-xs text-dark-400 truncate mt-1">{data.siteName || data.url}</p>
              </div>
            </div>
            
            {/* Mini Instagram preview */}
            <div className="border border-dark-700 rounded overflow-hidden bg-dark-850">
              <div className="p-2 border-b border-dark-700 flex items-center">
                <div className="w-4 h-4 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full mr-1"></div>
                <span className="text-xs font-medium text-white">Instagram</span>
              </div>
              {data.image ? (
                <div className="aspect-square bg-dark-800 overflow-hidden">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-dark-800 flex items-center justify-center">
                  <span className="text-dark-400 text-xs">No Image</span>
                </div>
              )}
              <div className="p-2">
                <p className="text-xs text-dark-400 flex items-center gap-1 truncate">
                  <span className="font-medium text-white">{data.siteName || "company"}</span>
                  <span>•</span>
                  <span>View Story</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-2xl shadow-lg overflow-hidden my-6">
      <div className="border-b border-dark-700 bg-dark-850 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 flex items-center transition-colors">
            <span className="font-medium">{result.url}</span>
            <ExternalLink className="ml-1.5 h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCompactView(!compactView)} 
            className="inline-flex items-center px-4 py-2 border border-dark-700 text-sm font-medium rounded-full text-white bg-dark-700 hover:bg-dark-600 transition-colors shadow-sm"
            title={compactView ? "Expanded view" : "Compact view"}
          >
            {compactView ? (
              <>
                <Maximize className="mr-1.5 h-4 w-4" />
                Expand
              </>
            ) : (
              <>
                <Minimize className="mr-1.5 h-4 w-4" />
                Compact
              </>
            )}
          </button>
          <button 
            onClick={() => setShowCode(!showCode)} 
            className={`inline-flex items-center px-4 py-2 border border-dark-700 text-sm font-medium rounded-full ${
              showCode ? 'bg-purple-600 text-white' : 'text-white bg-dark-700 hover:bg-dark-600'
            } transition-colors shadow-sm`}
          >
            <Code className="mr-1.5 h-4 w-4" />
            {showCode ? 'Show Previews' : 'View Code'}
          </button>
          <button 
            onClick={onRefresh} 
            className="inline-flex items-center px-4 py-2 border border-dark-700 text-sm font-medium rounded-full text-white bg-dark-700 hover:bg-dark-600 transition-colors shadow-sm"
          >
            <RefreshCw className="mr-1.5 h-4 w-4 text-purple-400" />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {showCode ? (
          <CodeSnippet data={data} />
        ) : compactView ? (
          renderCompactPreview()
        ) : (
          <>
            <div className="mb-8">
              <WebsitePreview data={data} />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-6 border-b border-dark-700 pb-2">
              Social Media Previews
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <LinkedInPreview data={data} />
              </div>
              <div>
                <InlineXPreview data={data} />
              </div>
              <div>
                <DiscordPreview data={data} />
              </div>
              <div>
                <InstagramPreview data={data} />
              </div>
            </div>
            
            {renderValidationSummary()}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsContainer;