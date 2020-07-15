import { Bluez } from "../bluez";
import { GattService1 } from "./generated/GattService1";
import { BaseInterface } from "./models/base-interface";
import { ReadOnlyProperty } from "./models/property";
import { RetryOptions } from "../helper";
import { GattCharacteristic } from "./gatt-characteristic";
export declare class GattService extends BaseInterface<GattService1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<GattService>;
    getCharacteristicsRaw(): Promise<{}>;
    getCharacteristic(filter?: object, options?: RetryOptions): Promise<GattCharacteristic>;
    /**
    * Direct mappings to introspected properties, methods and signals of internal GattService1
    */
    UUID: ReadOnlyProperty<string>;
    Device: ReadOnlyProperty<string>;
    Primary: ReadOnlyProperty<boolean>;
    Includes: ReadOnlyProperty<string[]>;
}
//# sourceMappingURL=gatt-service.d.ts.map