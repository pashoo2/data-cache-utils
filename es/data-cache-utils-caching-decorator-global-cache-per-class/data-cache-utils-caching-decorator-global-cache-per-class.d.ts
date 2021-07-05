/**
 * !WARNING - it used the same cache for all
 * instances of a class.
 *
 * decorator for a method, will be wrapped for
 * caching values of a mostly used keys.
 * Must be used only for immutable
 * key-value stores
 * @property {number} cachedValuesCount - number
 * of a cached values
 */
export declare const dataCachingUtilsCachingDecoratorGlobalCachePerClass: <T, V, I extends object>(cacheItemsMaxCapacity?: number, getKeyByMethodArgument?: ((value: T) => unknown) | undefined) => (target: object, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
