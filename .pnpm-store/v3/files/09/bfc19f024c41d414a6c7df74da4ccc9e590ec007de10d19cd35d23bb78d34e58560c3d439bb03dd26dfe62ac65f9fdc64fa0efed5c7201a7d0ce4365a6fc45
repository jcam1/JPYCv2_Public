"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorKinds = void 0;
exports.isOpcodeError = isOpcodeError;
exports.getAnnotationArgs = getAnnotationArgs;
exports.validate = validate;
const utils_1 = require("solidity-ast/utils");
const debug_1 = __importDefault(require("../utils/debug"));
const is_nullish_1 = require("../utils/is-nullish");
const function_1 = require("../utils/function");
const version_1 = require("../version");
const link_refs_1 = require("../link-refs");
const extract_1 = require("../storage/extract");
const contract_name_1 = require("../utils/contract-name");
const annotations_1 = require("../utils/annotations");
const namespace_1 = require("../storage/namespace");
const error_1 = require("../error");
const assert_1 = require("../utils/assert");
exports.errorKinds = [
    'state-variable-assignment',
    'state-variable-immutable',
    'external-library-linking',
    'struct-definition',
    'enum-definition',
    'constructor',
    'delegatecall',
    'selfdestruct',
    'missing-public-upgradeto',
    'internal-function-storage',
];
const OPCODES = {
    delegatecall: {
        kind: 'delegatecall',
        pattern: /^t_function_baredelegatecall_/,
    },
    selfdestruct: {
        kind: 'selfdestruct',
        pattern: /^t_function_selfdestruct_/,
    },
};
function isOpcodeError(error) {
    return error.kind === 'delegatecall' || error.kind === 'selfdestruct';
}
function getAllowed(node, reachable) {
    if ('documentation' in node) {
        const tag = `oz-upgrades-unsafe-allow${reachable ? '-reachable' : ''}`;
        const doc = (0, annotations_1.getDocumentation)(node);
        return getAnnotationArgs(doc, tag);
    }
    else {
        return [];
    }
}
function getAnnotationArgs(doc, tag) {
    return (0, annotations_1.getAnnotationArgs)(doc, tag, exports.errorKinds);
}
function skipCheckReachable(error, node) {
    return getAllowed(node, true).includes(error);
}
function skipCheck(error, node) {
    // skip both allow and allow-reachable errors in the lexical scope
    return getAllowed(node, false).includes(error) || getAllowed(node, true).includes(error);
}
/**
 * Runs validations on the given solc output.
 *
 * If `namespacedOutput` is provided, it is used to extract storage layout information for namespaced types.
 * It must be from a compilation with the same sources as `solcInput` and `solcOutput`, but with storage variables
 * injected for each namespaced struct so that the types are available in the storage layout. This can be obtained by
 * calling the `makeNamespacedInput` function from this package to create modified solc input, then compiling
 * that modified solc input to get the namespaced output.
 *
 * @param solcOutput Solc output to validate
 * @param decodeSrc Source decoder for the original source code
 * @param solcVersion The version of solc used to compile the contracts
 * @param solcInput Solc input that the compiler was invoked with
 * @param namespacedOutput Namespaced solc output to extract storage layout information for namespaced types
 * @returns A record of validation results for each fully qualified contract name
 */
