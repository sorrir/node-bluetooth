export declare function sleep(ms: any): Promise<unknown>;
export declare type RetryOptions = {
    maxRetries: number;
    retryIntervalMs: number;
};
export declare type ReturnFunction<T> = (...args: any[]) => Promise<T>;
export declare type NoReturnFunction<T> = (...args: any[]) => void;
export declare function retry<T>(options: RetryOptions, fn: ReturnFunction<T>, ...args: any[]): Promise<T>;
export declare function firstResolve<T>(promises: Promise<T>[]): Promise<any>;
//# sourceMappingURL=helper.d.ts.map