import { Bluez } from "../bluez";
import { Device1 } from "./generated/Device1";
import { BaseInterface } from "./models/base-interface";
import { Property, ReadOnlyProperty } from "./models/property";
import { dict, Variant } from "../types";
import { RetryOptions } from "../helper";
import { GattService } from "./gatt-service";
export declare class Device extends BaseInterface<Device1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path: String): Promise<Device>;
    getService(filter?: object, options?: RetryOptions): Promise<GattService>;
    /**
    * Direct mappings to introspected properties, methods and signals of internal Device1
    */
    Address: ReadOnlyProperty<string>;
    AddressType: ReadOnlyProperty<string>;
    Name: ReadOnlyProperty<string>;
    Alias: Property<string>;
    Class: ReadOnlyProperty<number>;
    Appearance: ReadOnlyProperty<number>;
    Icon: ReadOnlyProperty<string>;
    Paired: ReadOnlyProperty<boolean>;
    Trusted: Property<boolean>;
    Blocked: Property<boolean>;
    LegacyPairing: ReadOnlyProperty<boolean>;
    RSSI: ReadOnlyProperty<number>;
    Connected: ReadOnlyProperty<boolean>;
    UUIDs: ReadOnlyProperty<string[]>;
    Modalias: ReadOnlyProperty<string>;
    Adapter: ReadOnlyProperty<string>;
    ManufacturerData: ReadOnlyProperty<dict<number, Variant>>;
    ServiceData: ReadOnlyProperty<dict<string, Variant>>;
    TxPower: ReadOnlyProperty<number>;
    ServicesResolved: ReadOnlyProperty<boolean>;
    disconnect(): Promise<any>;
    connect(): Promise<any>;
    connectProfile(UUID: string): Promise<any>;
    disconnectProfile(UUID: string): Promise<any>;
    pair(): Promise<any>;
    cancelPairing(): Promise<any>;
}
//# sourceMappingURL=device.d.ts.map