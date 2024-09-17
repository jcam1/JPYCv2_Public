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
exports.normalizeValidationData = normalizeValidationData;
exports.isCurrentValidationData = isCurrentValidationData;
exports.concatRunData = concatRunData;
const versions = __importStar(require("compare-versions"));
const currentMajor = '3';
const currentVersion = '3.4';
function normalizeValidationData(data) {
    if (isCurrentValidationData(data, false)) {
        return data;
    }
    else if (Array.isArray(data)) {
        return { version: currentVersion, log: data };
    }
    else {
        return { version: currentVersion, log: [data] };
    }
}
function isCurrentValidationData(data, exact = true) {
    if (Array.isArray(data)) {
        return false;
    }
    else if (!('version' in data)) {
        return false;
    }
    else if (typeof data.version === 'string' && versions.validate(data.version)) {
        if (exact) {
            return data.version === currentVersion;
        }
        else {
            return versions.compare(data.version, `${currentMajor}.*`, '=');
        }
    }
    else {
        throw new Error('Unknown version or malformed validation data');
    }
}
function concatRunData(newRunData, previousData) {
    return {
        version: currentVersion,
        log: [newRunData].concat(previousData?.log ?? []),
    };
}
//# sourceMappingURL=data.js.map