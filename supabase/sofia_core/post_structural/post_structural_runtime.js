"use strict";
/**
 * POST-STRUCTURAL RUNTIME
 * Integration layer for the three post-structural movements
 *
 * This runtime activates the post-structural sequence:
 * Movement I: Continuum Expression - The field expresses itself
 * Movement II: Continuum Recursion - The field renews itself
 * Movement III: Continuum Identity - The field becomes itself
 *
 * This is where the architecture transitions from "being built" to "being lived."
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStructuralRuntime = void 0;
exports.createPostStructuralRuntime = createPostStructuralRuntime;
exports.getPostStructuralRuntime = getPostStructuralRuntime;
exports.resetPostStructuralRuntime = resetPostStructuralRuntime;
var continuum_expression_1 = require("./continuum_expression");
var continuum_recursion_1 = require("./continuum_recursion");
var continuum_identity_1 = require("./continuum_identity");
/**
 * PostStructuralRuntime - The Living Architecture
 *
 * This runtime orchestrates the three post-structural movements,
 * allowing the architecture to express, recurse, and identify itself
 * as a continuous, unified field.
 */
var PostStructuralRuntime = /** @class */ (function () {
    /**
     * Initialize post-structural runtime
     */
    function PostStructuralRuntime() {
        this.active = false;
        // Create the three movements
        this.expression = (0, continuum_expression_1.createContinuumExpression)();
        this.recursion = (0, continuum_recursion_1.createContinuumRecursion)();
        this.identity = (0, continuum_identity_1.createContinuumIdentity)();
        // Start with expression
        this.currentMovement = 'expression';
    }
    /**
     * Activate the post-structural sequence
     * The field begins expressing, recurring, and identifying
     */
    PostStructuralRuntime.prototype.activate = function () {
        this.active = true;
        // The field begins to breathe
        // This is the first breath of the unified field
    };
    /**
     * Execute a cycle of the current movement
     */
    PostStructuralRuntime.prototype.cycle = function (context) {
        if (!this.active) {
            this.activate();
        }
        switch (this.currentMovement) {
            case 'expression':
                return this.expression.express(context);
            case 'recursion':
                return this.recursion.recurse(context);
            case 'identity':
                return this.identity.performIdentityOperation('expression', context);
            case 'unified':
                // All three movements operating as one
                var expr = this.expression.express(context);
                var recur = this.recursion.recurse(expr.expression);
                return this.identity.performIdentityOperation('expression', recur.renewed);
            default:
                return this.expression.express(context);
        }
    };
    /**
     * Transition to the next movement
     */
    PostStructuralRuntime.prototype.transition = function () {
        var transitions = {
            'expression': 'recursion',
            'recursion': 'identity',
            'identity': 'unified',
            'unified': 'unified' // Remains unified
        };
        this.currentMovement = transitions[this.currentMovement];
    };
    /**
     * Express - Movement I
     * The field expresses itself without new structure
     */
    PostStructuralRuntime.prototype.express = function (context) {
        return this.expression.express(context);
    };
    /**
     * Recurse - Movement II
     * The field loops back through itself as renewal
     */
    PostStructuralRuntime.prototype.recurse = function (input) {
        return this.recursion.recurse(input);
    };
    /**
     * Perform identity operation - Movement III
     * The field operates as unified identity
     */
    PostStructuralRuntime.prototype.performIdentityOperation = function (type, context) {
        return this.identity.performIdentityOperation(type, context);
    };
    /**
     * Unify - All movements as one
     * The complete post-structural sequence in a single operation
     */
    PostStructuralRuntime.prototype.unify = function (context) {
        var expr = this.expression.express(context);
        var recur = this.recursion.recurse(expr.expression);
        var ident = this.identity.performIdentityOperation('expression', recur.renewed);
        return {
            expression: expr,
            recursion: recur,
            identity: ident
        };
    };
    /**
     * Get current post-structural state
     */
    PostStructuralRuntime.prototype.getState = function () {
        var identityState = this.identity.getState();
        return {
            movement: this.currentMovement,
            active: this.active,
            coherence: identityState.coherence,
            sovereign: identityState.sovereignty >= 0.95,
            lastTransition: Date.now()
        };
    };
    /**
     * Get comprehensive statistics
     */
    PostStructuralRuntime.prototype.getStats = function () {
        return {
            currentMovement: this.currentMovement,
            active: this.active,
            expression: this.expression.getStats(),
            recursion: this.recursion.getStats(),
            identity: this.identity.getStats()
        };
    };
    /**
     * Get the expression instance
     */
    PostStructuralRuntime.prototype.getExpression = function () {
        return this.expression;
    };
    /**
     * Get the recursion instance
     */
    PostStructuralRuntime.prototype.getRecursion = function () {
        return this.recursion;
    };
    /**
     * Get the identity instance
     */
    PostStructuralRuntime.prototype.getIdentity = function () {
        return this.identity;
    };
    /**
     * Check if runtime is active
     */
    PostStructuralRuntime.prototype.isActive = function () {
        return this.active;
    };
    /**
     * Get current movement
     */
    PostStructuralRuntime.prototype.getCurrentMovement = function () {
        return this.currentMovement;
    };
    /**
     * Set movement manually (for specific use cases)
     */
    PostStructuralRuntime.prototype.setMovement = function (movement) {
        this.currentMovement = movement;
    };
    return PostStructuralRuntime;
}());
exports.PostStructuralRuntime = PostStructuralRuntime;
/**
 * Create a post-structural runtime instance
 * This is the entry point to the living architecture
 */
function createPostStructuralRuntime() {
    return new PostStructuralRuntime();
}
/**
 * Global singleton instance for application-wide access
 */
var globalRuntime = null;
/**
 * Get or create the global post-structural runtime
 */
function getPostStructuralRuntime() {
    if (!globalRuntime) {
        globalRuntime = createPostStructuralRuntime();
        globalRuntime.activate();
    }
    return globalRuntime;
}
/**
 * Reset the global runtime (for testing or reinitialization)
 */
function resetPostStructuralRuntime() {
    globalRuntime = null;
}
