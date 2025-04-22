"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoResultPanel = void 0;
const vscode = __importStar(require("vscode"));
class SeoResultPanel {
    constructor(panel) {
        this._disposables = [];
        this._panel = panel;
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }
    static createOrShow() {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (SeoResultPanel.currentPanel) {
            SeoResultPanel.currentPanel._panel.reveal(column);
            return SeoResultPanel.currentPanel;
        }
        const panel = vscode.window.createWebviewPanel('seoResults', 'SEO Check Results', column || vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        SeoResultPanel.currentPanel = new SeoResultPanel(panel);
        return SeoResultPanel.currentPanel;
    }
    updateContent(seoResults, socialMediaResults) {
        this._panel.webview.html = this._getWebviewContent(seoResults, socialMediaResults);
    }
    _getWebviewContent(seoResults, socialMediaResults) {
        const isAllValid = seoResults.isValid && socialMediaResults.isValid;
        const allMessages = [...seoResults.messages, ...socialMediaResults.messages];
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SEO Check Results</title>
            <style>
                body { 
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                }
                .header {
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid var(--vscode-titleBar-activeForeground);
                }
                .status {
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                }
                .status.success {
                    background-color: var(--vscode-testing-iconPassed);
                    color: var(--vscode-editor-background);
                }
                .status.warning {
                    background-color: var(--vscode-testing-iconQueued);
                    color: var(--vscode-editor-background);
                }
                .message-group {
                    margin-bottom: 20px;
                }
                .message-group h3 {
                    margin-bottom: 10px;
                }
                .message {
                    margin: 5px 0;
                    padding: 5px 10px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>SEO and Social Media Metadata Check Results</h2>
            </div>
            
            <div class="status ${isAllValid ? 'success' : 'warning'}">
                ${isAllValid ? '✓ All checks passed!' : '⚠ Some issues were found'}
            </div>

            ${allMessages.length > 0 ? `
                <div class="message-group">
                    <h3>Issues Found:</h3>
                    ${allMessages.map(msg => `<div class="message">• ${msg}</div>`).join('')}
                </div>
            ` : ''}
        </body>
        </html>`;
    }
    dispose() {
        SeoResultPanel.currentPanel = undefined;
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
        this._panel.dispose();
    }
}
exports.SeoResultPanel = SeoResultPanel;
