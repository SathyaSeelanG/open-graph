import React, { useState } from 'react';
import { Globe, Search, X } from 'lucide-react';

interface UrlFormProps {
  onSubmit: (url: string) => void;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const validateUrl = (input: string): boolean => {
    if (!input.trim()) {
      setErrorMessage('Please enter a URL');
      return false;
    }
    
    try {
      let urlToTest = input;
      if (!/^https?:\/\//i.test(input)) {
        urlToTest = 'https://' + input;
      }
      
      new URL(urlToTest);
      return true;
    } catch (e) {
      setErrorMessage('Please enter a valid URL');
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isUrlValid = validateUrl(url);
    setIsValid(isUrlValid);
    
    if (isUrlValid) {
      let processedUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        processedUrl = 'https://' + url;
      }
      onSubmit(processedUrl);
    }
  };
  
  const clearUrl = () => {
    setUrl('');
    setIsValid(true);
    setErrorMessage('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-dark-400" />
        </div>
        
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setIsValid(true);
          }}
          placeholder="Enter website URL (e.g., example.com)"
          className={`w-full py-4 pl-12 pr-32 rounded-full bg-dark-900/50 backdrop-blur-sm border ${
            isValid ? 'border-dark-700' : 'border-red-500/50'
          } focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-dark-400 shadow-sm`}
        />
        
        {url && (
          <button
            type="button"
            onClick={clearUrl}
            className="absolute inset-y-0 right-20 flex items-center pr-2"
          >
            <X className="h-4 w-4 text-dark-400 hover:text-white transition-colors" />
          </button>
        )}
        
        <button
          type="submit"
          className="absolute inset-y-2 right-2 flex items-center px-6 bg-purple-600 text-white rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors shadow-sm"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
      
      {!isValid && (
        <div className="absolute mt-2 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default UrlForm;