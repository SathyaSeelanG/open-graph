import { CheckResult } from '../types';

class SeoChecker {
    async checkSEO(content: string): Promise<CheckResult> {
        const messages: string[] = [];
        
        // Check basic SEO meta tags
        if (!content.includes('<title>')) {
            messages.push('Missing title tag');
        }
        if (!content.includes('<meta name="description"')) {
            messages.push('Missing meta description');
        }
        if (!content.includes('<meta name="keywords"')) {
            messages.push('Missing meta keywords');
        }

        return {
            isValid: messages.length === 0,
            messages
        };
    }

    async checkSocialMedia(content: string): Promise<CheckResult> {
        const messages: string[] = [];
        
        // LinkedIn metadata checks
        if (!content.includes('og:title')) {
            messages.push('LinkedIn: Missing og:title meta tag');
        }
        if (!content.includes('og:description')) {
            messages.push('LinkedIn: Missing og:description meta tag');
        }
        if (!content.includes('og:image')) {
            messages.push('LinkedIn: Missing og:image meta tag');
        }

        // Instagram metadata checks
        if (!content.includes('og:image:width')) {
            messages.push('Instagram: Missing og:image:width meta tag');
        }
        if (!content.includes('og:image:height')) {
            messages.push('Instagram: Missing og:image:height meta tag');
        }

        // X (formerly Twitter) metadata checks
        if (!content.includes('twitter:card')) {
            messages.push('X: Missing twitter:card meta tag');
        }
        if (!content.includes('twitter:title')) {
            messages.push('X: Missing twitter:title meta tag');
        }
        if (!content.includes('twitter:description')) {
            messages.push('X: Missing twitter:description meta tag');
        }
        if (!content.includes('twitter:image')) {
            messages.push('X: Missing twitter:image meta tag');
        }

        // Discord metadata checks
        if (!content.includes('og:site_name')) {
            messages.push('Discord: Missing og:site_name meta tag');
        }
        if (!content.includes('theme-color')) {
            messages.push('Discord: Missing theme-color meta tag');
        }

        return {
            isValid: messages.length === 0,
            messages
        };
    }
}

export default SeoChecker;