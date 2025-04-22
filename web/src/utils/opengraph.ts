import { OpenGraphData, ValidationResult, MetaTag } from '../types/opengraph';

// List of proxy URLs to try
const PROXY_URLS = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?',
  'https://api.scraperapi.com/?api_key=free&url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://cors.eu.org/'
];

/**
 * Fetches Open Graph data from a URL
 */
export async function fetchOpenGraphData(url: string): Promise<OpenGraphData> {
  // Ensure the URL has a protocol
  let fullUrl = url;
  if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
    fullUrl = 'https://' + fullUrl;
  }
  
  console.log('Fetching OpenGraph data for:', fullUrl);
  
  // For debugging specific problematic domains
  const isSpecificDomain = fullUrl.includes('sathyaseelan.in');
  if (isSpecificDomain) {
    console.log('Detected problematic domain:', fullUrl);
  }

  try {
    // Initialize result
    let html = '';
    let error = null;
    let proxyUsed = '';

    // Try each proxy until one works
    for (const proxyUrl of PROXY_URLS) {
      try {
        console.log(`Trying proxy: ${proxyUrl}`);
        const response = await fetch(proxyUrl + encodeURIComponent(fullUrl));
        
        if (!response.ok) {
          console.log(`Proxy ${proxyUrl} failed with status: ${response.status}`);
          continue;
        }
        
        // Handle the different response formats from different proxies
        if (proxyUrl.includes('allorigins')) {
          const data = await response.json();
          html = data.contents;
        } else {
          html = await response.text();
        }
        
        if (html && html.length > 0) {
          proxyUsed = proxyUrl;
          console.log(`Successfully fetched HTML using ${proxyUrl}`);
          break;
        }
      } catch (err) {
        console.log(`Error with proxy ${proxyUrl}:`, err);
        continue;
      }
    }

    if (!html) {
      throw new Error('All proxies failed to fetch the URL');
    }

    // Extract metadata from HTML
    const metadata = extractMetadata(html, fullUrl, isSpecificDomain);
    
    // Apply fallbacks for missing data
    const enhancedMetadata = applyFallbacks(metadata, html, fullUrl);
    
    // Generate default values for any missing data
    const finalData = generateMissingData(enhancedMetadata, fullUrl);
    
    console.log('Extracted metadata:', finalData);
    
    return finalData as OpenGraphData;
  } catch (error) {
    console.error('Error fetching OpenGraph data:', error);
    throw new Error((error as Error).message || 'Failed to fetch data');
  }
}

/**
 * Extract metadata from HTML
 */
