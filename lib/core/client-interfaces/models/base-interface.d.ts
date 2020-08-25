/// <reference types="node" />
import { Bluez } from "../../bluez";
import { EventEmitter } from "events";
import { RetryOptions } from "../../helper";
import { dBusType } from "../../types";
declare type _InterfaceConstructor<T extends BaseInterface<any>> = (bluez: Bluez, path: string) => Promise<T>;
export declare class BaseInterface<T extends EventEmitter> {
    protected readonly _bluez: Bluez;
    protected readonly _internal: T;
    readonly path: string;
    constructor(bluez: Bluez, internal: T);
    /**
     * @return the internal {@Link EventEmitter}
     */
    eventEmitter(): EventEmitter;
    getChildObjectsRaw(interfaceName: string): Promise<{}>;
    /**
     * Finds a specific child object that matches the given filter.
     *
     * @param interfaceName name of the child objects interface.
     * @param constructor constructor of the child object
     * @param filter properties of that child
     * @param retryOptions retry this operation with a given number of times and interval in ms.
     * Does not repeat by default.
     *
     * @returns a matching child object if one exists. If multiple childs match the filter,
     * the first one is returned.
     */
    getChildObject<T extends BaseInterface<any>>(interfaceName: string, constructor: _InterfaceConstructor<T>, filter?: {
        [K in string]: dBusType;
    }, retryOptions?: RetryOptions): Promise<T | undefined>;
}
export {};
//# sourceMappingURL=base-interface.d.ts.map