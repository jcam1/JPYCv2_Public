"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentNotFound = exports.Manifest = void 0;
exports.migrateManifest = migrateManifest;
exports.normalizeManifestData = normalizeManifestData;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const provider_1 = require("./provider");
const proper_lockfile_1 = __importDefault(require("proper-lockfile"));
const compare_versions_1 = require("compare-versions");
const pick_1 = require("./utils/pick");
const map_values_1 = require("./utils/map-values");
const error_1 = require("./error");
const debug_1 = __importDefault(require("./utils/debug"));
const assert_1 = require("./utils/assert");
const currentManifestVersion = '3.2';
function defaultManifest() {
    return {
        manifestVersion: currentManifestVersion,
        impls: {},
        proxies: [],
    };
}
const MANIFEST_DEFAULT_DIR = process.env.MANIFEST_DEFAULT_DIR || '.openzeppelin';
const MANIFEST_TEMP_DIR = 'openzeppelin-upgrades';
async function getDevInstanceMetadata(provider, chainId) {
    let networkMetadata;
    let networkType;
    try {
        networkMetadata = await (0, provider_1.getAnvilMetadata)(provider);
        networkType = 'anvil';
    }
    catch (e) {
        try {
            networkMetadata = await (0, provider_1.getHardhatMetadata)(provider);
            networkType = 'hardhat';
        }
        catch (e) {
            return undefined;
        }
    }
    if (networkMetadata.chainId !== chainId) {
        throw new Error(`Broken invariant: Hardhat or Anvil metadata's chainId ${networkMetadata.chainId} does not match eth_chainId ${chainId}`);
    }
    return {
        networkName: networkType,
        instanceId: networkMetadata.instanceId,
        forkedNetwork: networkMetadata.forkedNetwork,
    };
}
function getSuffix(chainId, devInstanceMetadata) {
    if (devInstanceMetadata !== undefined) {
        return `${chainId}-${devInstanceMetadata.instanceId}`;
    }
    else {
        return `${chainId}`;
    }
}
class Manifest {
    static async forNetwork(provider) {
        const chainId = await (0, provider_1.getChainId)(provider);
        const devInstanceMetadata = await getDevInstanceMetadata(provider, chainId);
        if (devInstanceMetadata !== undefined) {
            return new Manifest(chainId, devInstanceMetadata, os_1.default.tmpdir());
        }
        else {
            return new Manifest(chainId);
        }
    }
    constructor(chainId, devInstanceMetadata, osTmpDir) {
        this.locked = false;
        this.chainId = chainId;
        this.chainIdSuffix = getSuffix(chainId, devInstanceMetadata);
        const defaultFallbackName = `unknown-${chainId}`;
        if (devInstanceMetadata !== undefined) {
            (0, assert_1.assert)(osTmpDir !== undefined);
            this.dir = path_1.default.join(osTmpDir, MANIFEST_TEMP_DIR);
            (0, debug_1.default)('development manifest directory:', this.dir);
            const devName = `${devInstanceMetadata.networkName}-${this.chainIdSuffix}`;
            const devFile = path_1.default.join(this.dir, `${devName}.json`);
            this.file = devFile;
            if (chainId === 31337) {
                this.fallbackFile = path_1.default.join(MANIFEST_DEFAULT_DIR, `${defaultFallbackName}.json`);
            }
            else {
                this.fallbackFile = devFile;
            }
            (0, debug_1.default)('development manifest file:', this.file, 'fallback file:', this.fallbackFile);
            if (devInstanceMetadata.forkedNetwork) {
                const forkedChainId = devInstanceMetadata.forkedNetwork.chainId;
                (0, debug_1.default)('forked network chain id:', forkedChainId);
                this.parent = new Manifest(forkedChainId);
            }
        }
        else {
            this.dir = MANIFEST_DEFAULT_DIR;
            const networkName = provider_1.networkNames[chainId];
            this.file = path_1.default.join(MANIFEST_DEFAULT_DIR, `${networkName ?? defaultFallbackName}.json`);
            this.fallbackFile = path_1.default.join(MANIFEST_DEFAULT_DIR, `${defaultFallbackName}.json`);
            (0, debug_1.default)('manifest file:', this.file, 'fallback file:', this.fallbackFile);
        }
    }
    async getAdmin() {
        return (await this.read()).admin;
    }
    async getDeploymentFromAddress(address) {
        const data = await this.read();
        const deployment = Object.values(data.impls).find(d => d?.address === address || d?.allAddresses?.includes(address));
        if (deployment === undefined) {
            throw new DeploymentNotFound(`Deployment at address ${address} is not registered`);
        }
        return deployment;
    }
    async getProxyFromAddress(address) {
        const data = await this.read();
        const deployment = data.proxies.find(d => d?.address === address);
        if (deployment === undefined) {
            throw new DeploymentNotFound(`Proxy at address ${address} is not registered`);
        }
        return deployment;
    }
    async addProxy(proxy) {
        await this.lockedRun(async () => {
            const data = await this.read();
            const existing = data.proxies.findIndex(p => p.address === proxy.address);
            if (existing >= 0) {
                data.proxies.splice(existing, 1);
            }
            data.proxies.push(proxy);
            await this.write(data);
        });
    }
    async exists(file) {
        try {
            await fs_1.promises.access(file);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async readFile() {
        if (this.file === this.fallbackFile) {
            return await fs_1.promises.readFile(this.file, 'utf8');
        }
        else {
            const fallbackExists = await this.exists(this.fallbackFile);
            const fileExists = await this.exists(this.file);
            if (fileExists && fallbackExists) {
                throw new error_1.UpgradesError(`Network files with different names ${this.fallbackFile} and ${this.file} were found for the same network.`, () => `More than one network file was found for chain ID ${this.chainId}. Determine which file is the most up to date version, then take a backup of and delete the other file.`);
            }
            else if (fallbackExists) {
                return await fs_1.promises.readFile(this.fallbackFile, 'utf8');
            }
            else {
                return await fs_1.promises.readFile(this.file, 'utf8');
            }
        }
    }
    async writeFile(content) {
        await this.moveFileIfRequired();
        await fs_1.promises.writeFile(this.file, content);
    }
    async moveFileIfRequired() {
        if (this.file !== this.fallbackFile && (await this.exists(this.fallbackFile))) {
            try {
                // copy and delete instead of rename to work across filesystems
                await fs_1.promises.copyFile(this.fallbackFile, this.file);
                await fs_1.promises.unlink(this.fallbackFile);
            }
            catch (e) {
                throw new Error(`Failed to move network file from ${this.fallbackFile} to ${this.file}: ${e.message}`);
            }
        }
    }
    async read(retries) {
        const release = this.locked ? undefined : await this.lock(retries);
        try {
            const data = JSON.parse(await this.readFile());
            return validateOrUpdateManifestVersion(data);
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                if (this.parent !== undefined) {
                    return await this.parent.read(retries);
                }
                else {
                    return defaultManifest();
                }
            }
            else {
                throw e;
            }
        }
        finally {
            await release?.();
        }
    }
    async write(data) {
        if (!this.locked) {
            throw new Error('Manifest must be locked');
        }
        const normalized = normalizeManifestData(data);
        await this.writeFile(JSON.stringify(normalized, null, 2) + '\n');
    }
    async lockedRun(cb) {
        if (this.locked) {
            throw new Error('Manifest is already locked');
        }
        const release = await this.lock();
        try {
            return await cb();
        }
        finally {
            await release();
        }
    }
    async lock(retries = 3) {
        const lockfileName = path_1.default.join(this.dir, `chain-${this.chainIdSuffix}`);
        await fs_1.promises.mkdir(path_1.default.dirname(lockfileName), { recursive: true });
        const release = await proper_lockfile_1.default.lock(lockfileName, { retries, realpath: false });
        this.locked = true;
        return async () => {
            await release();
            this.locked = false;
        };
    }
}
exports.Manifest = Manifest;
function validateOrUpdateManifestVersion(data) {
    if (typeof data.manifestVersion !== 'string') {
        throw new Error('Manifest version is missing');
    }
    else if ((0, compare_versions_1.compare)(data.manifestVersion, '3.0', '<')) {
        throw new Error('Found a manifest file for OpenZeppelin CLI. An automated migration is not yet available.');
    }
    else if ((0, compare_versions_1.compare)(data.manifestVersion, currentManifestVersion, '<')) {
        return migrateManifest(data);
    }
    else if (data.manifestVersion === currentManifestVersion) {
        return data;
    }
    else {
        throw new Error(`Unknown value for manifest version (${data.manifestVersion})`);
    }
}
function migrateManifest(data) {
    switch (data.manifestVersion) {
        case '3.0':
        case '3.1':
            data.manifestVersion = currentManifestVersion;
            data.proxies = [];
            return data;
        default:
            throw new Error('Manifest migration not available');
    }
}
class DeploymentNotFound extends Error {
}
exports.DeploymentNotFound = DeploymentNotFound;
function normalizeManifestData(input) {
    return {
        manifestVersion: input.manifestVersion,
        admin: input.admin && normalizeDeployment(input.admin),
        proxies: input.proxies.map(p => normalizeDeployment(p, ['kind'])),
        impls: (0, map_values_1.mapValues)(input.impls, i => i && normalizeDeployment(i, ['layout', 'allAddresses'])),
    };
}
function normalizeDeployment(input, include = []) {
    return (0, pick_1.pick)(input, ['address', 'txHash', 'remoteDeploymentId', ...include]);
}
//# sourceMappingURL=manifest.js.map