"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const ava_1 = __importDefault(require("ava"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = require("rimraf");
const fs_1 = require("fs");
const compare_versions_1 = require("compare-versions");
const migrate_oz_cli_project_1 = require("./migrate-oz-cli-project");
const BASE_PATH = 'src/scripts';
const OPENZEPPELIN_FOLDER = '.openzeppelin';
const PROJECT_FILE = path_1.default.join(OPENZEPPELIN_FOLDER, 'project.json');
const EXPORT_FILE = 'openzeppelin-cli-export.json';
const NETWORK_FILE = path_1.default.join(OPENZEPPELIN_FOLDER, 'rinkeby.json');
let migratableData;
let migrationOutput;
let projectData;
ava_1.default.before(async () => {
    migratableData = JSON.parse(await fs_1.promises.readFile(path_1.default.join(BASE_PATH, 'migratable-manifest.test.json'), 'utf8'));
    projectData = JSON.parse(await fs_1.promises.readFile(path_1.default.join(BASE_PATH, 'project-file.test.json'), 'utf8'));
    migrationOutput = (0, migrate_oz_cli_project_1.migrateManifestsData)({ rinkeby: migratableData });
    process.chdir(await fs_1.promises.mkdtemp(path_1.default.join(os_1.default.tmpdir(), 'migration-test-')));
    await fs_1.promises.mkdir(OPENZEPPELIN_FOLDER);
    await fs_1.promises.writeFile(PROJECT_FILE, JSON.stringify(projectData, null, 2));
    await fs_1.promises.writeFile(NETWORK_FILE, JSON.stringify(migratableData, null, 2));
    await (0, migrate_oz_cli_project_1.migrateLegacyProject)();
});
ava_1.default.after(async () => {
    await (0, rimraf_1.rimraf)(process.cwd());
});
(0, ava_1.default)('transforms manifest data', async (t) => {
    t.snapshot(migrationOutput.newManifestsData);
});
(0, ava_1.default)('produces network export data', async (t) => {
    t.snapshot(migrationOutput.networksExportData);
});
(0, ava_1.default)('deletes project file', async (t) => {
    const error = await t.throwsAsync(() => fs_1.promises.access(PROJECT_FILE));
    t.is(error?.message, `ENOENT: no such file or directory, access '${PROJECT_FILE}'`);
});
(0, ava_1.default)('export file contains networks and compiler data', async (t) => {
    const actual = JSON.parse(await fs_1.promises.readFile(EXPORT_FILE, 'utf8'));
    const expected = {
        networks: migrationOutput.networksExportData,
        compiler: projectData.compiler,
    };
    t.deepEqual(actual, expected);
});
(0, ava_1.default)('zosversion', t => {
    const migratableDataZosVersion = { zosversion: '2.2', ...migratableData };
    delete migratableDataZosVersion.manifestVersion;
    const output = (0, migrate_oz_cli_project_1.migrateManifestsData)({ rinkeby: migratableDataZosVersion });
    t.true((0, compare_versions_1.compare)(output.newManifestsData.rinkeby.manifestVersion, '3.0', '>='));
});
//# sourceMappingURL=migrate-oz-cli-project.test.js.map