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
export declare const mapValuesForFurtherComparison: (values: any[]) => any[];
