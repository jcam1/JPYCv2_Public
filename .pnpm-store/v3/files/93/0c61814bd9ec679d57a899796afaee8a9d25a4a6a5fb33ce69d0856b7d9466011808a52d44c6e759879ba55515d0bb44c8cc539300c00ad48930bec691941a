"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAnnotationTag = hasAnnotationTag;
exports.getAnnotationArgs = getAnnotationArgs;
exports.getDocumentation = getDocumentation;
const execall_1 = require("./execall");
/**
 * Whether the given doc string has an annotation tag.
 */
function hasAnnotationTag(doc, tag) {
    const regex = new RegExp(`^\\s*(@custom:${tag})(\\s|$)`, 'm');
    return regex.test(doc);
}
/**
 * Get args from the doc string matching the given tag.
 *
 * @param doc The doc string to parse
 * @param tag The tag to match
 * @param supportedArgs The list of supported args, or undefined if all args are supported
 */
function getAnnotationArgs(doc, tag, supportedArgs) {
    const result = [];
    for (const { groups } of (0, execall_1.execall)(/^\s*(?:@(?<title>\w+)(?::(?<tag>[a-z][a-z-]*))? )?(?<args>(?:(?!^\s*@\w+)[^])*)/m, doc)) {
        if (groups && groups.title === 'custom' && groups.tag === tag) {
            const trimmedArgs = groups.args.trim();
            if (trimmedArgs.length > 0) {
                result.push(...trimmedArgs.split(/\s+/));
            }
        }
    }
    if (supportedArgs !== undefined) {
        result.forEach(arg => {
            if (!supportedArgs.includes(arg)) {
                throw new Error(`NatSpec: ${tag} argument not recognized: ${arg}`);
            }
        });
    }
    return result;
}
/**
 * Get the documentation string for the given node.
 * @param node The node
 * @returns The documentation string, or an empty string if the node has no documentation
 */
function getDocumentation(node) {
    if ('documentation' in node) {
        return typeof node.documentation === 'string' ? node.documentation : (node.documentation?.text ?? '');
    }
    else {
        return '';
    }
}
//# sourceMappingURL=annotations.js.map