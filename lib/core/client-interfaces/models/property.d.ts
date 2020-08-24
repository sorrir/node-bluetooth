import { GenericDBusEventEmitter } from "./dbus-event-emitter";
import { dBusType, dict, Variant } from "../../types";
export declare type ValueTransformer<I extends dBusType, O extends dBusType> = {
    readonly in: (value: O) => I;
    readonly out: (value: I) => O;
};
export declare type ReadOnlyValueTransformer<I extends dBusType, O extends dBusType> = {
    readonly in: (value: O) => I;
};
export declare class ReadOnlyProperty<T extends dBusType> extends GenericDBusEventEmitter<{
    interfaceName: string;
    changedProperties: dict<string, Variant>;
    invalidatedProperties: Array<string>;
}, T> {
    readonly name: string;
    protected readonly _internal: any;
    protected readonly _valueTransformer: ValueTransformer<T, any>;
    constructor(name: string, internal: any, valueTransformer?: ReadOnlyValueTransformer<T, any>);
    get(): Promise<T>;
    waitForChange(): Promise<T>;
    /**
     * Wait for a specific value of the property.
     *
     * @param newValue  the value to be reached
     * @param timeoutMs timeout in milliseconds
     *
     * @throws an exception if the new value is not reached until the given timeout.
     */
    waitForValue(newValue: T, timeoutMs?: number): Promise<void>;
}
export declare class Property<T extends dBusType> extends ReadOnlyProperty<T> {
    constructor(name: string, internal: any, valueTransformer?: ValueTransformer<T, any>);
    set(value: T): Promise<any>;
}
export declare type ReadWriteProperty<T extends dBusType> = Property<T> | ReadOnlyProperty<T>;
//# sourceMappingURL=property.d.ts.map