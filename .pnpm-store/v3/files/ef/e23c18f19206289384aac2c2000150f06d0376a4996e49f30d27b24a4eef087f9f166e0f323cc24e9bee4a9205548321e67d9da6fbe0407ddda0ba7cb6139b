"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const parse_type_id_1 = require("./parse-type-id");
const fixtures = [
    't_uint256',
    't_enum(MyEnum)',
    't_struct(MyComplexStruct)storage',
    't_array(t_uint256)3_storage',
    't_mapping(t_uint256,t_uint256)',
    't_mapping(unknown,t_uint256)',
    't_mapping(t_uint256,t_array(t_bool)dyn_storage)',
    't_mapping(t_uint256,t_mapping(t_string_memory_ptr,t_address))',
    't_function_internal_nonpayable(t_uint256)returns()',
    't_array(t_function_internal_nonpayable(t_uint256)returns(t_address))10_storage',
];
for (const f of fixtures) {
    (0, ava_1.default)(f, t => {
        t.snapshot((0, parse_type_id_1.parseTypeId)(f));
    });
}
//# sourceMappingURL=parse-type-id.test.js.map