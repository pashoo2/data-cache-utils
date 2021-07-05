export declare type TSimpleTypes = number | Number | string | String | boolean | null | undefined;
export declare type FirstParameter<F extends (arg: any) => any> = Parameters<F> extends Array<infer FirstArg> ? FirstArg : never;
