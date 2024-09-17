"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const hardhat_1 = require("hardhat");
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const make_namespaced_1 = require("./make-namespaced");
(0, ava_1.default)('make namespaced input', async (t) => {
    const origBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedToModifyImported.sol:Example');
    await testMakeNamespaced(origBuildInfo, t, '0.8.20');
});
(0, ava_1.default)('make namespaced input - keep all natspec', async (t) => {
    const origBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedToModifyImported.sol:Example');
    await testMakeNamespaced(origBuildInfo, t, '0.8.20', true);
});
(0, ava_1.default)('make namespaced input - solc 0.7', async (t) => {
    // The nameNamespacedInput function must work for different solc versions, since it is called before we check whether namespaces are used with solc >= 0.8.20
    const origBuildInfo = await hardhat_1.artifacts.getBuildInfo('contracts/test/NamespacedToModify07.sol:HasFunction');
    await testMakeNamespaced(origBuildInfo, t, '0.7.6');
});
async function testMakeNamespaced(origBuildInfo, t, solcVersion, keepAllNatSpec = false) {
    if (origBuildInfo === undefined) {
        throw new Error('Build info not found');
    }
    // Inefficient, but we want to test that we don't actually modify the original input object
    const origInput = JSON.parse(JSON.stringify(origBuildInfo.input));
    const modifiedInput = (0, make_namespaced_1.makeNamespacedInput)(origBuildInfo.input, origBuildInfo.output, keepAllNatSpec ? undefined : origBuildInfo.solcVersion);
    // Run hardhat compile on the modified input and make sure it has no errors
    const modifiedOutput = await hardhatCompile(modifiedInput, solcVersion);
    t.is(modifiedOutput.errors, undefined, JSON.stringify(modifiedInput.sources, null, 2));
    normalizeIdentifiers(modifiedInput);
    t.snapshot(modifiedInput);
    t.deepEqual(origBuildInfo.input, origInput);
    t.notDeepEqual(modifiedInput, origInput);
}
function normalizeIdentifiers(input) {
    for (const source of Object.values(input.sources)) {
        if (source.content !== undefined) {
            source.content = source.content
                .replace(/\$MainStorage_\d{1,6}/g, '$MainStorage_random')
                .replace(/\$SecondaryStorage_\d{1,6}/g, '$SecondaryStorage_random')
                .replace(/\$StorageWithComment_\d{1,6}/g, '$StorageWithComment_random')
                .replace(/\$astId_\d+_\d{1,6}/g, '$astId_id_random');
        }
    }
}
async function hardhatCompile(input, solcVersion) {
    const solcBuild = await (0, hardhat_1.run)(task_names_1.TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, {
        quiet: true,
        solcVersion,
    });
    if (solcBuild.isSolcJs) {
        return await (0, hardhat_1.run)(task_names_1.TASK_COMPILE_SOLIDITY_RUN_SOLCJS, {
            input,
            solcJsPath: solcBuild.compilerPath,
        });
    }
    else {
        return await (0, hardhat_1.run)(task_names_1.TASK_COMPILE_SOLIDITY_RUN_SOLC, {
            input,
            solcPath: solcBuild.compilerPath,
        });
    }
}
//# sourceMappingURL=make-namespaced.test.js.map