"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitializerData = void 0;
function getInitializerData(contractInterface, args, initializer) {
    if (initializer === false) {
        return '0x';
    }
    const allowNoInitialization = initializer === undefined && args.length === 0;
    initializer = initializer ?? 'initialize';
    try {
        const fragment = contractInterface.getFunction(initializer);
        return contractInterface.encodeFunctionData(fragment, args);
    }
    catch (e) {
        if (e instanceof Error) {
            if (allowNoInitialization && e.message.includes('no matching function')) {
                return '0x';
            }
        }
        throw e;
    }
}
exports.getInitializerData = getInitializerData;
//# sourceMappingURL=initializer-data.js.map