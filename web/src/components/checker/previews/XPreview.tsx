import React from 'react';
import { OpenGraphData } from '../../../types/opengraph';
import { Heart, MessageCircle, RefreshCw, Share } from 'lucide-react';

interface XPreviewProps {
  data: OpenGraphData;
}

const XPreview: React.FC<XPreviewProps> = ({ data }) => {
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

export default XPreview; 