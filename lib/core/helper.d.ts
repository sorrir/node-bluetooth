import { BaseInterface } from "./client-interfaces/models/base-interface";
import { dBusType } from "./types";
export declare type SubType<Base, Condition> = Pick<Base, {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
}[keyof Base]>;
export declare type NoFunctions<Obj> = Omit<Obj, keyof SubType<Obj, (_: any) => any | Promise<any>>>;
export declare type NoPrimitives<Obj> = Omit<Obj, keyof SubType<Obj, number | string | symbol | boolean>>;
export declare type NoPrimitivesAndFunctions<Obj> = NoPrimitives<NoFunctions<Obj>>;
export declare type InterfaceFilterSet<T extends BaseInterface<any>> = Partial<Record<keyof Omit<NoPrimitivesAndFunctions<T>, 'getChildObject' | 'Properties'>, dBusType>>;
export declare type RetryOptions = {
    maxRetries: number;
    retryIntervalMs: number;
};
export declare type ReturnFunction<T> = (...args: any[]) => Promise<T>;
export declare type NoReturnFunction<T> = (...args: any[]) => void;
export declare function sleep(ms: number): Promise<unknown>;
export declare function retry<T>(options: RetryOptions, fn: ReturnFunction<T>, ...args: any[]): Promise<T>;
export declare function firstResolve<T>(promises: Promise<T>[]): Promise<any>;
//# sourceMappingURL=helper.d.ts.map