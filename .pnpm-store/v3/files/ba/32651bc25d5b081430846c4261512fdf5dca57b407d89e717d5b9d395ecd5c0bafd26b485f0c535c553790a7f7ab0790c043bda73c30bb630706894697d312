"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionSignature = getFunctionSignature;
const assert_1 = require("./assert");
function serializeParameterType(parameter, deref) {
    const { typeName, storageLocation } = parameter;
    (0, assert_1.assert)(!!typeName);
    if (storageLocation === 'storage') {
        (0, assert_1.assert)(typeof typeName.typeDescriptions.typeString === 'string');
        return typeName.typeDescriptions.typeString.replace(/^struct /, '') + ' storage';
    }
    return serializeTypeName(typeName, deref);
}
function serializeTypeName(typeName, deref) {
    switch (typeName.nodeType) {
        case 'ArrayTypeName':
        case 'ElementaryTypeName': {
            (0, assert_1.assert)(typeof typeName.typeDescriptions.typeString === 'string');
            return typeName.typeDescriptions.typeString;
        }
        case 'UserDefinedTypeName': {
            const userDefinedType = deref(['StructDefinition', 'EnumDefinition', 'ContractDefinition', 'UserDefinedValueTypeDefinition'], typeName.referencedDeclaration);
            switch (userDefinedType.nodeType) {
                case 'StructDefinition':
                    return '(' + userDefinedType.members.map(member => serializeParameterType(member, deref)) + ')';
                case 'EnumDefinition':
                    (0, assert_1.assert)(userDefinedType.members.length < 256);
                    return 'uint8';
                case 'ContractDefinition':
                    return 'address';
                case 'UserDefinedValueTypeDefinition':
                    return serializeTypeName(userDefinedType.underlyingType, deref);
                default:
                    return (0, assert_1.assertUnreachable)(userDefinedType);
            }
        }
        case 'FunctionTypeName': {
            return `function`;
        }
        default:
            throw new Error(`Unsuported TypeName node type: ${typeName.nodeType}`);
    }
}
function getFunctionSignature(fnDef, deref) {
    return `${fnDef.name}(${fnDef.parameters.parameters
        .map(parameter => serializeParameterType(parameter, deref))
        .join()})`;
}
//# sourceMappingURL=function.js.map