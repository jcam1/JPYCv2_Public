"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgradeabilityAssessment = getUpgradeabilityAssessment;
const annotations_1 = require("../../utils/annotations");
const query_1 = require("../../validate/query");
const error_1 = require("./error");
const find_contract_1 = require("./find-contract");
function getUpgradeabilityAssessment(contract, buildInfoDictionary, overrideReferenceContract) {
    const fullContractName = contract.fullyQualifiedName;
    const contractValidation = contract.validationData[fullContractName];
    const isUUPS = (0, query_1.inferUUPS)(contract.validationData, fullContractName);
    const annotationAssessment = getAnnotationAssessment(contract);
    let referenceContract = overrideReferenceContract;
    if (referenceContract === undefined && annotationAssessment.referenceName !== undefined) {
        referenceContract = (0, find_contract_1.findContract)(annotationAssessment.referenceName, contract, buildInfoDictionary);
    }
    let isReferenceUUPS = false;
    if (referenceContract !== undefined) {
        isReferenceUUPS = (0, query_1.inferUUPS)(referenceContract.validationData, referenceContract.fullyQualifiedName);
    }
    return {
        upgradeable: referenceContract !== undefined ||
            annotationAssessment.upgradeable ||
            (0, query_1.inferInitializable)(contractValidation) ||
            isUUPS,
        referenceContract: referenceContract,
        uups: isReferenceUUPS || isUUPS,
    };
}
function getAnnotationAssessment(contract) {
    const node = contract.node;
    if ('documentation' in node) {
        const doc = (0, annotations_1.getDocumentation)(node);
        const tag = 'oz-upgrades';
        const hasUpgradeAnnotation = (0, annotations_1.hasAnnotationTag)(doc, tag);
        if (hasUpgradeAnnotation) {
            getAndValidateAnnotationArgs(doc, tag, contract, 0);
        }
        const upgradesFrom = getUpgradesFrom(doc, contract);
        if (upgradesFrom !== undefined) {
            return {
                upgradeable: true,
                referenceName: upgradesFrom,
            };
        }
        else {
            return {
                upgradeable: hasUpgradeAnnotation,
            };
        }
    }
    else {
        return {
            upgradeable: false,
        };
    }
}
function getAndValidateAnnotationArgs(doc, tag, contract, expectedLength) {
    const annotationArgs = (0, annotations_1.getAnnotationArgs)(doc, tag, undefined);
    if (annotationArgs.length !== expectedLength) {
        throw new error_1.ValidateCommandError(`Invalid number of arguments for @custom:${tag} annotation in contract ${contract.fullyQualifiedName}.`, () => `Found ${annotationArgs.length}, expected ${expectedLength}.`);
    }
    return annotationArgs;
}
function getUpgradesFrom(doc, contract) {
    const tag = 'oz-upgrades-from';
    if ((0, annotations_1.hasAnnotationTag)(doc, tag)) {
        const annotationArgs = getAndValidateAnnotationArgs(doc, tag, contract, 1);
        return annotationArgs[0];
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=upgradeability-assessment.js.map