import { Bluez } from "../bluez";
import { LEAdvertisingManager1 } from "./generated/LEAdvertisingManager1";
import { BaseInterface } from "./models/base-interface";
import { ReadOnlyProperty } from "./models/property";
import { path, dict, Variant } from "../types";
export declare class LEAdvertisingManager extends BaseInterface<LEAdvertisingManager1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to LE advertising manager under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `LEAdvertisingManager1` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<LEAdvertisingManager>;
    ActiveInstances: ReadOnlyProperty<number>;
    SupportedInstances: ReadOnlyProperty<number>;
    SupportedIncludes: ReadOnlyProperty<string[]>;
    SupportedSecondaryChannels: ReadOnlyProperty<string[]>;
    registerAdvertisement(advertisement: path, options: dict<string, Variant>): Promise<any>;
    unregisterAdvertisement(service: path): Promise<any>;
}
//# sourceMappingURL=le-advertising-manager.d.ts.map