function validate(solcOutput, decodeSrc, solcVersion, solcInput, namespacedOutput) {
    const validation = {};
    const fromId = {};
    const inheritIds = {};
    const libraryIds = {};
    const deref = (0, utils_1.astDereferencer)(solcOutput);
    const delegateCallCache = initOpcodeCache();
    const selfDestructCache = initOpcodeCache();
    for (const source in solcOutput.contracts) {
        checkNamespaceSolidityVersion(source, solcVersion, solcInput);
        checkNamespacesOutsideContract(source, solcOutput, decodeSrc);
        for (const contractName in solcOutput.contracts[source]) {
            const bytecode = solcOutput.contracts[source][contractName].evm.bytecode;
            const version = bytecode.object === '' ? undefined : (0, version_1.getVersion)(bytecode.object);
            const linkReferences = (0, link_refs_1.extractLinkReferences)(bytecode);
            validation[(0, contract_name_1.getFullyQualifiedName)(source, contractName)] = {
                src: contractName,
                version,
                inherit: [],
                libraries: [],
                methods: [],
                linkReferences,
                errors: [],
                layout: {
                    storage: [],
                    types: {},
                },
                solcVersion,
            };
        }
        for (const contractDef of (0, utils_1.findAll)('ContractDefinition', solcOutput.sources[source].ast)) {
            const key = (0, contract_name_1.getFullyQualifiedName)(source, contractDef.name);
            fromId[contractDef.id] = key;
            // May be undefined in case of duplicate contract names in Truffle
            const bytecode = solcOutput.contracts[source][contractDef.name]?.evm.bytecode;
            if (key in validation && bytecode !== undefined) {
                inheritIds[key] = contractDef.linearizedBaseContracts.slice(1);
                libraryIds[key] = getReferencedLibraryIds(contractDef);
                validation[key].src = decodeSrc(contractDef);
                validation[key].errors = [
                    ...getConstructorErrors(contractDef, decodeSrc),
                    ...getOpcodeErrors(contractDef, deref, decodeSrc, delegateCallCache, selfDestructCache),
                    ...getStateVariableErrors(contractDef, decodeSrc),
                    // TODO: add linked libraries support
                    // https://github.com/OpenZeppelin/openzeppelin-upgrades/issues/52
                    ...getLinkingErrors(contractDef, bytecode),
                    ...getInternalFunctionStorageErrors(contractDef, deref, decodeSrc),
                ];
                validation[key].layout = (0, extract_1.extractStorageLayout)(contractDef, decodeSrc, deref, solcOutput.contracts[source][contractDef.name].storageLayout, getNamespacedCompilationContext(source, contractDef, namespacedOutput));
                validation[key].methods = [...(0, utils_1.findAll)('FunctionDefinition', contractDef)]
                    .filter(fnDef => ['external', 'public'].includes(fnDef.visibility))
                    .map(fnDef => (0, function_1.getFunctionSignature)(fnDef, deref));
            }
        }
    }
    for (const key in inheritIds) {
        validation[key].inherit = inheritIds[key].map(id => fromId[id]);
    }
    for (const key in libraryIds) {
        validation[key].libraries = libraryIds[key].map(id => fromId[id]);
    }
    return validation;
}
function checkNamespaceSolidityVersion(source, solcVersion, solcInput) {
    if (solcInput === undefined) {
        // This should only be missing if using an old version of the Hardhat or Truffle plugin.
        // Even without this param, namespace layout checks would still occur if compiled with solc version >= 0.8.20
        (0, debug_1.default)('Cannot check Solidity version for namespaces because solcInput is undefined');
    }
    else {
        // Solc versions older than 0.8.20 do not have documentation for structs.
        // Use a regex to check for strings that look like namespace annotations, and if found, check that the compiler version is >= 0.8.20
        const content = solcInput.sources[source].content;
        const hasMatch = content !== undefined && content.match(/@custom:storage-location/);
        if (hasMatch) {
            if (solcVersion === undefined) {
                throw new error_1.UpgradesError(`${source}: Namespace annotations require Solidity version >= 0.8.20, but no solcVersion parameter was provided`, () => `Structs with the @custom:storage-location annotation can only be used with Solidity version 0.8.20 or higher. Pass the solcVersion parameter to the validate function, or remove the annotation if the struct is not used for namespaced storage.`);
            }
            else if (!(0, namespace_1.isNamespaceSupported)(solcVersion)) {
                throw new error_1.UpgradesError(`${source}: Namespace annotations require Solidity version >= 0.8.20, but ${solcVersion} was used`, () => `Structs with the @custom:storage-location annotation can only be used with Solidity version 0.8.20 or higher. Use a newer version of Solidity, or remove the annotation if the struct is not used for namespaced storage.`);
            }
        }
    }
}
function checkNamespacesOutsideContract(source, solcOutput, decodeSrc) {
    for (const node of solcOutput.sources[source].ast.nodes) {
        if ((0, utils_1.isNodeType)('StructDefinition', node)) {
            const storageLocation = (0, namespace_1.getStorageLocationAnnotation)(node);
            if (storageLocation !== undefined) {
                throw new error_1.UpgradesError(`${decodeSrc(node)}: Namespace struct ${node.name} is defined outside of a contract`, () => `Structs with the @custom:storage-location annotation must be defined within a contract. Move the struct definition into a contract, or remove the annotation if the struct is not used for namespaced storage.`);
            }
        }
    }
}
function getNamespacedCompilationContext(source, contractDef, namespacedOutput) {
    if (namespacedOutput === undefined || contractDef.canonicalName === undefined) {
        return undefined;
    }
    if (namespacedOutput.sources[source] === undefined) {
        throw new Error(`Source ${source} not found in namespaced solc output`);
    }
    const namespacedContractDef = namespacedOutput.sources[source].ast.nodes
        .filter((0, utils_1.isNodeType)('ContractDefinition'))
        .find(c => c.canonicalName === contractDef.canonicalName);
    if (namespacedContractDef === undefined) {
        throw new Error(`Contract definition with name ${contractDef.canonicalName} not found in namespaced solc output`);
    }
    const storageLayout = namespacedOutput.contracts[source][contractDef.name].storageLayout;
    if (storageLayout === undefined) {
        throw new Error(`Storage layout for contract ${contractDef.canonicalName} not found in namespaced solc output`);
    }
    return {
        contractDef: namespacedContractDef,
        deref: (0, utils_1.astDereferencer)(namespacedOutput),
        storageLayout: storageLayout,
    };
}
function* getConstructorErrors(contractDef, decodeSrc) {
    for (const fnDef of (0, utils_1.findAll)('FunctionDefinition', contractDef, node => skipCheck('constructor', node))) {
        if (fnDef.kind === 'constructor' && ((fnDef.body?.statements?.length ?? 0) > 0 || fnDef.modifiers.length > 0)) {
            yield {
                kind: 'constructor',
                contract: contractDef.name,
                src: decodeSrc(fnDef),
            };
        }
    }
}
function initOpcodeCache() {
    return {
        mainContractErrors: new Map(),
        inheritedContractErrors: new Map(),
    };
}
function* getOpcodeErrors(contractDef, deref, decodeSrc, delegateCallCache, selfDestructCache) {
    yield* getContractOpcodeErrors(contractDef, deref, decodeSrc, OPCODES.delegatecall, 'main', delegateCallCache);
    yield* getContractOpcodeErrors(contractDef, deref, decodeSrc, OPCODES.selfdestruct, 'main', selfDestructCache);
}
function* getContractOpcodeErrors(contractDef, deref, decodeSrc, opcode, scope, cache) {
    const cached = getCachedOpcodes(contractDef.id, scope, cache);
    if (cached !== undefined) {
        yield* cached;
    }
    else {
        const errors = [];
        setCachedOpcodes(contractDef.id, scope, cache, errors);
        errors.push(...getFunctionOpcodeErrors(contractDef, deref, decodeSrc, opcode, scope, cache), ...getInheritedContractOpcodeErrors(contractDef, deref, decodeSrc, opcode, cache));
        yield* errors;
    }
}
function getCachedOpcodes(key, scope, cache) {
    return scope === 'main' ? cache.mainContractErrors.get(key) : cache.inheritedContractErrors.get(key);
}
function* getFunctionOpcodeErrors(contractOrFunctionDef, deref, decodeSrc, opcode, scope, cache) {
    const parentContractDef = getParentDefinition(deref, contractOrFunctionDef);
    if (parentContractDef === undefined || !skipCheck(opcode.kind, parentContractDef)) {
        yield* getDirectFunctionOpcodeErrors(contractOrFunctionDef, decodeSrc, opcode, scope);
    }
    if (parentContractDef === undefined || !skipCheckReachable(opcode.kind, parentContractDef)) {
        yield* getReferencedFunctionOpcodeErrors(contractOrFunctionDef, deref, decodeSrc, opcode, scope, cache);
    }
}
function* getDirectFunctionOpcodeErrors(contractOrFunctionDef, decodeSrc, opcode, scope) {
    for (const fnCall of (0, utils_1.findAll)('FunctionCall', contractOrFunctionDef, node => skipCheck(opcode.kind, node) || (scope === 'inherited' && isInternalFunction(node)))) {
        const fn = fnCall.expression;
        if (fn.typeDescriptions.typeIdentifier?.match(opcode.pattern)) {
            yield {
                kind: opcode.kind,
                src: decodeSrc(fnCall),
            };
        }
    }
}
function* getReferencedFunctionOpcodeErrors(contractOrFunctionDef, deref, decodeSrc, opcode, scope, cache) {
    for (const fnCall of (0, utils_1.findAll)('FunctionCall', contractOrFunctionDef, node => skipCheckReachable(opcode.kind, node) || (scope === 'inherited' && isInternalFunction(node)))) {
        const fn = fnCall.expression;
        if ('referencedDeclaration' in fn && fn.referencedDeclaration && fn.referencedDeclaration > 0) {
            // non-positive references refer to built-in functions
            const referencedNode = tryDerefFunction(deref, fn.referencedDeclaration);
            if (referencedNode !== undefined) {
                const cached = getCachedOpcodes(referencedNode.id, scope, cache);
                if (cached !== undefined) {
                    yield* cached;
                }
                else {
                    const errors = [];
                    setCachedOpcodes(referencedNode.id, scope, cache, errors);
                    errors.push(...getFunctionOpcodeErrors(referencedNode, deref, decodeSrc, opcode, scope, cache));
                    yield* errors;
                }
            }
        }
    }
}
function setCachedOpcodes(key, scope, cache, errors) {
    if (scope === 'main') {
        cache.mainContractErrors.set(key, errors);
    }
    else {
        cache.inheritedContractErrors.set(key, errors);
    }
}
function tryDerefFunction(deref, referencedDeclaration) {
    try {
        return deref(['FunctionDefinition'], referencedDeclaration);
    }
    catch (e) {
        if (!e.message.includes('No node with id')) {
            throw e;
        }
    }
}
function tryDerefStruct(deref, referencedDeclaration) {
    try {
        return deref(['StructDefinition'], referencedDeclaration);
    }
    catch (e) {
        if (!e.message.includes('No node with id')) {
            throw e;
        }
    }
}
function* getInheritedContractOpcodeErrors(contractDef, deref, decodeSrc, opcode, cache) {
    if (!skipCheckReachable(opcode.kind, contractDef)) {
        for (const base of contractDef.baseContracts) {
            const referencedContract = deref('ContractDefinition', base.baseName.referencedDeclaration);
            yield* getContractOpcodeErrors(referencedContract, deref, decodeSrc, opcode, 'inherited', cache);
        }
    }
}
function getParentDefinition(deref, contractOrFunctionDef) {
    const parentNode = deref(['ContractDefinition', 'SourceUnit'], contractOrFunctionDef.scope);
    if (parentNode.nodeType === 'ContractDefinition') {
        return parentNode;
    }
}
function isInternalFunction(node) {
    return (node.nodeType === 'FunctionDefinition' &&
        node.kind !== 'constructor' && // do not consider constructors as internal, because they are always called by children contracts' constructors
        (node.visibility === 'internal' || node.visibility === 'private'));
}
function* getStateVariableErrors(contractDef, decodeSrc) {
    for (const varDecl of contractDef.nodes) {
        if ((0, utils_1.isNodeType)('VariableDeclaration', varDecl)) {
            if (varDecl.mutability === 'immutable') {
                if (!skipCheck('state-variable-immutable', contractDef) && !skipCheck('state-variable-immutable', varDecl)) {
                    yield {
                        kind: 'state-variable-immutable',
                        name: varDecl.name,
                        src: decodeSrc(varDecl),
                    };
                }
            }
            else if (!varDecl.constant && !(0, is_nullish_1.isNullish)(varDecl.value)) {
                // Assignments are only a concern for non-immutable variables
                if (!skipCheck('state-variable-assignment', contractDef) && !skipCheck('state-variable-assignment', varDecl)) {
                    yield {
                        kind: 'state-variable-assignment',
                        name: varDecl.name,
                        src: decodeSrc(varDecl),
                    };
                }
            }
        }
    }
}
function getReferencedLibraryIds(contractDef) {
    const implicitUsage = [...(0, utils_1.findAll)('UsingForDirective', contractDef)]
        .map(usingForDirective => {
        if (usingForDirective.libraryName !== undefined) {
            return usingForDirective.libraryName.referencedDeclaration;
        }
        else if (usingForDirective.functionList !== undefined) {
            return [];
        }
        else {
            throw new Error('Broken invariant: either UsingForDirective.libraryName or UsingForDirective.functionList should be defined');
        }
    })
        .flat();
    const explicitUsage = [...(0, utils_1.findAll)('Identifier', contractDef)]
        .filter(identifier => identifier.typeDescriptions.typeString?.match(/^type\(library/))
        .map(identifier => {
        if ((0, is_nullish_1.isNullish)(identifier.referencedDeclaration)) {
            throw new Error('Broken invariant: Identifier.referencedDeclaration should not be null');
        }
        return identifier.referencedDeclaration;
    });
    return [...new Set(implicitUsage.concat(explicitUsage))];
}
function* getLinkingErrors(contractDef, bytecode) {
    const { linkReferences } = bytecode;
    for (const source of Object.keys(linkReferences)) {
        for (const libName of Object.keys(linkReferences[source])) {
            if (!skipCheck('external-library-linking', contractDef)) {
                yield {
                    kind: 'external-library-linking',
                    name: libName,
                    src: source,
                };
            }
        }
    }
}
function* getInternalFunctionStorageErrors(contractOrStructDef, deref, decodeSrc, visitedNodeIds = new Set()) {
    // Note: Solidity does not allow annotations for non-public state variables, nor recursive types for public variables,
    // so annotations cannot be used to skip these checks.
    for (const variableDec of getVariableDeclarations(contractOrStructDef, visitedNodeIds)) {
        if (variableDec.typeName?.nodeType === 'FunctionTypeName' && variableDec.typeName.visibility === 'internal') {
            // Find internal function types directly in this node's scope
            yield {
                kind: 'internal-function-storage',
                name: variableDec.name,
                src: decodeSrc(variableDec),
            };
        }
        else if (variableDec.typeName) {
            const userDefinedType = findUserDefinedType(variableDec.typeName);
            // Recursively try to dereference struct since it may be declared elsewhere
            if (userDefinedType !== undefined && !visitedNodeIds.has(userDefinedType.referencedDeclaration)) {
                const structDef = tryDerefStruct(deref, userDefinedType.referencedDeclaration);
                if (structDef !== undefined) {
                    visitedNodeIds.add(userDefinedType.referencedDeclaration);
                    yield* getInternalFunctionStorageErrors(structDef, deref, decodeSrc, visitedNodeIds);
                }
            }
        }
    }
}
/**
 * Gets variables declared directly in a contract or in a struct definition.
 *
 * If this is a contract with struct definitions annotated with a storage location according to ERC-7201,
 * then the struct members are also included.
 */
function* getVariableDeclarations(contractOrStructDef, visitedNodeIds) {
    if (contractOrStructDef.nodeType === 'ContractDefinition') {
        for (const node of contractOrStructDef.nodes) {
            if (node.nodeType === 'VariableDeclaration') {
                yield node;
            }
            else if (node.nodeType === 'StructDefinition' &&
                (0, namespace_1.getStorageLocationAnnotation)(node) !== undefined &&
                !visitedNodeIds.has(node.id)) {
                visitedNodeIds.add(node.id);
                yield* getVariableDeclarations(node, visitedNodeIds);
            }
        }
    }
    else if (contractOrStructDef.nodeType === 'StructDefinition') {
        yield* contractOrStructDef.members;
    }
}
/**
 * Recursively traverse array and mapping types to find user-defined types (which may be struct references).
 */
function findUserDefinedType(typeName) {
    switch (typeName.nodeType) {
        case 'ArrayTypeName':
            return findUserDefinedType(typeName.baseType);
        case 'Mapping':
            // only mapping values can possibly refer to other array, mapping, or user-defined types
            return findUserDefinedType(typeName.valueType);
        case 'UserDefinedTypeName':
            return typeName;
        case 'ElementaryTypeName':
        case 'FunctionTypeName':
            return undefined;
        default:
            return (0, assert_1.assertUnreachable)(typeName);
    }
}
//# sourceMappingURL=run.js.map