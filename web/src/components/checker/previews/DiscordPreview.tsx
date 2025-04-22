import React from 'react';
import { OpenGraphData } from '../../../types/opengraph';
import { Globe } from 'lucide-react';

interface DiscordPreviewProps {
  data: OpenGraphData;
}

const DiscordPreview: React.FC<DiscordPreviewProps> = ({ data }) => {
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
        Discord Embed Preview
      </h3>

      {/* Discord Embed Preview */}
      <div className="max-w-lg bg-dark-850 rounded-lg p-4 text-white">
        <div className="rounded-md overflow-hidden">
          {/* Message */}
          <div className="mb-2 text-sm">
            <span className="font-medium text-purple-400">User</span>
            <span className="text-dark-400 text-xs ml-2">Today at 1:23 PM</span>
            <p className="mt-1 text-dark-300">Check out this link!</p>
          </div>
          
          {/* Embed */}
          <div className="flex overflow-hidden rounded">
            <div className="w-1 bg-purple-600"></div>
            <div className="flex-1 bg-dark-900 p-3">
              {/* Title and URL */}
              <div className="space-y-1">
                <div className="text-xs text-dark-400 flex items-center">
                  <Globe className="h-3 w-3 mr-1" />
                  <span>{hostname}</span>
                </div>
                
                <a href={data.url} className="text-purple-400 hover:underline font-medium">
                  {data.title || "Title Missing"}
                </a>
                
                {data.description && (
                  <p className="text-dark-300 text-sm">
                    {data.description}
                  </p>
                )}
              </div>
              
              {/* Image */}
              {data.image && (
                <div className="mt-3">
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="rounded max-h-60 w-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Discord OpenGraph Tags Analysis */}
      <div className="bg-dark-700 border border-dark-600 rounded-lg p-4">
        <h4 className="font-medium text-white mb-2">Discord Meta Tags</h4>
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
            <div className="bg-dark-800 p-2 rounded border border-dark-600 overflow-hidden">
              <p className="text-sm text-white truncate">{data.image || "No image specified"}</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-dark-400 mt-2">
          Discord uses OpenGraph meta tags for rich embeds. All three tags above are required for optimal display.
        </p>
      </div>
      
      {/* Discord Specific Info */}
      <div>
        <h4 className="font-medium text-white mb-2">
          Discord Embed Recommendations
        </h4>
        <div className="bg-dark-700 border border-dark-600 rounded-lg p-4 text-sm text-dark-300 space-y-2">
          <p>For optimal Discord sharing:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Discord uses OpenGraph meta tags for generating embeds</li>
            <li>Ensure <code className="bg-dark-600 px-1 py-0.5 rounded text-xs text-purple-300">og:title</code>, <code className="bg-dark-600 px-1 py-0.5 rounded text-xs text-purple-300">og:description</code>, and <code className="bg-dark-600 px-1 py-0.5 rounded text-xs text-purple-300">og:image</code> are present</li>
            <li>Keep titles under 256 characters (Discord limit)</li>
            <li>Keep descriptions under 2048 characters (Discord limit)</li>
            <li>Use images with aspect ratios between 1:1 and 16:9 for best display</li>
            <li>Discord may cache embeds, so changes might not appear immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiscordPreview;