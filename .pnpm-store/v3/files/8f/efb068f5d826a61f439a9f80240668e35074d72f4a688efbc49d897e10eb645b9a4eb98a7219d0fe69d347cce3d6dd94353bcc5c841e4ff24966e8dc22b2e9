"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const levenshtein_1 = require("./levenshtein");
const match = (a, b) => (a === b ? undefined : { kind: 'replace', original: a, updated: b });
(0, ava_1.default)('equal', t => {
    const a = [...'abc'];
    const b = [...'abc'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.deepEqual(ops, []);
});
(0, ava_1.default)('append', t => {
    const a = [...'abc'];
    const b = [...'abcd'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.like(ops, {
        length: 1,
        0: {
            kind: 'append',
            updated: 'd',
        },
    });
});
(0, ava_1.default)('delete from end', t => {
    const a = [...'abcd'];
    const b = [...'abc'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.like(ops, {
        length: 1,
        0: {
            kind: 'delete',
            original: 'd',
        },
    });
});
(0, ava_1.default)('delete from middle', t => {
    const a = [...'abc'];
    const b = [...'ac'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.like(ops, {
        length: 1,
        0: {
            kind: 'delete',
            original: 'b',
        },
    });
});
(0, ava_1.default)('delete from beginning', t => {
    const a = [...'abc'];
    const b = [...'bc'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.like(ops, {
        length: 1,
        0: {
            kind: 'delete',
            original: 'a',
        },
    });
});
(0, ava_1.default)('insert', t => {
    const a = [...'abc'];
    const b = [...'azbc'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.like(ops, {
        length: 1,
        0: {
            kind: 'insert',
            updated: 'z',
        },
    });
});
(0, ava_1.default)('replace', t => {
    const a = [...'abc'];
    const b = [...'axc'];
    const ops = (0, levenshtein_1.levenshtein)(a, b, match);
    t.like(ops, {
        length: 1,
        0: {
            kind: 'replace',
            original: 'b',
            updated: 'x',
        },
    });
});
//# sourceMappingURL=levenshtein.test.js.map