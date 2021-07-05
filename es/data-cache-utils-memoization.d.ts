import { FirstParameter } from './types';
export declare const memoize: <F extends (arg: any) => any, A extends FirstParameter<F>, R extends ReturnType<F>>(functionToMemoize: F) => (arg: A) => R;
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
export declare const memoizeLastReturnedValue: <F extends (...arg: any[]) => any>(func: F) => (...args: Parameters<F>) => ReturnType<F>;
