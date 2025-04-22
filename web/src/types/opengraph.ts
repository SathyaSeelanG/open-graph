export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName?: string;
  type?: string;
  locale?: string;
  
  // X (formerly Twitter) specific
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  
  // Facebook/LinkedIn specific
  fbAppId?: string;
  
  // Additional meta
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  
  // Raw meta tags for analysis
  rawTags: MetaTag[];
}

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface ValidationResult {
  platform: 'website' | 'linkedin' | 'x' | 'discord' | 'instagram';
  isValid: boolean;
  missingTags: string[];
  warnings?: string[];
  recommendations?: string[];
}

export interface CheckerResult {
  url: string;
  data: OpenGraphData | null;
  validationResults: ValidationResult[];
  isLoading?: boolean;
  error?: string;
}