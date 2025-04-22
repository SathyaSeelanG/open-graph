export interface Metadata {
    title: string;
    description: string;
    keywords: string[];
    openGraph?: {
        title?: string;
        description?: string;
        url?: string;
        image?: string;
        type?: string;
    };
    XCard?: {
        card?: string;
        site?: string;
        title?: string;
        description?: string;
        image?: string;
    };
}

export interface CheckResult {
    isValid: boolean;
    messages: string[];
}