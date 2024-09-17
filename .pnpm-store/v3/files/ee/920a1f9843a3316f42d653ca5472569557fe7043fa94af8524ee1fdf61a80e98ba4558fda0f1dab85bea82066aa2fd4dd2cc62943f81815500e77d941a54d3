"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.srcDecoder = srcDecoder;
const path_1 = __importDefault(require("path"));
function srcDecoder(solcInput, solcOutput, basePath = '.') {
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
                throw new Error(`Content for '${name}' not available`);
            }
            return (sources[sourceId] = { name, content: Buffer.from(content, 'utf8') });
        }
    }
    return ({ src }) => {
        const [begin, , sourceId] = src.split(':').map(Number);
        const { name, content } = getSource(sourceId);
        const line = 1 + countInBuffer(content.subarray(0, begin), '\n');
        return name + ':' + line;
    };
}
function countInBuffer(buf, str) {
    let count = 0;
    let from = 0;
    while (true) {
        let i = buf.indexOf(str, from);
        if (i === -1)
            break;
        count += 1;
        from = i + str.length;
    }
    return count;
}
//# sourceMappingURL=src-decoder.js.map