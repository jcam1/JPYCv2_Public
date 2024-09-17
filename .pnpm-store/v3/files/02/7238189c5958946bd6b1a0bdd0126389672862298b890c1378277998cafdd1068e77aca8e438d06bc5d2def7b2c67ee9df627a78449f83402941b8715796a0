"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradesError = void 0;
const util_1 = __importDefault(require("util"));
const chalk_1 = __importDefault(require("chalk"));
function noDetails() {
    return '';
}
class UpgradesError extends Error {
    constructor(message, details = noDetails) {
        super(message + '\n\n' + details());
    }
    [util_1.default.inspect.custom]() {
        return chalk_1.default.red.bold('Error:') + ' ' + this.message;
    }
}
exports.UpgradesError = UpgradesError;
//# sourceMappingURL=error.js.map