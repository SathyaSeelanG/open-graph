"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const checkMetadata_1 = require("./commands/checkMetadata");
function activate(context) {
    context.subscriptions.push((0, checkMetadata_1.registerCheckMetadataCommand)(context));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
