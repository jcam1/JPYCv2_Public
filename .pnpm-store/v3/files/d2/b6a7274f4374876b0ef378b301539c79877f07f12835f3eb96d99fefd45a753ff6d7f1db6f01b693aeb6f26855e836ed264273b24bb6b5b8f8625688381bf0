"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solcInputOutputDecoder = solcInputOutputDecoder;
const path_1 = __importDefault(require("path"));
function solcInputOutputDecoder(solcInput, solcOutput, basePath = '.') {
    const sources = {};
    function getSource(sourceId) {
        if (sourceId in sources) {
            return sources[sourceId];
        }
        else {
            const sourcePath = Object.entries(solcOutput.sources).find(([, { id }]) => sourceId === id)?.[0];
            if (sourcePath === undefined) {
                throw new Error(`Source file not available`);
            }
            const content = solcInput.sources[sourcePath]?.content;
            const name = path_1.default.relative(basePath, sourcePath);
            if (content === undefined) {
                throw new Error(`Content for ${name} not available`);
            }
            return (sources[sourceId] = { name, content });
        }
    }
    return ({ src }) => {
        const [begin, , sourceId] = src.split(':').map(Number);
        const { name, content } = getSource(sourceId);
        const line = content.substr(0, begin).split('\n').length;
        return name + ':' + line;
    };
}
//# sourceMappingURL=src-decoder.js.map