import * as vscode from 'vscode';
import { registerCheckMetadataCommand } from './commands/checkMetadata';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(registerCheckMetadataCommand(context));
}

export function deactivate() {}