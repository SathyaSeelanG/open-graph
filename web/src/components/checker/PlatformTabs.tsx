import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Code, Globe, Linkedin, Smartphone, X } from 'lucide-react';
import { ValidationResult } from '../../types/opengraph';
import CodeSnippet from './CodeSnippet';

interface PlatformTabsProps {
  platform: string;
  setPlatform: (platform: string) => void;
  validationResults: ValidationResult[];
}

const PlatformTabs: React.FC<PlatformTabsProps> = ({
  platform,
  setPlatform,
  validationResults,
}) => {
  const platforms = [
    {
      id: 'website',
      label: 'Website',
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      id: 'x',
      label: 'X',
      icon: <X className="h-4 w-4" />,
    },
    {
      id: 'discord',
      label: 'Discord',
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      id: 'code',
      label: 'Code',
      icon: <Code className="h-4 w-4" />,
    },
  ];

  const getValidationStatusIcon = (platformId: string) => {
    const result = validationResults.find(r => r.platform === platformId);
    if (!result) return null;
    
    return result.isValid ? (
      <CheckCircle2 className="h-3 w-3 text-green-500" />
    ) : (
      <AlertCircle className="h-3 w-3 text-amber-500" />
    );
  };

  return (
    <div className="border-b border-dark-700 bg-dark-850">
      <div className="flex overflow-x-auto scrollbar-hide">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm whitespace-nowrap ${
              platform === p.id
                ? 'border-purple-600 text-purple-400'
                : 'border-transparent text-dark-400 hover:text-dark-200 hover:border-dark-600'
            }`}
          >
            <span className="mr-2">{p.icon}</span>
            <span>{p.label}</span>
            {p.id !== 'code' && (
              <span className="ml-1.5">
                {getValidationStatusIcon(p.id)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformTabs;