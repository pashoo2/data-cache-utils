"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoizeLastReturnedValue = exports.memoize = void 0;
var utils_1 = require("@pashoo2/utils");
var data_cache_utils_main_1 = require("./data-cache-utils-main");
var memoize = function (functionToMemoize) {
    var cachedResults = new Map();
    var memoized = function (a) {
        var cachedResult = cachedResults.get(a);
        if (cachedResult) {
            return cachedResult;
        }
        var result = functionToMemoize(a);
        cachedResults.set(a, result);
        return result;
    };
    memoized.clean = function () { return cachedResults.clear(); };
    return memoized;
};
exports.memoize = memoize;
/**
 * Returns a function which will return the same result
 * as the last one if the arguments are equals to the
 * arguments for the last result memoized.
 *
 * @template R
 * @template A
 * @template F
 * @param {F} func
 * @returns {(...arg: A) => R} - returns a function which only the last result will be memoized
 */
var memoizeLastReturnedValue = function (func) {
    var lastArgs;
    var lastReturnValue;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argsMappedForComparison = data_cache_utils_main_1.mapValuesForFurtherComparison(args);
        if (!lastArgs ||
            !utils_1.commonUtilsAreAllArraysEqualOrNotDefined(lastArgs, argsMappedForComparison)) {
            lastArgs = argsMappedForComparison;
            lastReturnValue = func.apply(void 0, __spreadArray([], __read(args)));
        }
        return lastReturnValue;
    };
};
exports.memoizeLastReturnedValue = memoizeLastReturnedValue;
//# sourceMappingURL=data-cache-utils-memoization.js.map