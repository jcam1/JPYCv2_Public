"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execall = execall;
function* execall(re, text) {
    re = new RegExp(re, re.flags + (re.sticky ? '' : 'y'));
    while (true) {
        const match = re.exec(text);
        if (match && match[0] !== '') {
            yield match;
        }
        else {
            break;
        }
    }
}
//# sourceMappingURL=execall.js.map