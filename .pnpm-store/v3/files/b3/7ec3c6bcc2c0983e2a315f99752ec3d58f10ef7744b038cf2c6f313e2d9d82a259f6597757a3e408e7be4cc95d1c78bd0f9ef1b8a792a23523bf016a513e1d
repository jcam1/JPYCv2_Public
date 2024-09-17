"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const minimist_1 = __importDefault(require("minimist"));
const validate_1 = require("./validate");
const sinon_1 = __importDefault(require("sinon"));
const run_1 = require("../validate/run");
ava_1.default.afterEach.always(() => {
    sinon_1.default.restore();
});
(0, ava_1.default)('getFunctionArgs - invalid command', t => {
    const parsedArgs = (0, minimist_1.default)(['invalid']);
    const extraArgs = parsedArgs._;
    t.throws(() => (0, validate_1.getFunctionArgs)(parsedArgs, extraArgs), {
        message: `Invalid command: invalid. Supported commands are: validate`,
    });
});
(0, ava_1.default)('getFunctionArgs - invalid options', async (t) => {
    const parsedArgs = (0, minimist_1.default)(['validate', 'build-info.json', '--foo', '--bar', 'xyz']);
    const extraArgs = parsedArgs._;
    t.throws(() => (0, validate_1.getFunctionArgs)(parsedArgs, extraArgs), {
        message: `Invalid options: foo, bar`,
    });
});
(0, ava_1.default)('getFunctionArgs - command only', t => {
    const parsedArgs = (0, minimist_1.default)(['validate']);
    const extraArgs = parsedArgs._;
    const functionArgs = (0, validate_1.getFunctionArgs)(parsedArgs, extraArgs);
    if (functionArgs === undefined) {
        t.fail();
    }
    else {
        t.is(functionArgs.buildInfoDir, undefined);
        t.is(functionArgs.opts.unsafeAllowRenames, false);
        t.is(functionArgs.opts.unsafeSkipStorageCheck, false);
        t.is(functionArgs.opts.unsafeAllowCustomTypes, false);
        t.is(functionArgs.opts.unsafeAllowLinkedLibraries, false);
        t.deepEqual(functionArgs.opts.unsafeAllow, []);
    }
});
(0, ava_1.default)('getFunctionArgs - command with arg', t => {
    const parsedArgs = (0, minimist_1.default)(['validate', 'build-info.json']);
    const extraArgs = parsedArgs._;
    const functionArgs = (0, validate_1.getFunctionArgs)(parsedArgs, extraArgs);
    if (functionArgs === undefined) {
        t.fail();
    }
    else {
        t.is(functionArgs.buildInfoDir, 'build-info.json');
        t.is(functionArgs.opts.unsafeAllowRenames, false);
        t.is(functionArgs.opts.unsafeSkipStorageCheck, false);
        t.is(functionArgs.opts.unsafeAllowCustomTypes, false);
        t.is(functionArgs.opts.unsafeAllowLinkedLibraries, false);
        t.deepEqual(functionArgs.opts.unsafeAllow, []);
    }
});
(0, ava_1.default)('withDefaults - empty', t => {
    const parsedArgs = (0, minimist_1.default)(['validate', 'build-info.json']);
    const opts = (0, validate_1.withDefaults)(parsedArgs);
    t.is(opts.unsafeAllowRenames, false);
    t.is(opts.unsafeSkipStorageCheck, false);
    t.is(opts.unsafeAllowCustomTypes, false);
    t.is(opts.unsafeAllowLinkedLibraries, false);
    t.deepEqual(opts.unsafeAllow, []);
});
(0, ava_1.default)('withDefaults - some', t => {
    const parsedArgs = (0, minimist_1.default)([
        'validate',
        'build-info.json',
        '--unsafeAllowRenames',
        '--unsafeAllow',
        'selfdestruct, delegatecall,constructor',
    ]);
    const opts = (0, validate_1.withDefaults)(parsedArgs);
    t.is(opts.unsafeAllowRenames, true);
    t.is(opts.unsafeSkipStorageCheck, false);
    t.is(opts.unsafeAllowCustomTypes, false);
    t.is(opts.unsafeAllowLinkedLibraries, false);
    t.deepEqual(opts.unsafeAllow, ['selfdestruct', 'delegatecall', 'constructor']);
});
(0, ava_1.default)('withDefaults - all', t => {
    const parsedArgs = (0, minimist_1.default)([
        'validate',
        'build-info.json',
        '--unsafeAllowRenames',
        '--unsafeSkipStorageCheck',
        '--unsafeAllowCustomTypes',
        '--unsafeAllowLinkedLibraries',
        '--unsafeAllow',
        ...run_1.errorKinds,
    ]);
    const opts = (0, validate_1.withDefaults)(parsedArgs);
    t.is(opts.unsafeAllowRenames, true);
    t.is(opts.unsafeSkipStorageCheck, true);
    t.is(opts.unsafeAllowCustomTypes, true);
    t.is(opts.unsafeAllowLinkedLibraries, true);
    t.true(opts.unsafeAllow.every((kind) => run_1.errorKinds.includes(kind)));
});
(0, ava_1.default)('withDefaults - invalid unsafeAllow', t => {
    const parsedArgs = (0, minimist_1.default)(['validate', 'build-info.json', '--unsafeAllow', 'foo']);
    t.throws(() => (0, validate_1.withDefaults)(parsedArgs), {
        message: `Invalid option: --unsafeAllow "foo". Supported values for the --unsafeAllow option are: ${run_1.errorKinds.join(', ')}`,
    });
});
(0, ava_1.default)('withDefaults - empty unsafeAllow', t => {
    const parsedArgs = (0, minimist_1.default)(['validate', 'build-info.json', '--unsafeAllow']);
    t.throws(() => (0, validate_1.withDefaults)(parsedArgs), {
        message: `Invalid option: --unsafeAllow cannot be empty`,
    });
});
(0, ava_1.default)('withDefaults - unsafeAllow multiple times', t => {
    const parsedArgs = (0, minimist_1.default)([
        'validate',
        'build-info.json',
        '--unsafeAllow',
        'selfdestruct',
        '--unsafeAllow',
        'delegatecall',
        '--unsafeAllow',
        'constructor',
    ]);
    const opts = (0, validate_1.withDefaults)(parsedArgs);
    t.deepEqual(opts.unsafeAllow, ['selfdestruct', 'delegatecall', 'constructor']);
});
//# sourceMappingURL=validate.test.js.map