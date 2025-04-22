import React from 'react';
import { OpenGraphData } from '../../../types/opengraph';
import { Globe, Heart, MessageSquare, Share } from 'lucide-react';

interface LinkedInPreviewProps {
  data: OpenGraphData;
}

const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({ data }) => {
  // Parse domain for display
  const hostname = (() => {
    try {
      return new URL(data.url).hostname;
    } catch (e) {
      return data.url;
    }
  })();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">
        LinkedIn Post Preview
      </h3>

      {/* LinkedIn Post Preview */}
      <div className="border border-dark-700 rounded-lg overflow-hidden bg-dark-800 max-w-lg">
        {/* Post Header */}
        <div className="p-4 flex items-start">
          <div className="w-12 h-12 bg-dark-700 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-xl text-purple-400 font-bold">{data.siteName?.charAt(0) || "C"}</span>
          </div>
          <div className="ml-3">
            <div className="font-medium text-white">{data.siteName || hostname}</div>
            <div className="text-xs text-dark-400 flex items-center">
              <span>3h • </span>
              <Globe className="h-3 w-3 ml-1 mr-1" />
              <span>Public</span>
            </div>
          </div>
        </div>
        
        {/* Post Description (would be user-written text on LinkedIn) */}
        <div className="px-4 pb-2 text-sm text-dark-300">
          Check out our latest update!
        </div>
        
        {/* Link Preview */}
        <div className="border border-dark-700 overflow-hidden">
          {data.image ? (
            <div className="aspect-[1.91/1] bg-dark-900 overflow-hidden">
              <img 
                src={data.image} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-[1.91/1] bg-dark-900 flex items-center justify-center">
              <span className="text-dark-400">No Image</span>
            </div>
          )}
          
          <div className="p-3 bg-dark-800">
            <div className="text-xs text-dark-400 uppercase truncate">{hostname}</div>
            <h4 className="font-medium line-clamp-2 mt-1 text-white">
              {data.title || "Title Missing"}
            </h4>
            <p className="text-xs text-dark-300 mt-1">
              {data.description || "Description Missing - Add a description to improve engagement on LinkedIn."}
            </p>
          </div>
        </div>
        
        {/* Post Actions */}
        <div className="px-4 py-2 flex items-center justify-between text-dark-400 border-t border-dark-700">
          <button className="flex items-center space-x-1">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center space-x-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center space-x-1">
            <Share className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
      
      {/* LinkedIn Meta Tags Analysis */}
      <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">LinkedIn Meta Tags</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-dark-300 font-medium">Title</p>
            <div className="bg-dark-800 p-2 rounded border border-dark-600">
              <p className="text-sm text-white">{data.title || "Missing title"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-dark-300 font-medium">Description</p>
            <div className="bg-dark-800 p-2 rounded border border-dark-600">
              <p className="text-sm text-white">{data.description || "Missing description"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-dark-300 font-medium">Image URL</p>
            <div className="bg-dark-800 p-2 rounded border border-dark-600 overflow-hidden text-ellipsis">
              <p className="text-sm text-white truncate">{data.image || "No image specified"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* LinkedIn Specific Tags */}
      <div>
        <h4 className="font-medium text-white mb-2">
          LinkedIn OpenGraph Recommendations
        </h4>
        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4 text-sm text-dark-300 space-y-2">
          <p>For optimal LinkedIn sharing:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Use a high-quality image with a 1.91:1 ratio (1200×627 pixels)</li>
            <li>Keep your title under 70 characters</li>
            <li>Keep your description under 150 characters</li>
            <li>Include <code className="bg-dark-600 px-1 py-0.5 rounded text-xs text-purple-300">og:type</code> set to "article" for content pages</li>
            <li>Use <code className="bg-dark-600 px-1 py-0.5 rounded text-xs text-purple-300">og:locale</code> to specify the content language</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPreview;