"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const query_1 = require("./query");
const version_1 = require("../version");
(0, ava_1.default)('getUnlinkedBytecode', t => {
    const unlinkedBytecode = '0x12__$5ae0c2211b657f8a7ca51e0b14f2a8333d$__78';
    const linkedBytecode = '0x12456456456456456456456456456456456456456478';
    const validation = {
        B: {
            version: (0, version_1.getVersion)(unlinkedBytecode),
            linkReferences: [
                {
                    src: '',
                    name: '',
                    start: 50,
                    length: 20,
                    placeholder: '__$5ae0c2211b657f8a7ca51e0b14f2a8333d$__',
                },
                {
                    src: '',
                    name: '',
                    start: 30,
                    length: 20,
                    placeholder: '__$5ae0c2211b657f8a7ca51e0b14f2a8333d$__',
                },
            ],
        },
        A: {
            version: (0, version_1.getVersion)(unlinkedBytecode),
            linkReferences: [
                {
                    src: '',
                    name: '',
                    start: 1,
                    length: 20,
                    placeholder: '__$5ae0c2211b657f8a7ca51e0b14f2a8333d$__',
                },
            ],
        },
    };
    const recovered = (0, query_1.getUnlinkedBytecode)(validation, linkedBytecode);
    t.is(recovered, unlinkedBytecode);
});
//# sourceMappingURL=query.test.js.map