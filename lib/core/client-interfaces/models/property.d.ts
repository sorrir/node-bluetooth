import { GenericDBusEventEmitter } from "./dbus-event-emitter";
import { dBusType, dict, Variant } from "../../types";
/**
 * Transform the value from its outside representation to its inner equivalent
 * in both directions.
 * 'Inner' in this context refers to the data type of the underlying D-Bus property.
 * 'Outer' is the data type the user can see and interact with.
 */
export declare type ValueTransformer<I extends dBusType, O extends dBusType> = {
    readonly in: (value: O) => I;
    readonly out: (value: I) => O;
};
/**
 * Transform the value from its inner representation to its outer equivalent.
 * 'Inner' in this context refers to the data type of the underlying D-Bus property.
 * 'Outer' is the data type the user can see and interact with.
 */
export declare type ReadOnlyValueTransformer<I extends dBusType, O extends dBusType> = {
    readonly in: (value: O) => I;
};
/**
 * @class
 * Property that can only be read.
 * Wraps around the 'PropertiesChanged' event of the '_internal' {@link EventEmitter} of a client interface.
 */
export declare class ReadOnlyProperty<T extends dBusType> extends GenericDBusEventEmitter<{
    interfaceName: string;
    changedProperties: dict<string, Variant>;
    invalidatedProperties: Array<string>;
}, T> {
    readonly name: string;
    protected readonly _internal: any;
    protected readonly _valueTransformer: ValueTransformer<T, any>;
    constructor(name: string, internal: any, valueTransformer?: ReadOnlyValueTransformer<T, any>);
    /**
     * Get the value of the property.
     *
     * @returns the value of the property.
     */
    get(): Promise<T>;
    /**
     * Wait until a change of the property happens.
     *
     * @returns the value of the property after the change.
     */
    waitForChange(): Promise<T>;
    /**
     * Wait for a specific value of the property.
     *
     * @param newValue  the value to be reached.
     * @param timeoutMs timeout in milliseconds. Defaults to 30 seconds.
     *
     * @throws an exception if the new value is not reached until the given timeout
     */
    waitForValue(newValue: T, timeoutMs?: number): Promise<void>;
}
/**
 * @class
 * Property that can be set as well as read.
 */
export declare class Property<T extends dBusType> extends ReadOnlyProperty<T> {
    constructor(name: string, internal: any, valueTransformer?: ValueTransformer<T, any>);
    /**
     * Set the value of the property.
     *
     * @param value the new value.
     */
    set(value: T): Promise<void>;
}
export declare type ReadWriteProperty<T extends dBusType> = Property<T> | ReadOnlyProperty<T>;
//# sourceMappingURL=property.d.ts.map