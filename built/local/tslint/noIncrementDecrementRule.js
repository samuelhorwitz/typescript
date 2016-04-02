"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new IncrementDecrementWalker(sourceFile, this.getOptions()));
    };
    Rule.POSTFIX_FAILURE_STRING = "Don't use '++' or '--' postfix operators outside statements or for loops.";
    Rule.PREFIX_FAILURE_STRING = "Don't use '++' or '--' prefix operators.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var IncrementDecrementWalker = (function (_super) {
    __extends(IncrementDecrementWalker, _super);
    function IncrementDecrementWalker() {
        _super.apply(this, arguments);
    }
    IncrementDecrementWalker.prototype.visitPostfixUnaryExpression = function (node) {
        _super.prototype.visitPostfixUnaryExpression.call(this, node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator == ts.SyntaxKind.MinusMinusToken) {
            this.visitIncrementDecrement(node);
        }
    };
    IncrementDecrementWalker.prototype.visitPrefixUnaryExpression = function (node) {
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator == ts.SyntaxKind.MinusMinusToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.PREFIX_FAILURE_STRING));
        }
    };
    IncrementDecrementWalker.prototype.visitIncrementDecrement = function (node) {
        if (node.parent && (node.parent.kind === ts.SyntaxKind.ExpressionStatement ||
            node.parent.kind === ts.SyntaxKind.ForStatement)) {
            return;
        }
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.POSTFIX_FAILURE_STRING));
    };
    return IncrementDecrementWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=file:////Users/samuel/Development/TypeScript/built/local/tslint/noIncrementDecrementRule.js.map