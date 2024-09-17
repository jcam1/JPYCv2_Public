import { NonterminalNode, TerminalNode } from "../../cst";
export declare class SourceUnit {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get members(): SourceUnitMembers;
}
export declare class PragmaDirective {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get pragmaKeyword(): TerminalNode;
    get pragma(): Pragma;
    get semicolon(): TerminalNode;
}
export declare class ABICoderPragma {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get abicoderKeyword(): TerminalNode;
    get version(): TerminalNode;
}
export declare class ExperimentalPragma {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get experimentalKeyword(): TerminalNode;
    get feature(): ExperimentalFeature;
}
export declare class VersionPragma {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get solidityKeyword(): TerminalNode;
    get sets(): VersionExpressionSets;
}
export declare class VersionRange {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get start(): VersionLiteral;
    get minus(): TerminalNode;
    get end(): VersionLiteral;
}
export declare class VersionTerm {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operator(): VersionOperator | undefined;
    get literal(): VersionLiteral;
}
export declare class ImportDirective {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get importKeyword(): TerminalNode;
    get clause(): ImportClause;
    get semicolon(): TerminalNode;
}
export declare class PathImport {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get path(): StringLiteral;
    get alias(): ImportAlias | undefined;
}
export declare class NamedImport {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get asterisk(): TerminalNode;
    get alias(): ImportAlias;
    get fromKeyword(): TerminalNode;
    get path(): StringLiteral;
}
export declare class ImportDeconstruction {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openBrace(): TerminalNode;
    get symbols(): ImportDeconstructionSymbols;
    get closeBrace(): TerminalNode;
    get fromKeyword(): TerminalNode;
    get path(): StringLiteral;
}
export declare class ImportDeconstructionSymbol {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get name(): TerminalNode;
    get alias(): ImportAlias | undefined;
}
export declare class ImportAlias {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get asKeyword(): TerminalNode;
    get identifier(): TerminalNode;
}
export declare class UsingDirective {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get usingKeyword(): TerminalNode;
    get clause(): UsingClause;
    get forKeyword(): TerminalNode;
    get target(): UsingTarget;
    get globalKeyword(): TerminalNode | undefined;
    get semicolon(): TerminalNode;
}
export declare class UsingDeconstruction {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openBrace(): TerminalNode;
    get symbols(): UsingDeconstructionSymbols;
    get closeBrace(): TerminalNode;
}
export declare class UsingDeconstructionSymbol {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get name(): IdentifierPath;
    get alias(): UsingAlias | undefined;
}
export declare class UsingAlias {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get asKeyword(): TerminalNode;
    get operator(): UsingOperator;
}
export declare class ContractDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get abstractKeyword(): TerminalNode | undefined;
    get contractKeyword(): TerminalNode;
    get name(): TerminalNode;
    get inheritance(): InheritanceSpecifier | undefined;
    get openBrace(): TerminalNode;
    get members(): ContractMembers;
    get closeBrace(): TerminalNode;
}
export declare class InheritanceSpecifier {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get isKeyword(): TerminalNode;
    get types(): InheritanceTypes;
}
export declare class InheritanceType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): IdentifierPath;
    get arguments(): ArgumentsDeclaration | undefined;
}
export declare class InterfaceDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get interfaceKeyword(): TerminalNode;
    get name(): TerminalNode;
    get inheritance(): InheritanceSpecifier | undefined;
    get openBrace(): TerminalNode;
    get members(): InterfaceMembers;
    get closeBrace(): TerminalNode;
}
export declare class LibraryDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get libraryKeyword(): TerminalNode;
    get name(): TerminalNode;
    get openBrace(): TerminalNode;
    get members(): LibraryMembers;
    get closeBrace(): TerminalNode;
}
export declare class StructDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get structKeyword(): TerminalNode;
    get name(): TerminalNode;
    get openBrace(): TerminalNode;
    get members(): StructMembers;
    get closeBrace(): TerminalNode;
}
export declare class StructMember {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get name(): TerminalNode;
    get semicolon(): TerminalNode;
}
export declare class EnumDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get enumKeyword(): TerminalNode;
    get name(): TerminalNode;
    get openBrace(): TerminalNode;
    get members(): EnumMembers;
    get closeBrace(): TerminalNode;
}
export declare class ConstantDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get constantKeyword(): TerminalNode;
    get name(): TerminalNode;
    get equal(): TerminalNode;
    get value(): Expression;
    get semicolon(): TerminalNode;
}
export declare class StateVariableDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get attributes(): StateVariableAttributes;
    get name(): TerminalNode;
    get value(): StateVariableDefinitionValue | undefined;
    get semicolon(): TerminalNode;
}
export declare class StateVariableDefinitionValue {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get equal(): TerminalNode;
    get value(): Expression;
}
export declare class FunctionDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get functionKeyword(): TerminalNode;
    get name(): FunctionName;
    get parameters(): ParametersDeclaration;
    get attributes(): FunctionAttributes;
    get returns(): ReturnsDeclaration | undefined;
    get body(): FunctionBody;
}
export declare class ParametersDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get parameters(): Parameters;
    get closeParen(): TerminalNode;
}
export declare class Parameter {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get storageLocation(): StorageLocation | undefined;
    get name(): TerminalNode | undefined;
}
export declare class OverrideSpecifier {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get overrideKeyword(): TerminalNode;
    get overridden(): OverridePathsDeclaration | undefined;
}
export declare class OverridePathsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get paths(): OverridePaths;
    get closeParen(): TerminalNode;
}
export declare class ReturnsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get returnsKeyword(): TerminalNode;
    get variables(): ParametersDeclaration;
}
export declare class ConstructorDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get constructorKeyword(): TerminalNode;
    get parameters(): ParametersDeclaration;
    get attributes(): ConstructorAttributes;
    get body(): Block;
}
export declare class UnnamedFunctionDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get functionKeyword(): TerminalNode;
    get parameters(): ParametersDeclaration;
    get attributes(): UnnamedFunctionAttributes;
    get body(): FunctionBody;
}
export declare class FallbackFunctionDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get fallbackKeyword(): TerminalNode;
    get parameters(): ParametersDeclaration;
    get attributes(): FallbackFunctionAttributes;
    get returns(): ReturnsDeclaration | undefined;
    get body(): FunctionBody;
}
export declare class ReceiveFunctionDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get receiveKeyword(): TerminalNode;
    get parameters(): ParametersDeclaration;
    get attributes(): ReceiveFunctionAttributes;
    get body(): FunctionBody;
}
export declare class ModifierDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get modifierKeyword(): TerminalNode;
    get name(): TerminalNode;
    get parameters(): ParametersDeclaration | undefined;
    get attributes(): ModifierAttributes;
    get body(): FunctionBody;
}
export declare class ModifierInvocation {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get name(): IdentifierPath;
    get arguments(): ArgumentsDeclaration | undefined;
}
export declare class EventDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get eventKeyword(): TerminalNode;
    get name(): TerminalNode;
    get parameters(): EventParametersDeclaration;
    get anonymousKeyword(): TerminalNode | undefined;
    get semicolon(): TerminalNode;
}
export declare class EventParametersDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get parameters(): EventParameters;
    get closeParen(): TerminalNode;
}
export declare class EventParameter {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get indexedKeyword(): TerminalNode | undefined;
    get name(): TerminalNode | undefined;
}
export declare class UserDefinedValueTypeDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeKeyword(): TerminalNode;
    get name(): TerminalNode;
    get isKeyword(): TerminalNode;
    get valueType(): ElementaryType;
    get semicolon(): TerminalNode;
}
export declare class ErrorDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get errorKeyword(): TerminalNode;
    get name(): TerminalNode;
    get members(): ErrorParametersDeclaration;
    get semicolon(): TerminalNode;
}
export declare class ErrorParametersDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get parameters(): ErrorParameters;
    get closeParen(): TerminalNode;
}
export declare class ErrorParameter {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get name(): TerminalNode | undefined;
}
export declare class ArrayTypeName {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): TypeName;
    get openBracket(): TerminalNode;
    get index(): Expression | undefined;
    get closeBracket(): TerminalNode;
}
export declare class FunctionType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get functionKeyword(): TerminalNode;
    get parameters(): ParametersDeclaration;
    get attributes(): FunctionTypeAttributes;
    get returns(): ReturnsDeclaration | undefined;
}
export declare class MappingType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get mappingKeyword(): TerminalNode;
    get openParen(): TerminalNode;
    get keyType(): MappingKey;
    get equalGreaterThan(): TerminalNode;
    get valueType(): MappingValue;
    get closeParen(): TerminalNode;
}
export declare class MappingKey {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get keyType(): MappingKeyType;
    get name(): TerminalNode | undefined;
}
export declare class MappingValue {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get name(): TerminalNode | undefined;
}
export declare class AddressType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get addressKeyword(): TerminalNode;
    get payableKeyword(): TerminalNode | undefined;
}
export declare class Block {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openBrace(): TerminalNode;
    get statements(): Statements;
    get closeBrace(): TerminalNode;
}
export declare class UncheckedBlock {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get uncheckedKeyword(): TerminalNode;
    get block(): Block;
}
export declare class ExpressionStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get expression(): Expression;
    get semicolon(): TerminalNode;
}
export declare class AssemblyStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get assemblyKeyword(): TerminalNode;
    get label(): StringLiteral | undefined;
    get flags(): AssemblyFlagsDeclaration | undefined;
    get body(): YulBlock;
}
export declare class AssemblyFlagsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get flags(): AssemblyFlags;
    get closeParen(): TerminalNode;
}
export declare class TupleDeconstructionStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get varKeyword(): TerminalNode | undefined;
    get openParen(): TerminalNode;
    get elements(): TupleDeconstructionElements;
    get closeParen(): TerminalNode;
    get equal(): TerminalNode;
    get expression(): Expression;
    get semicolon(): TerminalNode;
}
export declare class TupleDeconstructionElement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get member(): TupleMember | undefined;
}
export declare class TypedTupleMember {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeName(): TypeName;
    get storageLocation(): StorageLocation | undefined;
    get name(): TerminalNode;
}
export declare class UntypedTupleMember {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get storageLocation(): StorageLocation | undefined;
    get name(): TerminalNode;
}
export declare class VariableDeclarationStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variableType(): VariableDeclarationType;
    get storageLocation(): StorageLocation | undefined;
    get name(): TerminalNode;
    get value(): VariableDeclarationValue | undefined;
    get semicolon(): TerminalNode;
}
export declare class VariableDeclarationValue {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get equal(): TerminalNode;
    get expression(): Expression;
}
export declare class IfStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get ifKeyword(): TerminalNode;
    get openParen(): TerminalNode;
    get condition(): Expression;
    get closeParen(): TerminalNode;
    get body(): Statement;
    get elseBranch(): ElseBranch | undefined;
}
export declare class ElseBranch {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get elseKeyword(): TerminalNode;
    get body(): Statement;
}
export declare class ForStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get forKeyword(): TerminalNode;
    get openParen(): TerminalNode;
    get initialization(): ForStatementInitialization;
    get condition(): ForStatementCondition;
    get iterator(): Expression | undefined;
    get closeParen(): TerminalNode;
    get body(): Statement;
}
export declare class WhileStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get whileKeyword(): TerminalNode;
    get openParen(): TerminalNode;
    get condition(): Expression;
    get closeParen(): TerminalNode;
    get body(): Statement;
}
export declare class DoWhileStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get doKeyword(): TerminalNode;
    get body(): Statement;
    get whileKeyword(): TerminalNode;
    get openParen(): TerminalNode;
    get condition(): Expression;
    get closeParen(): TerminalNode;
    get semicolon(): TerminalNode;
}
export declare class ContinueStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get continueKeyword(): TerminalNode;
    get semicolon(): TerminalNode;
}
export declare class BreakStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get breakKeyword(): TerminalNode;
    get semicolon(): TerminalNode;
}
export declare class ReturnStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get returnKeyword(): TerminalNode;
    get expression(): Expression | undefined;
    get semicolon(): TerminalNode;
}
export declare class EmitStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get emitKeyword(): TerminalNode;
    get event(): IdentifierPath;
    get arguments(): ArgumentsDeclaration;
    get semicolon(): TerminalNode;
}
export declare class TryStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get tryKeyword(): TerminalNode;
    get expression(): Expression;
    get returns(): ReturnsDeclaration | undefined;
    get body(): Block;
    get catchClauses(): CatchClauses;
}
export declare class CatchClause {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get catchKeyword(): TerminalNode;
    get error(): CatchClauseError | undefined;
    get body(): Block;
}
export declare class CatchClauseError {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get name(): TerminalNode | undefined;
    get parameters(): ParametersDeclaration;
}
export declare class RevertStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get revertKeyword(): TerminalNode;
    get error(): IdentifierPath | undefined;
    get arguments(): ArgumentsDeclaration;
    get semicolon(): TerminalNode;
}
export declare class ThrowStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get throwKeyword(): TerminalNode;
    get semicolon(): TerminalNode;
}
export declare class AssignmentExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class ConditionalExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): Expression;
    get questionMark(): TerminalNode;
    get trueExpression(): Expression;
    get colon(): TerminalNode;
    get falseExpression(): Expression;
}
export declare class OrExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class AndExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class EqualityExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class ComparisonExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class BitwiseOrExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class BitwiseXorExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class BitwiseAndExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class ShiftExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class AdditiveExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class MultiplicativeExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class ExponentiationExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leftOperand(): Expression;
    get operator(): TerminalNode;
    get rightOperand(): Expression;
}
export declare class PostfixExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): Expression;
    get operator(): TerminalNode;
}
export declare class PrefixExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operator(): TerminalNode;
    get operand(): Expression;
}
export declare class FunctionCallExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): Expression;
    get arguments(): ArgumentsDeclaration;
}
export declare class CallOptionsExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): Expression;
    get openBrace(): TerminalNode;
    get options(): CallOptions;
    get closeBrace(): TerminalNode;
}
export declare class MemberAccessExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): Expression;
    get period(): TerminalNode;
    get member(): TerminalNode;
}
export declare class IndexAccessExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): Expression;
    get openBracket(): TerminalNode;
    get start(): Expression | undefined;
    get end(): IndexAccessEnd | undefined;
    get closeBracket(): TerminalNode;
}
export declare class IndexAccessEnd {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get colon(): TerminalNode;
    get end(): Expression | undefined;
}
export declare class PositionalArgumentsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get arguments(): PositionalArguments;
    get closeParen(): TerminalNode;
}
export declare class NamedArgumentsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get arguments(): NamedArgumentGroup | undefined;
    get closeParen(): TerminalNode;
}
export declare class NamedArgumentGroup {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openBrace(): TerminalNode;
    get arguments(): NamedArguments;
    get closeBrace(): TerminalNode;
}
export declare class NamedArgument {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get name(): TerminalNode;
    get colon(): TerminalNode;
    get value(): Expression;
}
export declare class TypeExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get typeKeyword(): TerminalNode;
    get openParen(): TerminalNode;
    get typeName(): TypeName;
    get closeParen(): TerminalNode;
}
export declare class NewExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get newKeyword(): TerminalNode;
    get typeName(): TypeName;
}
export declare class TupleExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get items(): TupleValues;
    get closeParen(): TerminalNode;
}
export declare class TupleValue {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get expression(): Expression | undefined;
}
export declare class ArrayExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openBracket(): TerminalNode;
    get items(): ArrayValues;
    get closeBracket(): TerminalNode;
}
export declare class HexNumberExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get literal(): TerminalNode;
    get unit(): NumberUnit | undefined;
}
export declare class DecimalNumberExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get literal(): TerminalNode;
    get unit(): NumberUnit | undefined;
}
export declare class YulBlock {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openBrace(): TerminalNode;
    get statements(): YulStatements;
    get closeBrace(): TerminalNode;
}
export declare class YulFunctionDefinition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get functionKeyword(): TerminalNode;
    get name(): TerminalNode;
    get parameters(): YulParametersDeclaration;
    get returns(): YulReturnsDeclaration | undefined;
    get body(): YulBlock;
}
export declare class YulParametersDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get openParen(): TerminalNode;
    get parameters(): YulParameters;
    get closeParen(): TerminalNode;
}
export declare class YulReturnsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get minusGreaterThan(): TerminalNode;
    get variables(): YulVariableNames;
}
export declare class YulVariableDeclarationStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get letKeyword(): TerminalNode;
    get variables(): YulVariableNames;
    get value(): YulVariableDeclarationValue | undefined;
}
export declare class YulVariableDeclarationValue {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get assignment(): YulAssignmentOperator;
    get expression(): YulExpression;
}
export declare class YulVariableAssignmentStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variables(): YulPaths;
    get assignment(): YulAssignmentOperator;
    get expression(): YulExpression;
}
export declare class YulColonAndEqual {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get colon(): TerminalNode;
    get equal(): TerminalNode;
}
export declare class YulStackAssignmentStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get assignment(): YulStackAssignmentOperator;
    get variable(): TerminalNode;
}
export declare class YulEqualAndColon {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get equal(): TerminalNode;
    get colon(): TerminalNode;
}
export declare class YulIfStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get ifKeyword(): TerminalNode;
    get condition(): YulExpression;
    get body(): YulBlock;
}
export declare class YulForStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get forKeyword(): TerminalNode;
    get initialization(): YulBlock;
    get condition(): YulExpression;
    get iterator(): YulBlock;
    get body(): YulBlock;
}
export declare class YulSwitchStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get switchKeyword(): TerminalNode;
    get expression(): YulExpression;
    get cases(): YulSwitchCases;
}
export declare class YulDefaultCase {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get defaultKeyword(): TerminalNode;
    get body(): YulBlock;
}
export declare class YulValueCase {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get caseKeyword(): TerminalNode;
    get value(): YulLiteral;
    get body(): YulBlock;
}
export declare class YulLeaveStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get leaveKeyword(): TerminalNode;
}
export declare class YulBreakStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get breakKeyword(): TerminalNode;
}
export declare class YulContinueStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get continueKeyword(): TerminalNode;
}
export declare class YulLabel {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get label(): TerminalNode;
    get colon(): TerminalNode;
}
export declare class YulFunctionCallExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get operand(): YulExpression;
    get openParen(): TerminalNode;
    get arguments(): YulArguments;
    get closeParen(): TerminalNode;
}
export declare class SourceUnitMember {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): PragmaDirective | ImportDirective | ContractDefinition | InterfaceDefinition | LibraryDefinition | StructDefinition | EnumDefinition | FunctionDefinition | ErrorDefinition | UserDefinedValueTypeDefinition | UsingDirective | EventDefinition | ConstantDefinition;
}
export declare class Pragma {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ABICoderPragma | ExperimentalPragma | VersionPragma;
}
export declare class ExperimentalFeature {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): StringLiteral | TerminalNode;
}
export declare class VersionExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): VersionRange | VersionTerm;
}
export declare class VersionOperator {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class VersionLiteral {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): SimpleVersionLiteral | TerminalNode;
}
export declare class ImportClause {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): PathImport | NamedImport | ImportDeconstruction;
}
export declare class UsingClause {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): IdentifierPath | UsingDeconstruction;
}
export declare class UsingOperator {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class UsingTarget {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TypeName | TerminalNode;
}
export declare class ContractMember {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): UsingDirective | FunctionDefinition | ConstructorDefinition | ReceiveFunctionDefinition | FallbackFunctionDefinition | UnnamedFunctionDefinition | ModifierDefinition | StructDefinition | EnumDefinition | EventDefinition | ErrorDefinition | UserDefinedValueTypeDefinition | StateVariableDefinition;
}
export declare class StateVariableAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): OverrideSpecifier | TerminalNode;
}
export declare class FunctionName {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class FunctionAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ModifierInvocation | OverrideSpecifier | TerminalNode;
}
export declare class FunctionBody {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): Block | TerminalNode;
}
export declare class ConstructorAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ModifierInvocation | TerminalNode;
}
export declare class UnnamedFunctionAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ModifierInvocation | TerminalNode;
}
export declare class FallbackFunctionAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ModifierInvocation | OverrideSpecifier | TerminalNode;
}
export declare class ReceiveFunctionAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ModifierInvocation | OverrideSpecifier | TerminalNode;
}
export declare class ModifierAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): OverrideSpecifier | TerminalNode;
}
export declare class TypeName {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ArrayTypeName | FunctionType | MappingType | ElementaryType | IdentifierPath;
}
export declare class FunctionTypeAttribute {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class MappingKeyType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ElementaryType | IdentifierPath;
}
export declare class ElementaryType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): AddressType | TerminalNode;
}
export declare class Statement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): IfStatement | ForStatement | WhileStatement | DoWhileStatement | ContinueStatement | BreakStatement | ReturnStatement | ThrowStatement | EmitStatement | TryStatement | RevertStatement | AssemblyStatement | Block | UncheckedBlock | TupleDeconstructionStatement | VariableDeclarationStatement | ExpressionStatement;
}
export declare class TupleMember {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TypedTupleMember | UntypedTupleMember;
}
export declare class VariableDeclarationType {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TypeName | TerminalNode;
}
export declare class StorageLocation {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class ForStatementInitialization {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TupleDeconstructionStatement | VariableDeclarationStatement | ExpressionStatement | TerminalNode;
}
export declare class ForStatementCondition {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): ExpressionStatement | TerminalNode;
}
export declare class Expression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): AssignmentExpression | ConditionalExpression | OrExpression | AndExpression | EqualityExpression | ComparisonExpression | BitwiseOrExpression | BitwiseXorExpression | BitwiseAndExpression | ShiftExpression | AdditiveExpression | MultiplicativeExpression | ExponentiationExpression | PostfixExpression | PrefixExpression | FunctionCallExpression | CallOptionsExpression | MemberAccessExpression | IndexAccessExpression | NewExpression | TupleExpression | TypeExpression | ArrayExpression | HexNumberExpression | DecimalNumberExpression | StringExpression | ElementaryType | TerminalNode;
}
export declare class ArgumentsDeclaration {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): PositionalArgumentsDeclaration | NamedArgumentsDeclaration;
}
export declare class NumberUnit {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class StringExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): StringLiteral | StringLiterals | HexStringLiteral | HexStringLiterals | UnicodeStringLiterals;
}
export declare class StringLiteral {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class HexStringLiteral {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class UnicodeStringLiteral {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class YulStatement {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): YulBlock | YulFunctionDefinition | YulStackAssignmentStatement | YulIfStatement | YulForStatement | YulSwitchStatement | YulLeaveStatement | YulBreakStatement | YulContinueStatement | YulLabel | YulVariableDeclarationStatement | YulVariableAssignmentStatement | YulExpression;
}
export declare class YulAssignmentOperator {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): YulColonAndEqual | TerminalNode;
}
export declare class YulStackAssignmentOperator {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): YulEqualAndColon | TerminalNode;
}
export declare class YulSwitchCase {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): YulDefaultCase | YulValueCase;
}
export declare class YulExpression {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): YulFunctionCallExpression | YulLiteral | YulBuiltInFunction | YulPath;
}
export declare class YulPathComponent {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class YulBuiltInFunction {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): TerminalNode;
}
export declare class YulLiteral {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get variant(): HexStringLiteral | StringLiteral | TerminalNode;
}
export declare class SourceUnitMembers {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly SourceUnitMember[];
}
export declare class VersionExpressionSet {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly VersionExpression[];
}
export declare class ContractMembers {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ContractMember[];
}
export declare class InterfaceMembers {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ContractMember[];
}
export declare class LibraryMembers {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ContractMember[];
}
export declare class StructMembers {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly StructMember[];
}
export declare class StateVariableAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly StateVariableAttribute[];
}
export declare class FunctionAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly FunctionAttribute[];
}
export declare class ConstructorAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ConstructorAttribute[];
}
export declare class UnnamedFunctionAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly UnnamedFunctionAttribute[];
}
export declare class FallbackFunctionAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly FallbackFunctionAttribute[];
}
export declare class ReceiveFunctionAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ReceiveFunctionAttribute[];
}
export declare class ModifierAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ModifierAttribute[];
}
export declare class FunctionTypeAttributes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly FunctionTypeAttribute[];
}
export declare class Statements {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly Statement[];
}
export declare class CatchClauses {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly CatchClause[];
}
export declare class StringLiterals {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly StringLiteral[];
}
export declare class HexStringLiterals {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly HexStringLiteral[];
}
export declare class UnicodeStringLiterals {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly UnicodeStringLiteral[];
}
export declare class YulStatements {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly YulStatement[];
}
export declare class YulSwitchCases {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly YulSwitchCase[];
}
export declare class VersionExpressionSets {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly VersionExpressionSet[];
    get separators(): readonly TerminalNode[];
}
export declare class SimpleVersionLiteral {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TerminalNode[];
    get separators(): readonly TerminalNode[];
}
export declare class ImportDeconstructionSymbols {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ImportDeconstructionSymbol[];
    get separators(): readonly TerminalNode[];
}
export declare class UsingDeconstructionSymbols {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly UsingDeconstructionSymbol[];
    get separators(): readonly TerminalNode[];
}
export declare class InheritanceTypes {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly InheritanceType[];
    get separators(): readonly TerminalNode[];
}
export declare class EnumMembers {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TerminalNode[];
    get separators(): readonly TerminalNode[];
}
export declare class Parameters {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly Parameter[];
    get separators(): readonly TerminalNode[];
}
export declare class OverridePaths {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly IdentifierPath[];
    get separators(): readonly TerminalNode[];
}
export declare class EventParameters {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly EventParameter[];
    get separators(): readonly TerminalNode[];
}
export declare class ErrorParameters {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly ErrorParameter[];
    get separators(): readonly TerminalNode[];
}
export declare class AssemblyFlags {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly StringLiteral[];
    get separators(): readonly TerminalNode[];
}
export declare class TupleDeconstructionElements {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TupleDeconstructionElement[];
    get separators(): readonly TerminalNode[];
}
export declare class PositionalArguments {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly Expression[];
    get separators(): readonly TerminalNode[];
}
export declare class NamedArguments {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly NamedArgument[];
    get separators(): readonly TerminalNode[];
}
export declare class CallOptions {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly NamedArgument[];
    get separators(): readonly TerminalNode[];
}
export declare class TupleValues {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TupleValue[];
    get separators(): readonly TerminalNode[];
}
export declare class ArrayValues {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly Expression[];
    get separators(): readonly TerminalNode[];
}
export declare class IdentifierPath {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TerminalNode[];
    get separators(): readonly TerminalNode[];
}
export declare class YulParameters {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TerminalNode[];
    get separators(): readonly TerminalNode[];
}
export declare class YulVariableNames {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly TerminalNode[];
    get separators(): readonly TerminalNode[];
}
export declare class YulArguments {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly YulExpression[];
    get separators(): readonly TerminalNode[];
}
export declare class YulPaths {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly YulPath[];
    get separators(): readonly TerminalNode[];
}
export declare class YulPath {
    readonly cst: NonterminalNode;
    private readonly fetch;
    constructor(cst: NonterminalNode);
    get items(): readonly YulPathComponent[];
    get separators(): readonly TerminalNode[];
}
