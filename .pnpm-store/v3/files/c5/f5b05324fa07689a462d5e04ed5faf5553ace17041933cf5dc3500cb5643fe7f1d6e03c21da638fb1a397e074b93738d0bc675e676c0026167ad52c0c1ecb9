"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const provider_1 = require("./provider");
const hash = '0x1234';
function makeProviderReturning(result) {
    return { send: (_method, _params) => Promise.resolve(result) };
}
(0, ava_1.default)('getTransactionReceipt returns null', async (t) => {
    const provider = makeProviderReturning(null);
    t.is(await (0, provider_1.getTransactionReceipt)(provider, hash), null);
});
(0, ava_1.default)('getTransactionReceipt status returns 0x0', async (t) => {
    const provider = makeProviderReturning({ status: '0x0' });
    const receipt = await (0, provider_1.getTransactionReceipt)(provider, hash);
    t.is(receipt?.status, '0x0');
});
(0, ava_1.default)('getTransactionReceipt status returns 0x1', async (t) => {
    const provider = makeProviderReturning({ status: '0x1' });
    const receipt = await (0, provider_1.getTransactionReceipt)(provider, hash);
    t.is(receipt?.status, '0x1');
});
(0, ava_1.default)('getTransactionReceipt status normalizes to 0x0', async (t) => {
    const provider = makeProviderReturning({ status: '0x000000000000000000000000' });
    const receipt = await (0, provider_1.getTransactionReceipt)(provider, hash);
    t.is(receipt?.status, '0x0');
});
(0, ava_1.default)('getTransactionReceipt status normalizes to 0x1', async (t) => {
    const provider = makeProviderReturning({ status: '0x000000000000000000000001' });
    const receipt = await (0, provider_1.getTransactionReceipt)(provider, hash);
    t.is(receipt?.status, '0x1');
});
(0, ava_1.default)('getTransactionReceipt status returns empty hex', async (t) => {
    const provider = makeProviderReturning({ status: '0x' });
    const receipt = await (0, provider_1.getTransactionReceipt)(provider, hash);
    t.is(receipt?.status, '0x');
});
//# sourceMappingURL=provider.test.js.map