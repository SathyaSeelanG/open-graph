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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCheckMetadataCommand = void 0;
const vscode = __importStar(require("vscode"));
const seoChecker_1 = __importDefault(require("../utils/seoChecker"));
const SeoResultPanel_1 = require("../panels/SeoResultPanel");
function registerCheckMetadataCommand(context) {
    return vscode.commands.registerCommand('seo-extension.checkMetadata', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            const seoChecker = new seoChecker_1.default();
            try {
                const seoResults = yield seoChecker.checkSEO(text);
                const socialMediaResults = yield seoChecker.checkSocialMedia(text);
                // Create or show the results panel
                const resultPanel = SeoResultPanel_1.SeoResultPanel.createOrShow();
                resultPanel.updateContent(seoResults, socialMediaResults);
            }
            catch (error) {
                const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || 'An unknown error occurred';
                vscode.window.showErrorMessage('Error checking SEO: ' + errorMessage);
            }
        }
        else {
            vscode.window.showWarningMessage('Please open a file to check metadata.');
        }
    }));
}
exports.registerCheckMetadataCommand = registerCheckMetadataCommand;
