import * as vscode from 'vscode';
import SeoChecker from '../utils/seoChecker';
import { SeoResultPanel } from '../panels/SeoResultPanel';

export function registerCheckMetadataCommand(context: vscode.ExtensionContext) {
    return vscode.commands.registerCommand('seo-extension.checkMetadata', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            const seoChecker = new SeoChecker();

            try {
                const seoResults = await seoChecker.checkSEO(text);
                const socialMediaResults = await seoChecker.checkSocialMedia(text);

                // Create or show the results panel
                const resultPanel = SeoResultPanel.createOrShow();
                resultPanel.updateContent(seoResults, socialMediaResults);
            } catch (error: any) {
                const errorMessage = error?.message || 'An unknown error occurred';
                vscode.window.showErrorMessage('Error checking SEO: ' + errorMessage);
            }
        } else {
            vscode.window.showWarningMessage('Please open a file to check metadata.');
        }
    });
}