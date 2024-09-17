"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const run_1 = require("./run");
(0, ava_1.default)('getAnnotationArgs', t => {
    const doc = ' @custom:oz-upgrades-unsafe-allow constructor selfdestruct';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), ['constructor', 'selfdestruct']);
});
(0, ava_1.default)('getAnnotationArgs no arg', t => {
    const doc = ' @custom:oz-upgrades-unsafe-allow';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), []);
});
(0, ava_1.default)('getAnnotationArgs space no arg', t => {
    const doc = ' @custom:oz-upgrades-unsafe-allow ';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), []);
});
(0, ava_1.default)('getAnnotationArgs whitespace at end', t => {
    const doc = ' @custom:oz-upgrades-unsafe-allow constructor ';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), ['constructor']);
});
(0, ava_1.default)('getAnnotationArgs same type', t => {
    const doc = ' @custom:oz-upgrades-unsafe-allow constructor\n @custom:oz-upgrades-unsafe-allow selfdestruct';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), ['constructor', 'selfdestruct']);
});
(0, ava_1.default)('getAnnotationArgs multiline', t => {
    const doc = ' othercomments\n @custom:oz-upgrades-unsafe-allow constructor selfdestruct\n @custom:oz-upgrades-unsafe-allow-reachable delegatecall';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), ['constructor', 'selfdestruct']);
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow-reachable'), ['delegatecall']);
});
(0, ava_1.default)('getAnnotationArgs multiline with spaces and comments', t => {
    const doc = ' some other comments\n @custom:oz-upgrades-unsafe-allow \n   constructor    \n   selfdestruct    \n @custom:oz-upgrades-unsafe-allow-reachable  \n   delegatecall';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), ['constructor', 'selfdestruct']);
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow-reachable'), ['delegatecall']);
});
(0, ava_1.default)('getAnnotationArgs multiline multiple preceding spaces', t => {
    const doc = ' @custom:oz-upgrades-unsafe-allow constructor selfdestruct \n         @custom:oz-upgrades-unsafe-allow-reachable delegatecall    ';
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow'), ['constructor', 'selfdestruct']);
    t.deepEqual((0, run_1.getAnnotationArgs)(doc, 'oz-upgrades-unsafe-allow-reachable'), ['delegatecall']);
});
//# sourceMappingURL=run.test.js.map