/**
* Created by Michael on 6/7/14.
* Helper functions that help identify and walk the AST.
* This avoids lots of duplication: in case the AST changes,
* at least these will be easily changed.
*/
var ast;
(function (ast) {
    function isModuleMember(node) {
        return node.type === "ModuleMember";
    }
    ast.isModuleMember = isModuleMember;

    function isInterface(node) {
        return node.type === "InterfaceDeclaration";
    }
    ast.isInterface = isInterface;

    function isModule(node) {
        return node.type === "ModuleDeclaration";
    }
    ast.isModule = isModule;

    function isModuleExportStatement(node) {
        return node.type === "ModuleExportStatement";
    }
    ast.isModuleExportStatement = isModuleExportStatement;

    function isClass(node) {
        return node.type === "ClassDeclaration";
    }
    ast.isClass = isClass;

    function isVariable(node) {
        return node.type === "VariableDeclaration";
    }
    ast.isVariable = isVariable;

    function isFunctionDeclaration(node) {
        return node.type === "FunctionDeclaration";
    }
    ast.isFunctionDeclaration = isFunctionDeclaration;

    function isFunctionExpression(node) {
        return node.type === "FunctionExpression";
    }
    ast.isFunctionExpression = isFunctionExpression;

    function isFunction(node) {
        return isFunctionDeclaration(node) || isFunctionExpression(node);
    }
    ast.isFunction = isFunction;

    function isAmbient(node) {
        return typeof node.ambient !== 'undefined' && node.ambient;
    }
    ast.isAmbient = isAmbient;

    function isAmbientVariable(node) {
        return node.type === "AmbientVariableDeclaration";
    }
    ast.isAmbientVariable = isAmbientVariable;

    function isAmbientFunction(node) {
        return node.type === "AmbientFunctionDeclaration";
    }
    ast.isAmbientFunction = isAmbientFunction;

    function isTypeDeclaration(node) {
        return node.type === "TypeDeclaration";
    }
    ast.isTypeDeclaration = isTypeDeclaration;

    function isFunctionTypeDeclaration(node) {
        return node.type === "FunctionTypeDeclaration";
    }
    ast.isFunctionTypeDeclaration = isFunctionTypeDeclaration;

    function isObjectTypeDeclaration(node) {
        return node.type === "ObjectTypeDeclaration";
    }
    ast.isObjectTypeDeclaration = isObjectTypeDeclaration;
})(ast || (ast = {}));

module.exports = ast;
//# sourceMappingURL=ast.js.map
