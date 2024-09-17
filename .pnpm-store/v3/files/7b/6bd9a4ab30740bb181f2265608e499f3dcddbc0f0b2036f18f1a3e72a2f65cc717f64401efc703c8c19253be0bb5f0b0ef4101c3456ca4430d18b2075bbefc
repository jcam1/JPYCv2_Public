"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const fs_1 = require("fs");
const rimraf_1 = require("rimraf");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const build_info_file_1 = require("./build-info-file");
ava_1.default.beforeEach(async (t) => {
    process.chdir(await fs_1.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), `upgrades-core-test-${t.title.replace(/\s/g, '-')}-`)));
});
ava_1.default.afterEach(async () => {
    await (0, rimraf_1.rimraf)(process.cwd());
});
const BUILD_INFO = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['storageLayout'],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
        },
    },
};
const BUILD_INFO_2 = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContractModified {}',
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['storageLayout'],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 456,
            },
        },
    },
};
const BUILD_INFO_NO_LAYOUT = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi'],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
        },
    },
};
const BUILD_INFO_INDIVIDUAL_NO_LAYOUT = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
            'mypath/MyContractV2.sol': {
                content: 'contract MyContractV2 {}',
            },
        },
        settings: {
            outputSelection: {
                'mypath/MyContract.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata'],
                },
                'mypath/MyContractV2.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata'],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
            'mypath/MyContractV2.sol': {
                ast: {},
                id: 456,
            },
        },
    },
};
const BUILD_INFO_INDIVIDUAL_HAS_LAYOUT = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
            'mypath/MyContractV2.sol': {
                content: 'contract MyContractV2 {}',
            },
        },
        settings: {
            outputSelection: {
                'mypath/MyContract.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata', 'storageLayout'],
                },
                'mypath/MyContractV2.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata', 'storageLayout'],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
            'mypath/MyContractV2.sol': {
                ast: {},
                id: 456,
            },
        },
    },
};
const BUILD_INFO_PARTIAL_LAYOUT = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
            'mypath/MyContractV2.sol': {
                content: 'contract MyContractV2 {}',
            },
        },
        settings: {
            outputSelection: {
                'mypath/MyContract.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata', 'storageLayout'],
                },
                'mypath/MyContractV2.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata'],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
            'mypath/MyContractV2.sol': {
                ast: {},
                id: 456,
            },
        },
    },
};
const BUILD_INFO_PARTIAL_COMPILE = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
            'mypath/MyContractV2.sol': {
                content: 'contract MyContractV2 {}',
            },
        },
        settings: {
            outputSelection: {
                'mypath/MyContract.sol': {
                    '': ['ast'],
                    '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'metadata', 'storageLayout'],
                },
                'mypath/MyContractV2.sol': {
                    '': [],
                    '*': [],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
            'mypath/MyContractV2.sol': {
                ast: {},
                id: 456,
            },
        },
    },
};
const BUILD_INFO_NO_OUTPUT_SELECTION = {
    solcVersion: '0.8.9',
    input: {
        language: 'Solidity',
        sources: {
            'mypath/MyContract.sol': {
                content: 'contract MyContract {}',
            },
            'mypath/MyContractV2.sol': {
                content: 'contract MyContractV2 {}',
            },
        },
        settings: {
            outputSelection: {
                'mypath/MyContract.sol': {
                    '*': [],
                },
                'mypath/MyContractV2.sol': {
                    '': [],
                    '*': [],
                },
            },
        },
    },
    output: {
        sources: {
            'mypath/MyContract.sol': {
                ast: {},
                id: 123,
            },
            'mypath/MyContractV2.sol': {
                ast: {},
                id: 456,
            },
        },
    },
};
ava_1.default.serial('get build info files - default hardhat', async (t) => {
    await fs_1.promises.mkdir('artifacts/build-info', { recursive: true });
    await fs_1.promises.mkdir('out/build-info', { recursive: true }); // should be ignored since it's empty
    await fs_1.promises.writeFile('artifacts/build-info/build-info.json', JSON.stringify(BUILD_INFO));
    await fs_1.promises.writeFile('artifacts/build-info/build-info-2.json', JSON.stringify(BUILD_INFO_2));
    const buildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)();
    assertBuildInfoFiles(t, buildInfoFiles);
});
ava_1.default.serial('get build info files - default foundry', async (t) => {
    await fs_1.promises.mkdir('out/build-info', { recursive: true });
    await fs_1.promises.mkdir('artifacts/build-info', { recursive: true }); // should be ignored since it's empty
    await fs_1.promises.writeFile('out/build-info/build-info.json', JSON.stringify(BUILD_INFO));
    await fs_1.promises.writeFile('out/build-info/build-info-2.json', JSON.stringify(BUILD_INFO_2));
    const buildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)();
    assertBuildInfoFiles(t, buildInfoFiles);
});
ava_1.default.serial('get build info files - both hardhat and foundry dirs exist', async (t) => {
    await fs_1.promises.mkdir('artifacts/build-info', { recursive: true });
    await fs_1.promises.writeFile('artifacts/build-info/build-info.json', JSON.stringify(BUILD_INFO));
    await fs_1.promises.mkdir('out/build-info', { recursive: true });
    await fs_1.promises.writeFile('out/build-info/build-info-2.json', JSON.stringify(BUILD_INFO_2));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)());
    t.true(error?.message.includes('Found both Hardhat and Foundry build info directories'));
});
ava_1.default.serial('get build info files - no default dirs exist', async (t) => {
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)());
    t.true(error?.message.includes('Could not find the default Hardhat or Foundry build info directory'));
});
ava_1.default.serial('get build info files - override with custom relative path', async (t) => {
    await fs_1.promises.mkdir('artifacts/build-info', { recursive: true });
    await fs_1.promises.mkdir('out/build-info', { recursive: true });
    await fs_1.promises.mkdir('custom/build-info', { recursive: true });
    await fs_1.promises.writeFile('custom/build-info/build-info.json', JSON.stringify(BUILD_INFO));
    await fs_1.promises.writeFile('custom/build-info/build-info-2.json', JSON.stringify(BUILD_INFO_2));
    const buildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)('custom/build-info');
    assertBuildInfoFiles(t, buildInfoFiles);
});
ava_1.default.serial('get build info files - override with custom absolute path', async (t) => {
    await fs_1.promises.mkdir('artifacts/build-info', { recursive: true });
    await fs_1.promises.mkdir('out/build-info', { recursive: true });
    await fs_1.promises.mkdir('custom/build-info', { recursive: true });
    await fs_1.promises.writeFile('custom/build-info/build-info.json', JSON.stringify(BUILD_INFO));
    await fs_1.promises.writeFile('custom/build-info/build-info-2.json', JSON.stringify(BUILD_INFO_2));
    const buildInfoFiles = await (0, build_info_file_1.getBuildInfoFiles)(path_1.default.join(process.cwd(), 'custom/build-info'));
    assertBuildInfoFiles(t, buildInfoFiles);
});
ava_1.default.serial('invalid build info file', async (t) => {
    await fs_1.promises.mkdir('invalid-build-info', { recursive: true });
    await fs_1.promises.writeFile('invalid-build-info/invalid.json', JSON.stringify({ output: {} }));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)('invalid-build-info'));
    t.true(error?.message.includes('must contain Solidity compiler input, output, and solcVersion'));
});
ava_1.default.serial('dir does not exist', async (t) => {
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)('invalid-dir'));
    t.true(error?.message.includes('does not exist'));
});
ava_1.default.serial('no build info files', async (t) => {
    const dir = 'empty-dir';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/notjson.txt`, 'abc');
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)(dir));
    t.true(error?.message.includes('does not contain any build info files'));
});
ava_1.default.serial('no storage layout', async (t) => {
    const dir = 'no-storage-layout';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/build-info.json`, JSON.stringify(BUILD_INFO_NO_LAYOUT));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)(dir));
    t.true(error?.message.includes('does not contain storage layout'));
});
ava_1.default.serial('individual output selections - no layout', async (t) => {
    const dir = 'individual-no-layout';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/build-info.json`, JSON.stringify(BUILD_INFO_INDIVIDUAL_NO_LAYOUT));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)(dir));
    t.true(error?.message.includes('does not contain storage layout'));
});
ava_1.default.serial('individual output selections - has layout', async (t) => {
    const dir = 'individual-has-layout';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/build-info.json`, JSON.stringify(BUILD_INFO_INDIVIDUAL_HAS_LAYOUT));
    t.assert((await (0, build_info_file_1.getBuildInfoFiles)(dir)).length === 1);
});
ava_1.default.serial('individual output selections - partial layout', async (t) => {
    const dir = 'partial-layout';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/build-info.json`, JSON.stringify(BUILD_INFO_PARTIAL_LAYOUT));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)(dir));
    t.true(error?.message.includes('does not contain storage layout'));
});
ava_1.default.serial('individual output selections - partial compile', async (t) => {
    const dir = 'partial-compile';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/build-info.json`, JSON.stringify(BUILD_INFO_PARTIAL_COMPILE));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)(dir));
    t.true(error?.message.includes('is not from a full compilation'));
});
ava_1.default.serial('no output selection', async (t) => {
    const dir = 'no-output';
    await fs_1.promises.mkdir(dir, { recursive: true });
    await fs_1.promises.writeFile(`${dir}/build-info.json`, JSON.stringify(BUILD_INFO_NO_OUTPUT_SELECTION));
    const error = await t.throwsAsync((0, build_info_file_1.getBuildInfoFiles)(dir));
    t.true(error?.message.includes('is not from a full compilation'));
});
function assertBuildInfoFiles(t, buildInfoFiles) {
    t.is(buildInfoFiles.length, 2);
    const buildInfoFile1 = buildInfoFiles.find(b => b.input.sources['mypath/MyContract.sol'].content === 'contract MyContract {}');
    const buildInfoFile2 = buildInfoFiles.find(b => b.input.sources['mypath/MyContract.sol'].content === 'contract MyContractModified {}');
    if (buildInfoFile1 === undefined || buildInfoFile2 === undefined) {
        t.fail('build info files not found');
    }
    else {
        t.is(buildInfoFile1.output.sources['mypath/MyContract.sol'].id, 123);
        t.is(buildInfoFile2.output.sources['mypath/MyContract.sol'].id, 456);
    }
}
//# sourceMappingURL=build-info-file.test.js.map