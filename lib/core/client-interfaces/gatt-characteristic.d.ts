import { Bluez } from "../bluez";
import { GattCharacteristic1 } from "./generated/GattCharacteristic1";
import { BaseInterface } from "./models/base-interface";
import { ReadOnlyProperty } from "./models/property";
import { byte, dict, Variant } from "../types";
export declare class GattCharacteristic extends BaseInterface<GattCharacteristic1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<GattCharacteristic>;
    writeString(text: String, options?: dict<string, Variant>): Promise<any>;
    readString(options?: dict<string, Variant>): Promise<string>;
    ValueAsString: ReadOnlyProperty<string>;
    /**
    * Direct mappings to introspected properties, methods and signals of internal GattCharacteristic1
    */
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