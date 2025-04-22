import React, { useState } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import { OpenGraphData } from '../../types/opengraph';
import { generateMetaTags } from '../../utils/opengraph';

interface CodeSnippetProps {
  data: OpenGraphData;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  
  const metaTags = generateMetaTags(data);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTags).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          OpenGraph Meta Tags
        </h3>
        <button
          onClick={copyToClipboard}
          className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md ${
            copied 
              ? 'border-green-300 text-green-700 bg-green-50' 
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardCopy className="mr-1.5 h-4 w-4 text-gray-500" />
              Copy Code
            </>
          )}
        </button>
      </div>
      
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code>{metaTags}</code>
        </pre>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">
          How to implement these tags
        </h4>
        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
          <li>Copy the meta tags above</li>
          <li>Paste them in the <code className="bg-blue-100 px-1 py-0.5 rounded">&lt;head&gt;</code> section of your HTML</li>
          <li>Place them before the closing <code className="bg-blue-100 px-1 py-0.5 rounded">&lt;/head&gt;</code> tag</li>
          <li>Update any values as needed to match your content</li>
        </ol>
      </div>
    </div>
  );
};

export default CodeSnippet;