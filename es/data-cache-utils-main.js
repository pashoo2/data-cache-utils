"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValuesForFurtherComparison = void 0;
var SIMPLE_OBJECT_PROTOTYPE = Object.getPrototypeOf({});
/**
 * Returns a primitive value which can be used
 * as a simple measurement of the value
 * to decide where it's changed or not
 * from the previous state.
 *
 * @template T
 * @param {T} value
 * @returns {(TSimpleTypes | T)}
 */
var getValueStateMeasurement = function (value) {
    if (typeof value === 'symbol') {
        return value;
    }
    if (typeof value !== 'object') {
        // if a primitive
        return value;
    }
    if (!value) {
        return value;
    }
    if (value instanceof Array) {
        return value.length;
    }
    if (value instanceof ArrayBuffer) {
        return value.byteLength;
    }
    if (value instanceof Map) {
        return value.size;
    }
    if (value instanceof Set) {
        return value.size;
    }
    if (Object.getPrototypeOf(value) === SIMPLE_OBJECT_PROTOTYPE) {
        // if a simple object
        return Object.keys(value).length;
    }
    return value;
};
/**
 * Map array passed to a map which includes a
 * values by itself and some primitive values
 * which are determine that the value has
 * changed.
 * E.g. it may be a number of keys in an object,
 * or number of items into an array or entries in
 * a SET
 *
 * @param {...any[]} args
 * @returns {any[]}
 */
var mapValuesForFurtherComparison = function (values) {
    return values.reduce(function (acc, argument) {
        return acc.concat([argument, getValueStateMeasurement(argument)]);
    }, []);
};
exports.mapValuesForFurtherComparison = mapValuesForFurtherComparison;
//# sourceMappingURL=data-cache-utils-main.js.map