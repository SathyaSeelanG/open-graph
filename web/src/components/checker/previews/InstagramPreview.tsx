import React from 'react';
import { OpenGraphData } from '../../../types/opengraph';
import { Heart, MessageCircle, Send } from 'lucide-react';

interface InstagramPreviewProps {
  data: OpenGraphData;
}

const InstagramPreview: React.FC<InstagramPreviewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Instagram Story Preview
      </h3>

      {/* Instagram Story Preview */}
      <div className="relative max-w-xs mx-auto h-[500px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl overflow-hidden">
        {/* Story Content */}
        <div className="absolute inset-0 flex flex-col">
          {/* Story Header */}
          <div className="p-3 flex items-center">
            <div className="w-8 h-8 bg-white ring-2 ring-white rounded-full flex-shrink-0"></div>
            <div className="ml-2 text-white">
              <span className="text-sm font-semibold">{data.siteName || "company"}</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-6">
            {/* Link Preview Card */}
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              {data.image ? (
                <div className="aspect-[1.91/1] bg-gray-100 overflow-hidden">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
              
              <div className="p-3">
                <div className="text-xs text-gray-500 uppercase truncate">{new URL(data.url).hostname}</div>
                <h4 className="font-bold line-clamp-1 text-sm">
                  {data.title || "Title Missing"}
                </h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {data.description || "Description Missing"}
                </p>
                
                <div className="mt-3 pt-2 border-t border-gray-100 text-blue-500 text-xs font-medium">
                  Learn More
                </div>
              </div>
            </div>
          </div>
          
          {/* Swipe Up */}
          <div className="pb-6 text-center">
            <p className="text-white text-sm">Swipe up to learn more</p>
            <div className="w-1 h-6 mx-auto mt-1 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* Instagram Specific Info */}
      <div>
        <h4 className="font-medium text-gray-800 mb-2">
          Instagram Sharing Recommendations
        </h4>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 space-y-2">
          <p>For Instagram sharing:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Instagram has limited support for OpenGraph meta tags</li>
            <li>Links in regular posts aren't clickable (except in bios/stories)</li>
            <li>Focus on a compelling featured image as it will be most visible</li>
            <li>For Instagram stories, users need 10K+ followers or a business account to add "swipe up" links</li>
            <li>When sharing via Instagram Direct, a preview may appear using OpenGraph tags</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstagramPreview;