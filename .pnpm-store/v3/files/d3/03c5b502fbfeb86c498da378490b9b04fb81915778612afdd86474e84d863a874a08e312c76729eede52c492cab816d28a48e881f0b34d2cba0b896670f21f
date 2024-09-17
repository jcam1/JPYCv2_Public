"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTDereferencerError = void 0;
exports.astDereferencer = astDereferencer;
exports.curry2 = curry2;
const is_node_type_1 = require("../utils/is-node-type");
const find_all_1 = require("../utils/find-all");
// An ASTDereferencer is a function that looks up an AST node given its id, in all of the source files involved in a
// solc run. It will generally be used together with the AST property `referencedDeclaration` (found in Identifier,
// UserDefinedTypeName, etc.) to look up a variable definition or type definition.
function astDereferencer(solcOutput) {
    const cache = new Map();
    const asts = Array.from(Object.values(solcOutput.sources), s => s.ast).sort((a, b) => a.id - b.id);
    function deref(nodeType, id) {
        const cached = cache.get(id);
        if (cached) {
            if ((0, is_node_type_1.isNodeType)(nodeType, cached.node)) {
                return cached;
            }
        }
        else if (id >= 0) {
            // Node ids appear to be assigned in postorder. This means that a node's own id is always
            // larger than that of the nodes under it. We descend through the AST guided by this
            // assumption. Among a set of sibling nodes we choose the one with the smallest id that
            // is larger than the id we're looking for.
            let ast = asts.find(ast => (id <= ast.id));
            let searchRoot = ast;
            while (searchRoot) {
                if (Array.isArray(searchRoot)) {
                    searchRoot = searchRoot.find(child => child && (id <= child.id));
                }
                else if (searchRoot.id === id) {
                    break;
                }
                else {
                    let nextRoot, nextRootId;
                    for (const child of Object.values(searchRoot)) {
                        if (typeof child !== "object")
                            continue;
                        const childId = Array.isArray(child) ? child.findLast(n => n)?.id : child?.id;
                        if (childId === undefined)
                            continue;
                        if (id <= childId && (nextRootId === undefined || childId <= nextRootId)) {
                            nextRoot = child;
                            nextRootId = childId;
                        }
                    }
                    searchRoot = nextRoot;
                }
            }
            let found = searchRoot;
            // As a fallback mechanism in case the postorder assumption breaks, if the node is not found
            // we proceed to check all nodes in all ASTs.
            if (found === undefined) {
                outer: for (ast of asts) {
                    for (const node of (0, find_all_1.findAll)(nodeType, ast)) {
                        if (node.id === id) {
                            found = node;
                            break outer;
                        }
                    }
                }
            }
            if (found !== undefined) {
                const nodeWithSourceUnit = { node: found, sourceUnit: ast };
                cache.set(id, nodeWithSourceUnit);
                if ((0, is_node_type_1.isNodeType)(nodeType, found)) {
                    return nodeWithSourceUnit;
                }
            }
        }
        nodeType = Array.isArray(nodeType) ? nodeType : [nodeType];
        throw new ASTDereferencerError(id, nodeType);
    }
    function derefNode(nodeType, id) {
        return deref(nodeType, id).node;
    }
    return Object.assign(curry2(derefNode), { withSourceUnit: deref });
}
function curry2(fn) {
    function curried(a, ...b) {
        if (b.length === 0) {
            return b => fn(a, b);
        }
        else {
            return fn(a, ...b);
        }
    }
    return curried;
}
class ASTDereferencerError extends Error {
    id;
    nodeType;
    constructor(id, nodeType) {
        super(`No node with id ${id} of type ${nodeType}`);
        this.id = id;
        this.nodeType = nodeType;
    }
}
exports.ASTDereferencerError = ASTDereferencerError;
//# sourceMappingURL=ast-dereferencer.js.map