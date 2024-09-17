"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractLinkReferences = extractLinkReferences;
exports.unlinkBytecode = unlinkBytecode;
function extractLinkReferences(bytecode) {
    const linkRefs = [];
    const { linkReferences } = bytecode;
    for (const source of Object.keys(linkReferences)) {
        for (const name of Object.keys(linkReferences[source])) {
            for (const { length, start } of linkReferences[source][name]) {
                const placeholder = bytecode.object.substr(start * 2, length * 2);
                linkRefs.push({
                    src: source,
                    name,
                    length,
                    start,
                    placeholder,
                });
            }
        }
    }
    return linkRefs;
}
function unlinkBytecode(bytecode, linkReferences) {
    let unlinkedBytecode = bytecode.replace(/^0x/, '');
    for (const linkRef of linkReferences) {
        const { length, start, placeholder } = linkRef;
        if ((start + length) * 2 <= unlinkedBytecode.length) {
            unlinkedBytecode =
                unlinkedBytecode.substr(0, start * 2) + placeholder + unlinkedBytecode.substr((start + length) * 2);
        }
    }
    return '0x' + unlinkedBytecode;
}
//# sourceMappingURL=link-refs.js.map