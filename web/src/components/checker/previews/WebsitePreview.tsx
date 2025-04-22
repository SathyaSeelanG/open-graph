import React, { useState } from 'react';
import { OpenGraphData } from '../../../types/opengraph';
import { Search, X, Globe, AlertTriangle, ChevronDown, ChevronUp, Code } from 'lucide-react';

interface WebsitePreviewProps {
  data: OpenGraphData;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ data }) => {
  const [showRawTags, setShowRawTags] = useState(false);
  
  // Parse domain for display
  const hostname = (() => {
    try {
      return new URL(data.url).hostname;
    } catch (e) {
      return data.url;
    }
  })();

  // Generate a favicon based on the site name
  const faviconLetter = data.siteName?.charAt(0) || hostname.charAt(0);

  // Check if description mentions "couldn't extract"
  const isDescriptionFallback = data.description && data.description.includes("couldn't extract the real meta description");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">
        Website Search Preview
      </h3>
      
      {/* Google Search Result Preview */}
      <div className="border border-dark-700 rounded-lg p-4 bg-dark-800 max-w-2xl">
        <div className="flex items-center mb-4 border-b border-dark-700 pb-2">
          <Search className="h-5 w-5 text-purple-400 mr-2" />
          <div className="flex-1 bg-dark-700 rounded-full h-8 px-4 flex items-center">
            <span className="text-sm text-dark-300 truncate">{data.url}</span>
          </div>
          <X className="h-5 w-5 text-dark-400 ml-2" />
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center text-sm text-dark-400">
            <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-white text-xs font-bold">{faviconLetter.toUpperCase()}</span>
            </div>
            <span className="truncate">{hostname}</span>
          </div>
          <h3 className="text-xl text-purple-400 hover:underline cursor-pointer">
            {data.title || "Title Missing"}
          </h3>
          <p className="text-sm text-dark-300">
            {data.description || "Description Missing - Your meta description will appear here. It's an important element for SEO and social sharing."}
          </p>
        </div>
        
        {isDescriptionFallback && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-md p-3 mt-3 text-sm">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-medium">Metadata extraction issue detected</p>
                <p className="text-amber-700 mt-1">
                  We couldn't extract the actual meta description from this site. This is likely due to:
                </p>
                <ul className="list-disc list-inside text-amber-700 mt-1 space-y-1 text-xs">
                  <li>Missing OpenGraph meta tags on the website</li>
                  <li>Blocking of our proxy by the website</li>
                  <li>Dynamic content that requires JavaScript to load</li>
                </ul>
                <div className="mt-2 text-amber-800 text-xs font-medium flex items-center">
                  <Code className="h-3 w-3 mr-1" />
                  Check the Raw Meta Tags section below to see what was actually found.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Tag Analysis */}
      <div>
        <h4 className="font-medium text-white mb-2">
          OpenGraph Tags Analysis
        </h4>
        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-dark-300 uppercase tracking-wider py-2">Tag</th>
                <th className="text-left text-xs font-medium text-dark-300 uppercase tracking-wider py-2">Value</th>
                <th className="text-left text-xs font-medium text-dark-300 uppercase tracking-wider py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              <TableRow 
                tag="og:title" 
                value={data.title} 
                isCritical={true}
              />
              <TableRow 
                tag="og:description" 
                value={data.description} 
                isCritical={true}
              />
              <TableRow 
                tag="og:url" 
                value={data.url} 
                isCritical={false}
              />
              <TableRow 
                tag="og:image" 
                value={data.image} 
                isCritical={false}
              />
              <TableRow 
                tag="og:type" 
                value={data.type} 
                isCritical={false}
              />
              <TableRow 
                tag="og:site_name" 
                value={data.siteName} 
                isCritical={false}
              />
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Raw Tags Section */}
      {data.rawTags && data.rawTags.length > 0 && (
        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
          <button 
            onClick={() => setShowRawTags(!showRawTags)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center">
              <Code className="h-4 w-4 text-purple-400 mr-2" />
              <h4 className="font-medium text-white">
                Raw Meta Tags ({data.rawTags.length})
              </h4>
            </div>
            {showRawTags ? (
              <ChevronUp className="h-4 w-4 text-dark-300" />
            ) : (
              <ChevronDown className="h-4 w-4 text-dark-300" />
            )}
          </button>
          
          {showRawTags && (
            <div className="mt-3 bg-dark-800 p-3 rounded border border-dark-600">
              <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-dark-300 uppercase tracking-wider py-2">Property</th>
                      <th className="text-left text-xs font-medium text-dark-300 uppercase tracking-wider py-2">Content</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-600">
                    {data.rawTags.map((tag, index) => (
                      <tr key={index}>
                        <td className="py-2 text-sm font-mono text-purple-400">
                          {tag.property || tag.name || "unknown"}
                        </td>
                        <td className="py-2 text-sm text-dark-300 break-all">
                          {tag.content}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Description Section - Ensure visibility */}
      <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">
          Meta Description
        </h4>
        <div className="bg-dark-800 p-3 rounded border border-dark-600">
          <p className="text-dark-300">
            {data.description || "Your website doesn't have a meta description. This is a critical element for SEO visibility."}
          </p>
        </div>
        <p className="text-xs text-dark-400 mt-2">
          A good meta description should be 150-160 characters and include your target keywords.
        </p>
        
        {isDescriptionFallback && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-md p-3 mt-3 text-sm">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-800 font-medium">Metadata extraction issue detected</p>
                <p className="text-amber-700 mt-1">
                  We couldn't extract the actual meta description from this site. This is likely due to:
                </p>
                <ul className="list-disc list-inside text-amber-700 mt-1 space-y-1 text-xs">
                  <li>Missing OpenGraph meta tags on the website</li>
                  <li>Blocking of our proxy by the website</li>
                  <li>Dynamic content that requires JavaScript to load</li>
                </ul>
                <div className="mt-2 text-amber-800 text-xs font-medium flex items-center">
                  <Code className="h-3 w-3 mr-1" />
                  Check the Raw Meta Tags section below to see what was actually found.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TableRowProps {
  tag: string;
  value?: string;
  isCritical: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ tag, value, isCritical }) => {
  return (
    <tr>
      <td className="py-2 text-sm font-medium text-dark-200">
        {tag}
        {isCritical && <span className="text-red-500 ml-1">*</span>}
      </td>
      <td className="py-2 text-sm text-dark-300 max-w-xs truncate">
        {value ? value : <span className="text-amber-500">Missing</span>}
      </td>
      <td className="py-2 text-sm">
        {value ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-800 text-green-300">
            Present
          </span>
        ) : (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isCritical 
              ? 'bg-red-800 text-red-300' 
              : 'bg-amber-800 text-amber-300'
          }`}>
            {isCritical ? 'Required' : 'Recommended'}
          </span>
        )}
      </td>
    </tr>
  );
};

export default WebsitePreview;