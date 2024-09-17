"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const src_decoder_1 = require("./src-decoder");
(0, ava_1.default)('solcInputOutputDecoder', t => {
    const solcInput = {
        sources: {
            'a.sol': { content: '\n\n' },
            'b.sol': { content: '\n\n' },
        },
    };
    const solcOutput = {
        contracts: {},
        sources: {
            'a.sol': { id: 0, ast: undefined },
            'b.sol': { id: 1, ast: undefined },
        },
    };
    const decodeSrc = (0, src_decoder_1.solcInputOutputDecoder)(solcInput, solcOutput);
    t.is(decodeSrc({ src: '0:0:0' }), 'a.sol:1');
    t.is(decodeSrc({ src: '1:0:0' }), 'a.sol:2');
    t.is(decodeSrc({ src: '1:0:1' }), 'b.sol:2');
    t.is(decodeSrc({ src: '2:0:1' }), 'b.sol:3');
});
//# sourceMappingURL=src-decoder.test.js.map