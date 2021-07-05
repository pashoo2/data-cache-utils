"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataCachingUtilsCachingDecoratorGlobalCachePerClass = void 0;
var data_cache_utils_caching_decorator_global_cache_per_class_const_1 = require("./data-cache-utils-caching-decorator-global-cache-per-class.const");
var debounce = function (fn, timeoutMs) {
    var latestArgs;
    var isTimeoutExists;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        latestArgs = args;
        if (!isTimeoutExists) {
            setTimeout(function () {
                try {
                    fn.apply(void 0, __spreadArray([], __read(latestArgs)));
                }
                catch (err) {
                    console.error(err);
                }
                finally {
                    isTimeoutExists = false;
                }
            }, timeoutMs);
            isTimeoutExists = true;
        }
    };
};
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
var dataCachingUtilsCachingDecoratorGlobalCachePerClass = function (cacheItemsMaxCapacity, getKeyByMethodArgument) {
    if (cacheItemsMaxCapacity === void 0) { cacheItemsMaxCapacity = data_cache_utils_caching_decorator_global_cache_per_class_const_1.DATA_CACHING_DECORATOR_DEFAULT_CACHE_CAPACITY; }
    /**
     *
     *
     * @param {object} target
     * @param {string} propertyKey
     * @param {PropertyDescriptor} descriptor
     * @returns
     */
    return function (target, propertyKey, descriptor) {
        var newDescriptor;
        // the original method, will be wrapped
        var methodOrigin = descriptor.value;
        // key - rating
        var keysRating = new Map();
        var cache = new Map();
        var minimalRatingOfValueInCache = -Infinity;
        if (typeof methodOrigin !== 'function') {
            throw new Error('dataCachingUtilsCachingDecorator failed to decorate a non function property');
        }
        function increaseKeyRatingAndReturnIt(key) {
            var keyRating = Number(keysRating.get(key) || 0) + 1;
            keysRating.set(key, keyRating);
            return keyRating;
        }
        var removeValuesWithWorstRatingFromCacheAndUpdateMinimalRating = debounce(function () {
            var e_1, _a;
            var _b;
            var countItemsToRemove = cache.size - cacheItemsMaxCapacity;
            var keysSortedByRating = [];
            var keyInCache;
            var keyRating;
            try {
                for (var _c = __values(cache.keys()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    keyInCache = _d.value;
                    keyRating = (_b = keysRating.get(keyInCache)) !== null && _b !== void 0 ? _b : 0;
                    keysSortedByRating.push({
                        key: keyInCache,
                        rating: keyRating,
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            keysSortedByRating.sort(function (keyWithRatingFirst, keyWithRatingSecond) {
                return keyWithRatingSecond.rating - keyWithRatingFirst.rating;
            });
            minimalRatingOfValueInCache =
                keysSortedByRating[keysSortedByRating.length - countItemsToRemove - 1]
                    .rating;
            var keyToRemove;
            while (countItemsToRemove) {
                keyToRemove =
                    keysSortedByRating[keysSortedByRating.length - countItemsToRemove]
                        .key;
                cache.delete(keyToRemove);
                countItemsToRemove -= 1;
            }
        }, 500);
        function cachingWrapper(parameter) {
            return __awaiter(this, void 0, void 0, function () {
                var key, valueFromCache, resultedValue, keyRatingUpdated, whetherCacheOverload, whetherKeyRatingIsGreaterThanMinimal;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = getKeyByMethodArgument
                                ? getKeyByMethodArgument(parameter)
                                : parameter;
                            if (!(key === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, methodOrigin.call(this, parameter)];
                        case 1: 
                        // if there is no key for the method parameter, then call the method origin itself
                        return [2 /*return*/, _a.sent()];
                        case 2:
                            valueFromCache = cache.get(key);
                            // check if the value of the
                            // key was cached
                            if (valueFromCache !== null && valueFromCache !== undefined) {
                                increaseKeyRatingAndReturnIt(key);
                                return [2 /*return*/, valueFromCache];
                            }
                            return [4 /*yield*/, methodOrigin.call(this, parameter)];
                        case 3:
                            resultedValue = _a.sent();
                            keyRatingUpdated = increaseKeyRatingAndReturnIt(key);
                            whetherCacheOverload = cache.size >= cacheItemsMaxCapacity;
                            whetherKeyRatingIsGreaterThanMinimal = keyRatingUpdated > minimalRatingOfValueInCache;
                            if (!whetherCacheOverload || whetherKeyRatingIsGreaterThanMinimal) {
                                cache.set(key, resultedValue);
                                if (minimalRatingOfValueInCache === -Infinity) {
                                    minimalRatingOfValueInCache = keyRatingUpdated;
                                }
                                if (whetherCacheOverload) {
                                    removeValuesWithWorstRatingFromCacheAndUpdateMinimalRating();
                                }
                            }
                            return [2 /*return*/, resultedValue];
                    }
                });
            });
        }
        if (descriptor.writable) {
            descriptor.value = cachingWrapper;
            newDescriptor = descriptor;
        }
        else {
            newDescriptor = {
                writable: false,
                enumerable: true,
                configurable: false,
                value: cachingWrapper,
            };
        }
        return newDescriptor;
    };
};
exports.dataCachingUtilsCachingDecoratorGlobalCachePerClass = dataCachingUtilsCachingDecoratorGlobalCachePerClass;
//# sourceMappingURL=data-cache-utils-caching-decorator-global-cache-per-class.js.map