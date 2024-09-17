"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCurrentLayoutVersion = isCurrentLayoutVersion;
exports.extractStorageLayout = extractStorageLayout;
exports.getTypeMembers = getTypeMembers;
exports.loadLayoutType = loadLayoutType;
const strict_1 = __importDefault(require("assert/strict"));
const utils_1 = require("solidity-ast/utils");
const layout_1 = require("./layout");
const type_id_1 = require("../utils/type-id");
const map_values_1 = require("../utils/map-values");
const pick_1 = require("../utils/pick");
const execall_1 = require("../utils/execall");
const namespace_1 = require("./namespace");
const currentLayoutVersion = '1.2';
function isCurrentLayoutVersion(layout) {
    return layout?.layoutVersion === currentLayoutVersion;
}
function extractStorageLayout(contractDef, decodeSrc, deref, storageLayout, namespacedContext) {
    const layout = { storage: [], types: {}, layoutVersion: currentLayoutVersion, flat: false };
    // The namespaced context will contain the types of namespaces that may not be included
    // in the original storage layout.
    // Some types will be present in both and they must be exactly equivalent.
    // If they are not, it fails an assertion because this may be a clash between different types.
    const combinedTypes = { ...namespacedContext?.storageLayout?.types, ...storageLayout?.types };
    if (namespacedContext?.storageLayout?.types) {
        for (const t in storageLayout?.types) {
            if (t in namespacedContext.storageLayout.types) {
                strict_1.default.deepEqual(namespacedContext.storageLayout.types[t], storageLayout?.types[t]);
            }
        }
    }
    layout.types = (0, map_values_1.mapValues)(combinedTypes, m => {
        return {
            label: m.label,
            members: m.members && (0, layout_1.isStructMembers)(m.members)
                ? m.members.map(m => (0, pick_1.pick)(m, ['label', 'type', 'offset', 'slot']))
                : m.members,
            numberOfBytes: m.numberOfBytes,
        };
    });
    if (storageLayout !== undefined) {
        for (const storage of storageLayout.storage) {
            const origin = getOriginContract(contractDef, storage.astId, deref);
            (0, strict_1.default)(origin, `Did not find variable declaration node for '${storage.label}'`);
            const { varDecl, contract } = origin;
            const { renamedFrom, retypedFrom } = getRetypedRenamed(varDecl);
            // Solc layout doesn't bring members for enums so we get them using the ast method
            loadLayoutType(varDecl.typeName, layout, deref);
            const { label, offset, slot, type } = storage;
            const src = decodeSrc(varDecl);
            layout.storage.push({ label, offset, slot, type, contract, src, retypedFrom, renamedFrom });
            layout.flat = true;
        }
    }
    else {
        for (const varDecl of contractDef.nodes) {
            if ((0, utils_1.isNodeType)('VariableDeclaration', varDecl)) {
                if (!varDecl.constant && varDecl.mutability !== 'immutable') {
                    const type = (0, type_id_1.normalizeTypeIdentifier)(typeDescriptions(varDecl).typeIdentifier);
                    const { renamedFrom, retypedFrom } = getRetypedRenamed(varDecl);
                    layout.storage.push({
                        contract: contractDef.name,
                        label: varDecl.name,
                        type,
                        src: decodeSrc(varDecl),
                        retypedFrom,
                        renamedFrom,
                    });
                    loadLayoutType(varDecl.typeName, layout, deref);
                }
            }
        }
    }
    const origContext = { deref, contractDef, storageLayout };
    (0, namespace_1.loadNamespaces)(decodeSrc, layout, origContext, namespacedContext);
    return layout;
}
const findTypeNames = (0, utils_1.findAll)([
    'ArrayTypeName',
    'ElementaryTypeName',
    'FunctionTypeName',
    'Mapping',
    'UserDefinedTypeName',
]);
function typeDescriptions(x) {
    (0, strict_1.default)(typeof x.typeDescriptions.typeIdentifier === 'string');
    (0, strict_1.default)(typeof x.typeDescriptions.typeString === 'string');
    return x.typeDescriptions;
}
function getTypeMembers(typeDef, includeFields = {}) {
    if (typeDef.nodeType === 'StructDefinition') {
        return typeDef.members.map(m => {
            (0, strict_1.default)(typeof m.typeDescriptions.typeIdentifier === 'string');
            const member = {
                label: m.name,
                type: (0, type_id_1.normalizeTypeIdentifier)(m.typeDescriptions.typeIdentifier),
            };
            if (includeFields.src && m.src) {
                member.src = m.src;
            }
            if (includeFields.typeName && m.typeName) {
                member.typeName = m.typeName;
            }
            return member;
        });
    }
    else {
        return typeDef.members.map(m => m.name);
    }
}
function getOriginContract(contract, astId, deref) {
    for (const id of contract.linearizedBaseContracts) {
        const parentContract = deref(['ContractDefinition'], id);
        const varDecl = parentContract.nodes.find(n => n.id == astId);
        if (varDecl && (0, utils_1.isNodeType)('VariableDeclaration', varDecl)) {
            return { varDecl, contract: parentContract.name };
        }
    }
}
function loadLayoutType(typeName, layout, deref) {
    var _a, _b;
    // Note: A UserDefinedTypeName can also refer to a ContractDefinition but we won't care about those.
    const derefUserDefinedType = deref(['StructDefinition', 'EnumDefinition', 'UserDefinedValueTypeDefinition']);
    (0, strict_1.default)(typeName != null);
    // We will recursively look for all types involved in this variable declaration in order to store their type
    // information. We iterate over a Map that is indexed by typeIdentifier to ensure we visit each type only once.
    // Note that there can be recursive types.
    const typeNames = new Map([...findTypeNames(typeName)].map(n => [typeDescriptions(n).typeIdentifier, n]));
    for (const typeName of typeNames.values()) {
        const { typeIdentifier, typeString: label } = typeDescriptions(typeName);
        const type = (0, type_id_1.normalizeTypeIdentifier)(typeIdentifier);
        (_a = layout.types)[type] ?? (_a[type] = { label });
        if ('referencedDeclaration' in typeName && !/^t_contract\b/.test(type)) {
            const typeDef = derefUserDefinedType(typeName.referencedDeclaration);
            if (typeDef.nodeType === 'UserDefinedValueTypeDefinition') {
                layout.types[type].underlying = typeDef.underlyingType.typeDescriptions.typeIdentifier ?? undefined;
            }
            else {
                (_b = layout.types[type]).members ?? (_b.members = getTypeMembers(typeDef));
            }
            // Recursively look for the types referenced in this definition and add them to the queue.
            for (const typeName of findTypeNames(typeDef)) {
                const { typeIdentifier } = typeDescriptions(typeName);
                if (!typeNames.has(typeIdentifier)) {
                    typeNames.set(typeIdentifier, typeName);
                }
            }
        }
    }
}
function getRetypedRenamed(varDecl) {
    let retypedFrom, renamedFrom;
    if ('documentation' in varDecl) {
        const docs = typeof varDecl.documentation === 'string' ? varDecl.documentation : (varDecl.documentation?.text ?? '');
        for (const { groups } of (0, execall_1.execall)(/^\s*(?:@(?<title>\w+)(?::(?<tag>[a-z][a-z-]*))? )?(?<args>(?:(?!^\s@\w+)[^])*)/m, docs)) {
            if (groups?.title === 'custom') {
                if (groups.tag === 'oz-retyped-from') {
                    retypedFrom = groups.args.trim();
                }
                else if (groups.tag === 'oz-renamed-from') {
                    renamedFrom = groups.args.trim();
                }
            }
        }
    }
    return { retypedFrom, renamedFrom };
}
//# sourceMappingURL=extract.js.map