"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SeoChecker {
    checkSEO(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = [];
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
        });
    }
    checkSocialMedia(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = [];
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
            // Twitter (X) metadata checks
            if (!content.includes('twitter:card')) {
                messages.push('Twitter: Missing twitter:card meta tag');
            }
            if (!content.includes('twitter:title')) {
                messages.push('Twitter: Missing twitter:title meta tag');
            }
            if (!content.includes('twitter:description')) {
                messages.push('Twitter: Missing twitter:description meta tag');
            }
            if (!content.includes('twitter:image')) {
                messages.push('Twitter: Missing twitter:image meta tag');
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
        });
    }
}
exports.default = SeoChecker;
