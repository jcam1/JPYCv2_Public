"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const link_refs_1 = require("./link-refs");
const bytecodeSolc = '0123456789__lib1____abcdef0123__lib2____4567890abcdef0123456__lib3______________789abcdef0123456789';
const bytecodeArtifact = '0x' + bytecodeSolc;
const bytecodeLink = '0x01234567891ADDRLIB01abcdef01232ADDRLIB024567890abcdef01234563ADDRESSLIB030000000789abcdef0123456789';
(0, ava_1.default)('extractLinkReferences', t => {
    const bytecode = {
        linkReferences: {
            'a.sol': {
                lib1: [{ length: 5, start: 5 }],
                lib2: [{ length: 5, start: 15 }],
            },
            'b.sol': {
                lib3: [{ length: 10, start: 30 }],
            },
        },
        object: bytecodeSolc,
    };
    const linkReferences = (0, link_refs_1.extractLinkReferences)(bytecode);
    t.is(linkReferences.length, 3);
    t.deepEqual(linkReferences[0], {
        src: 'a.sol',
        name: 'lib1',
        length: 5,
        start: 5,
        placeholder: '__lib1____',
    });
    t.deepEqual(linkReferences[1], {
        src: 'a.sol',
        name: 'lib2',
        length: 5,
        start: 15,
        placeholder: '__lib2____',
    });
    t.deepEqual(linkReferences[2], {
        src: 'b.sol',
        name: 'lib3',
        length: 10,
        start: 30,
        placeholder: '__lib3______________',
    });
});
(0, ava_1.default)('unlinkBytecode', t => {
    const linkReferences = [
        {
            src: 'a.sol',
            name: 'lib1',
            length: 5,
            start: 5,
            placeholder: '__lib1____',
        },
        {
            src: 'a.sol',
            name: 'lib2',
            length: 5,
            start: 15,
            placeholder: '__lib2____',
        },
        {
            src: 'b.sol',
            name: 'lib3',
            length: 10,
            start: 30,
            placeholder: '__lib3______________',
        },
    ];
    const unlinkedBytecode = (0, link_refs_1.unlinkBytecode)(bytecodeLink, linkReferences);
    t.is(unlinkedBytecode.length, bytecodeArtifact.length);
    t.is(unlinkedBytecode, bytecodeArtifact);
});
//# sourceMappingURL=link-refs.test.js.map