function extractMetadata(html: string, url: string, isSpecificDomain: boolean = false) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const metadata: any = { url };
  const rawTags: MetaTag[] = [];
  
  if (isSpecificDomain) {
    console.log('Parsing specific domain HTML...');
  }

  // Collect all meta tags for rawTags array
  const allMetaTags = Array.from(doc.querySelectorAll('meta'));
  allMetaTags.forEach(tag => {
    const property = tag.getAttribute('property') || tag.getAttribute('name');
    const content = tag.getAttribute('content');
    
    if (property && content) {
      rawTags.push({ property, content });
    }
  });

  // Extract standard meta tags
  const metaTags = [
    { name: 'title', selectors: ['meta[property="og:title"]', 'meta[name="twitter:title"]', 'meta[property="linkedin:title"]', 'title'] },
    { name: 'description', selectors: ['meta[property="og:description"]', 'meta[name="twitter:description"]', 'meta[property="linkedin:description"]', 'meta[name="description"]'] },
    { name: 'image', selectors: ['meta[property="og:image"]', 'meta[name="twitter:image"]', 'meta[property="linkedin:image"]', 'meta[property="og:image:url"]', 'meta[name="image"]', 'link[rel="image_src"]'] },
    { name: 'siteName', selectors: ['meta[property="og:site_name"]', 'meta[property="linkedin:site_name"]'] },
    { name: 'locale', selectors: ['meta[property="og:locale"]'] },
    { name: 'type', selectors: ['meta[property="og:type"]'] },
    { name: 'twitterCard', selectors: ['meta[name="twitter:card"]'] },
    { name: 'twitterSite', selectors: ['meta[name="twitter:site"]'] },
  ];

  // Process each meta tag type
  metaTags.forEach(tag => {
    // Loop through selectors in priority order
    for (const selector of tag.selectors) {
      const element = doc.querySelector(selector);
      if (element) {
        if (selector === 'title') {
          metadata[tag.name] = element.textContent?.trim();
        } else {
          const value = element.getAttribute('content') || element.getAttribute('href');
          if (value) {
            metadata[tag.name] = value.trim();
            break; // Found value, no need to check other selectors
          }
        }
      }
    }
    
    if (isSpecificDomain && tag.name in metadata) {
      console.log(`Found ${tag.name}:`, metadata[tag.name]);
    }
  });

  // Try to find images if we still don't have one
  if (!metadata.image) {
    // Look for other image candidates if og:image is missing
    const largeImages = Array.from(doc.querySelectorAll('img[src]'))
      .filter(img => {
        const src = img.getAttribute('src');
        if (!src) return false;
        
        // Check if image has larger dimensions (potential hero/featured images)
        const width = parseInt(img.getAttribute('width') || '0');
        const height = parseInt(img.getAttribute('height') || '0');
        return (width > 200 && height > 200) || 
               (img.classList.contains('hero') || 
                img.classList.contains('featured') || 
                img.classList.contains('banner'));
      })
      .map(img => img.getAttribute('src'))
      .filter(Boolean);

    if (largeImages.length > 0) {
      // Use the first large image found
      metadata.image = largeImages[0];
      
      // Convert relative URL to absolute
      if (metadata.image && !metadata.image.startsWith('http')) {
        try {
          metadata.image = new URL(metadata.image, url).toString();
        } catch (e) {
          console.error('Error converting image URL:', e);
        }
      }
    }
  }

  // Extract JSON-LD structured data
  const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
  jsonLdScripts.forEach(script => {
    try {
      const jsonData = JSON.parse(script.textContent || '{}');
      
      // Handle both single objects and arrays of objects
      const jsonItems = Array.isArray(jsonData) ? jsonData : [jsonData];
      
      for (const item of jsonItems) {
        // Extract data based on "@type"
        if (item['@type'] === 'WebSite' || item['@type'] === 'Organization' || item['@type'] === 'WebPage' || item['@type'] === 'Article') {
          if (!metadata.title && item.name) metadata.title = item.name;
          if (!metadata.title && item.headline) metadata.title = item.headline;
          
          if (!metadata.description && item.description) metadata.description = item.description;
          
          if (!metadata.image && item.image) {
            metadata.image = typeof item.image === 'string' ? item.image : item.image.url;
          }
          
          if (!metadata.siteName && item.publisher?.name) metadata.siteName = item.publisher.name;
        }
      }
    } catch (e) {
      console.error('Error parsing JSON-LD:', e);
    }
  });
  
  // Check for LinkedIn specific tags for debugging
  if (isSpecificDomain) {
    const linkedInTags = doc.querySelectorAll('meta[property^="linkedin:"]');
    if (linkedInTags.length > 0) {
      console.log('Found LinkedIn tags:');
      linkedInTags.forEach(tag => {
        console.log(`- ${tag.getAttribute('property')}: ${tag.getAttribute('content')}`);
      });
    }
  }

  // Store all raw meta tags
  metadata.rawTags = rawTags;

  return metadata;
}

/**
 * Apply fallbacks for missing data
 */
function applyFallbacks(metadata: any, html: string, url: string) {
  const enhancedMetadata = { ...metadata };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // If no description is found, try to extract one from the content
  if (!enhancedMetadata.description) {
    // Try multiple strategies to extract a good description
    
    // Strategy 1: Look for article summary or excerpt
    const summary = doc.querySelector('.summary, .excerpt, .article-summary, .post-excerpt');
    if (summary && summary.textContent) {
      const text = summary.textContent.trim();
      if (text.length > 30) {
        enhancedMetadata.description = text.substring(0, 200) + (text.length > 200 ? '...' : '');
        console.log('Found description from summary element');
      }
    }
    
    // Strategy 2: Try to get text from the first paragraph with significant content
    if (!enhancedMetadata.description) {
      const paragraphs = Array.from(doc.querySelectorAll('article p, main p, .content p, #content p, .post-content p, .entry-content p'))
        .filter(p => p.textContent && p.textContent.trim().length > 30);
      
      if (paragraphs.length > 0) {
        const text = paragraphs[0].textContent?.trim() || '';
        enhancedMetadata.description = text.substring(0, 200) + (text.length > 200 ? '...' : '');
        console.log('Found description from paragraph element');
      } else {
        // Strategy 3: Look for any paragraph with significant content
        const allParagraphs = Array.from(doc.querySelectorAll('p'))
          .filter(p => p.textContent && p.textContent.trim().length > 30);
        
        if (allParagraphs.length > 0) {
          const text = allParagraphs[0].textContent?.trim() || '';
          enhancedMetadata.description = text.substring(0, 200) + (text.length > 200 ? '...' : '');
          console.log('Found description from generic paragraph');
        }
      }
    }
    
    // Strategy 4: If still no good paragraph, extract text from the first article or main section
    if (!enhancedMetadata.description) {
      const mainContent = doc.querySelector('article, main, #content, .content, .entry-content, .post-content');
      if (mainContent) {
        // Get text but exclude scripts and styles
        const scripts = Array.from(mainContent.querySelectorAll('script, style, noscript'));
        scripts.forEach(script => script.remove());
        
        const text = mainContent.textContent?.trim() || '';
        const cleanText = text.replace(/\s+/g, ' ').trim();
        
        // Take first 200 characters as description
        if (cleanText && cleanText.length > 30) {
          enhancedMetadata.description = cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '');
          console.log('Found description from main content');
        }
      }
    }
    
    // Strategy 5: Last resort - get any visible text from the page
    if (!enhancedMetadata.description) {
      const bodyText = doc.body.textContent?.trim() || '';
      if (bodyText.length > 0) {
        const cleanText = bodyText.replace(/\s+/g, ' ').trim();
        enhancedMetadata.description = cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '');
        console.log('Found description from body text');
      }
    }
  }

  // For LinkedIn URLs, handle specific format issues
  if (url.includes('linkedin.com') && !enhancedMetadata.title) {
    // Extract title from page structure specific to LinkedIn
    const profileName = doc.querySelector('.profile-headline') || 
                        doc.querySelector('.artdeco-entity-lockup__title');
    if (profileName) {
      enhancedMetadata.title = profileName.textContent?.trim();
    }
  }

  return enhancedMetadata;
}

