/**
 * Created by Michael on 6/7/14.
 * Helper functions that help identify and walk the AST.
 * This avoids lots of duplication: in case the AST changes,
 * at least these will be easily changed.
 */
module ast {

    export function isModuleMember(node) {
        return node.type === "ModuleMember";
    }

    export function isInterface(node) {
        return node.type === "InterfaceDeclaration";
    }

    export function isModule(node) {
        return node.type === "ModuleDeclaration";
    }

    export function isModuleExportStatement(node) {
        return node.type === "ModuleExportStatement";
    }

    export function isClass(node) {
        return node.type === "ClassDeclaration";
    }

    export function isVariable(node) {
        return node.type === "VariableDeclaration";
    }

    export function isFunctionDeclaration(node) {
        return node.type === "FunctionDeclaration";
    }

    export function isFunctionExpression(node) {
        return node.type === "FunctionExpression";
    }

    export function isFunction(node) {
        return isFunctionDeclaration(node) || isFunctionExpression(node);
    }

    export function isAmbient(node) {
        return typeof node.ambient !== 'undefined' && node.ambient;
    }

    export function isAmbientVariable(node) {
        return node.type === "AmbientVariableDeclaration";
    }

    export function isAmbientFunction(node) {
        return node.type === "AmbientFunctionDeclaration";
    }

    export function isTypeDeclaration(node) {
        return node.type === "TypeDeclaration";
    }

    export function isFunctionTypeDeclaration(node) {
        return node.type === "FunctionTypeDeclaration";
    }

    export function isObjectTypeDeclaration(node) {
        return node.type === "ObjectTypeDeclaration";
    }
}

export = ast;