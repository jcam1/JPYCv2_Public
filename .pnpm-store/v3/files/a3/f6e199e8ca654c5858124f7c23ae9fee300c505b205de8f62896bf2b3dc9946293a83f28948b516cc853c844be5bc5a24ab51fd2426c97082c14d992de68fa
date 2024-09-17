"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTypeId = parseTypeId;
const assert_1 = __importDefault(require("assert"));
// The examples below illustrate the meaning of these properties.
// 1) id = t_struct(MyStruct)storage
//         └──────┘ └──────┘ └─────┘
//           head    args[0]   tail
//    rets = undefined
// 2) id = t_function_internal_nonpayable(t_uint256,t_uint256)returns(t_address)
//         └────────────────────────────┘ └───────┘ └───────┘         └───────┘
//                      head               args[0]   args[1]           rets[0]
//    tail = undefined
// 3) id = t_uint256
//         └───────┘
//           head
//    args = undefined
//    tail = undefined
//    rets = undefined
function parseTypeId(id) {
    const matcher = new StatefulGlobalMatcher(id);
    function parseList() {
        const args = [];
        let i = matcher.index;
        let delim;
        while ((delim = matcher.match(/[(),]/))) {
            if (delim[0] === '(') {
                let depth = 1;
                while (depth > 0) {
                    const paren = matcher.match(/[()]/)?.[0];
                    if (paren === '(') {
                        depth += 1;
                    }
                    else if (paren === ')') {
                        depth -= 1;
                    }
                    else {
                        throw new Error(`Malformed type id ${id}`);
                    }
                }
            }
            else {
                const subtype = id.slice(i, delim.index);
                if (subtype) {
                    args.push(parseTypeId(subtype));
                }
                i = delim.index + 1;
                if (delim[0] === ')') {
                    break;
                }
            }
        }
        return args;
    }
    const openArgs = matcher.match(/\(/);
    const head = id.slice(0, openArgs?.index);
    let args, tail, rets;
    if (openArgs) {
        args = parseList();
        const startTail = matcher.index;
        const openRet = matcher.match(/\(/);
        if (!openRet) {
            tail = id.slice(startTail) || undefined;
        }
        else {
            (0, assert_1.default)(id.slice(startTail, openRet.index) === 'returns', `Malformed type id ${id}`);
            rets = parseList();
        }
    }
    return { id, head, args, tail, rets };
}
class StatefulGlobalMatcher {
    constructor(text) {
        this.text = text;
        this.index = 0;
    }
    match(re) {
        const gre = new RegExp(re, 'g');
        gre.lastIndex = this.index;
        const match = gre.exec(this.text);
        if (match !== null) {
            this.index = gre.lastIndex;
        }
        return match;
    }
}
//# sourceMappingURL=parse-type-id.js.map