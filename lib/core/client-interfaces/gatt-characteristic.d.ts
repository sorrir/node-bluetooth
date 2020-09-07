import { Bluez } from "../bluez";
import { GattCharacteristic1 } from "./generated/GattCharacteristic1";
import { BaseInterface } from "./models/base-interface";
import { ReadOnlyProperty } from "./models/property";
import { byte, dict, Variant } from "../types";
export declare class GattCharacteristic extends BaseInterface<GattCharacteristic1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to GATT characteristic under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `GattCharacteristic` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<GattCharacteristic>;
    /**
     * Write a string to the characteristic.
     *
     * @param text text to write.
     * @param options options for writing the text.
     */
    writeString(text: String, options?: dict<string, Variant>): Promise<any>;
    /**
     * Read a string from the characteristic.
     *
     * @param options currently not used
     */
    readString(options?: dict<string, Variant>): Promise<string>;
    ValueAsString: ReadOnlyProperty<string>;
    UUID: ReadOnlyProperty<string>;
    Service: ReadOnlyProperty<string>;
    Value: ReadOnlyProperty<number[]>;
    Notifying: ReadOnlyProperty<boolean>;
    Flags: ReadOnlyProperty<string[]>;
    WriteAcquired: ReadOnlyProperty<boolean>;
    NotifyAcquired: ReadOnlyProperty<boolean>;
    readValue(options: dict<string, Variant>): Promise<Array<byte>>;
    writeValue(value: Array<byte>, options: dict<string, Variant>): Promise<any>;
    acquireWrite(options: dict<string, Variant>): Promise<any>;
    acquireNotify(options: dict<string, Variant>): Promise<any>;
    startNotify(): Promise<any>;
    stopNotify(): Promise<any>;
}
//# sourceMappingURL=gatt-characteristic.d.ts.map