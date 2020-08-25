import { Bluez } from "../bluez";
import { GattDescriptor1 } from "./generated/GattDescriptor1";
import { BaseInterface } from "./models/base-interface";
import { ReadOnlyProperty } from "./models/property";
import { byte, dict, Variant, dBusType } from "../types";
export declare class GattDescriptor extends BaseInterface<GattDescriptor1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<GattDescriptor>;
    /**
     * Get all properties.
     *
     * @returns properties with their respective names and values.
     */
    getAllProperties(): Promise<{
        [K in string]: dBusType;
    }>;
    /**
     * Get all properties as `Variant`s.
     *
     * @returns properties with their respective names, values and signature.
     */
    getAllPropertiesAsVariants(): Promise<{
        [K in string]: Variant;
    }>;
    UUID: ReadOnlyProperty<string>;
    Characteristic: ReadOnlyProperty<string>;
    Value: ReadOnlyProperty<number[]>;
    readValue(options: dict<string, Variant>): Promise<Array<byte>>;
    writeValue(value: Array<byte>, options: dict<string, Variant>): Promise<any>;
}
//# sourceMappingURL=gatt-descriptor.d.ts.map