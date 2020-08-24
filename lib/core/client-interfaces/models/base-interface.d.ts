/// <reference types="node" />
import { Bluez } from "../../bluez";
import { EventEmitter } from "events";
import { RetryOptions } from "../../helper";
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
     * Finds a specific child that matches the given filter.
     *
     * @param filter Filter, for example ```{'Name' : 'child_name'}```
     * @return a child object if it exists. If multiple childs match the filter,
     * the first one is returned
     */
    getChildObject<T extends BaseInterface<any>>(interfaceName: string, constructor: _InterfaceConstructor<T>, filter?: object, options?: RetryOptions): Promise<T | undefined>;
}
export {};
//# sourceMappingURL=base-interface.d.ts.map