/**
 * Generate default values for missing data
 */
function generateMissingData(metadata: any, url: string) {
  const finalData = { ...metadata };
  const domain = extractSiteName(url);
  
  // Generate missing values
  if (!finalData.title) {
    finalData.title = domain;
  }
  
  if (!finalData.description) {
    finalData.description = `This is the homepage of ${domain}. We couldn't extract the real meta description from this site.`;
  }
  
  if (!finalData.image) {
    finalData.image = `https://placehold.co/600x400?text=${encodeURIComponent(domain)}`;
  } else if (!finalData.image.startsWith('http')) {
    // Make relative image URLs absolute
    try {
      finalData.image = new URL(finalData.image, url).toString();
    } catch (e) {
      finalData.image = `https://placehold.co/600x400?text=${encodeURIComponent(domain)}`;
    }
  }
  
  if (!finalData.siteName) {
    finalData.siteName = extractSiteName(url);
  }
  
  if (!finalData.locale) {
    finalData.locale = 'en_US';
  }
  
  // Ensure rawTags exists to match OpenGraphData interface
  if (!finalData.rawTags) {
    finalData.rawTags = [];
  }
  
  return finalData;
}

/**
 * Extract domain from URL
 */
function extractSiteName(url: string): string {
  const domain = new URL(url).hostname;
  const parts = domain.split('.');
  if (parts.length >= 2) {
    // Get the site name (usually second-level domain)
    const siteName = parts[parts.length - 2];
    // Capitalize first letter
    return siteName.charAt(0).toUpperCase() + siteName.slice(1);
  }
  return domain;
}

export function validateOpenGraphData(data: OpenGraphData): ValidationResult[] {
  const results: ValidationResult[] = [];
  
  // Website validation
  results.push({
    platform: 'website',
    isValid: Boolean(data.title && data.description),
    missingTags: getMissingTags(data, ['title', 'description']),
    warnings: getWarnings(data, 'website'),
    recommendations: getRecommendations(data, 'website')
  });
  
  // LinkedIn validation
  results.push({
    platform: 'linkedin',
    isValid: Boolean(data.title && data.description && data.image),
    missingTags: getMissingTags(data, ['title', 'description', 'image']),
    warnings: getWarnings(data, 'linkedin'),
    recommendations: getRecommendations(data, 'linkedin')
  });
  
  // X (formerly Twitter) validation
  results.push({
    platform: 'x',
    isValid: Boolean(data.title && data.description && data.image && data.twitterCard),
    missingTags: getMissingTags(data, ['title', 'description', 'image', 'twitterCard']),
    warnings: getWarnings(data, 'x'),
    recommendations: getRecommendations(data, 'x')
  });
  
  // Discord validation
  results.push({
    platform: 'discord',
    isValid: Boolean(data.title && data.description && data.image),
    missingTags: getMissingTags(data, ['title', 'description', 'image']),
    warnings: getWarnings(data, 'discord'),
    recommendations: getRecommendations(data, 'discord')
  });
  
  // Instagram validation (limited OG support)
  results.push({
    platform: 'instagram',
    isValid: Boolean(data.title && data.image),
    missingTags: getMissingTags(data, ['title', 'image']),
    warnings: getWarnings(data, 'instagram'),
    recommendations: getRecommendations(data, 'instagram')
  });
  
  return results;
}

function getMissingTags(data: OpenGraphData, requiredTags: string[]): string[] {
  return requiredTags.filter(tag => !data[tag as keyof OpenGraphData]);
}

