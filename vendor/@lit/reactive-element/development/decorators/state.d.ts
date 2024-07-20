/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
export interface StateDeclaration<Type = unknown> {
    /**
     * A function that indicates if a property should be considered changed when
     * it is set. The function should take the `newValue` and `oldValue` and
     * return `true` if an update should be requested.
     */
    hasChanged?(value: Type, oldValue: Type): boolean;
}
/**
 * @deprecated use StateDeclaration
 */
export type InternalPropertyDeclaration<Type = unknown> = StateDeclaration<Type>;
/**
 * Declares a private or protected reactive property that still triggers
 * updates to the element when it changes. It does not reflect from the
 * corresponding attribute.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */
export declare function state(options?: StateDeclaration): import("./property.js").PropertyDecorator;
//# sourceMappingURL=state.d.ts.map