import { Bluez } from "../bluez";
import { LEAdvertisingManager1 } from "./generated/LEAdvertisingManager1";
import { BaseInterface } from "./models/base-interface";
import { ReadOnlyProperty } from "./models/property";
import { path, dict, Variant, dBusType } from "../types";
export declare class LEAdvertisingManager extends BaseInterface<LEAdvertisingManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<LEAdvertisingManager>;
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
    ActiveInstances: ReadOnlyProperty<number>;
    SupportedInstances: ReadOnlyProperty<number>;
    SupportedIncludes: ReadOnlyProperty<string[]>;
    SupportedSecondaryChannels: ReadOnlyProperty<string[]>;
    registerAdvertisement(advertisement: path, options: dict<string, Variant>): Promise<any>;
    unregisterAdvertisement(service: path): Promise<any>;
}
//# sourceMappingURL=le-advertising-manager.d.ts.map