function getWarnings(data: OpenGraphData, platform: string): string[] {
  const warnings: string[] = [];
  
  // Check if title is too long
  if (data.title && data.title.length > 60) {
    warnings.push('Title exceeds recommended length (60 characters)');
  }
  
  // Check if description is too long based on platform
  if (data.description) {
    if (platform === 'linkedin' && data.description.length > 150) {
      warnings.push('Description exceeds recommended length for LinkedIn (150 characters)');
    } else if (platform === 'x' && data.description.length > 200) {
      warnings.push('Description exceeds recommended length for X (200 characters)');
    } else if (data.description.length > 160) {
      warnings.push('Description exceeds recommended length (160 characters)');
    }
  }
  
  // Platform-specific warnings
  if (platform === 'x') {
    if (!data.twitterCard) {
      warnings.push('Missing twitter:card meta tag');
    } else if (data.twitterCard !== 'summary_large_image' && data.twitterCard !== 'summary') {
      warnings.push(`X card type "${data.twitterCard}" may not be optimal for content sharing`);
    }
  }
  
  // Image warnings
  if (data.image) {
    if (platform === 'linkedin') {
      warnings.push('LinkedIn recommends 1200×627 pixels with a 1.91:1 aspect ratio');
    } else if (platform === 'x') {
      warnings.push('X recommends 1200×675 pixels for summary_large_image card type');
    } else if (platform === 'discord') {
      warnings.push('Discord works best with 16:9 aspect ratio images');
    } else if (platform === 'instagram') {
      warnings.push('Instagram generally works best with square (1:1) images');
    }
  }
  
  return warnings;
}

function getRecommendations(data: OpenGraphData, platform: string): string[] {
  const recommendations: string[] = [];
  
  // Common recommendations for all platforms
  if (!data.type || data.type === 'website') {
    recommendations.push('Consider using og:type="article" for content pages to improve engagement');
  }
  
  // Platform-specific recommendations
  if (platform === 'linkedin') {
    recommendations.push('Use a 1200×627 pixel image with a 1.91:1 aspect ratio for optimal LinkedIn display');
    recommendations.push('Include your brand name in the title for better recognition on LinkedIn');
    if (!data.description || data.description.length < 100) {
      recommendations.push('Use a longer, more detailed description for LinkedIn (100-150 characters ideal)');
    }
  }
  
  if (platform === 'x') {
    recommendations.push('Use a 1200×675 pixel image with a 16:9 aspect ratio for best X display');
    if (!data.twitterSite) {
      recommendations.push('Add twitter:site meta tag with your X handle');
    }
    if (!data.twitterCard) {
      recommendations.push('Add twitter:card meta tag (recommended: "summary_large_image")');
    }
    if (!data.twitterCreator) {
      recommendations.push('Consider adding twitter:creator to attribute content to specific authors');
    }
  }
  
  if (platform === 'discord') {
    recommendations.push('Keep titles under 256 characters for Discord embeds');
    recommendations.push('Use an image with 16:9 aspect ratio (1200×675 pixels) for optimal Discord previews');
    recommendations.push('Discord uses og:image, og:title, and og:description for rich embeds');
  }
  
  if (platform === 'instagram') {
    recommendations.push('Instagram has limited support for OpenGraph tags');
    recommendations.push('Focus on a compelling featured image as it will be most visible');
    recommendations.push('Square images (1:1 ratio) typically work best for Instagram sharing');
  }
  
  return recommendations;
}

export function generateMetaTags(data: Partial<OpenGraphData>): string {
  let tags = '';
  
  if (data.title) {
    tags += `<meta property="og:title" content="${data.title}" />\n`;
    tags += `<meta name="twitter:title" content="${data.title}" />\n`;
  }
  
  if (data.description) {
    tags += `<meta property="og:description" content="${data.description}" />\n`;
    tags += `<meta name="twitter:description" content="${data.description}" />\n`;
  }
  
  if (data.image) {
    tags += `<meta property="og:image" content="${data.image}" />\n`;
    tags += `<meta name="twitter:image" content="${data.image}" />\n`;
  }
  
  if (data.url) {
    tags += `<meta property="og:url" content="${data.url}" />\n`;
  }
  
  if (data.type) {
    tags += `<meta property="og:type" content="${data.type}" />\n`;
  } else {
    tags += `<meta property="og:type" content="website" />\n`;
  }
  
  if (data.siteName) {
    tags += `<meta property="og:site_name" content="${data.siteName}" />\n`;
  }
  
  if (data.twitterCard) {
    tags += `<meta name="twitter:card" content="${data.twitterCard}" />\n`;
  } else {
    tags += `<meta name="twitter:card" content="summary_large_image" />\n`;
  }
  
  if (data.twitterSite) {
    tags += `<meta name="twitter:site" content="${data.twitterSite}" />\n`;
  }
  
  return tags;
}