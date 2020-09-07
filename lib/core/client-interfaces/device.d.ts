import { Bluez } from "../bluez";
import { Device1 } from "./generated/Device1";
import { BaseInterface } from "./models/base-interface";
import { Property, ReadOnlyProperty } from "./models/property";
import { dict, Variant } from "../types";
import { RetryOptions, InterfaceFilterSet } from "../helper";
import { GattService } from "./gatt-service";
/**
 * @class
 * Remote device that has been discovered by a `Adapter`.
 *
 * Representation of Bluezs `Device1` interface.
 */
export declare class Device extends BaseInterface<Device1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to device under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `Device` if it exists.
     */
    static connect(bluez: Bluez, path: String): Promise<Device>;
    /**
     * Get a service that matches the given filter.
     *
     * @param filter filter by any given property of {@link GattService}, usally by UUID.
     * @param retryOptions retry this operation with a given number of times and interval in ms.
     * @param servicesResolvedTimeoutMs timeout for resolving the devices' services
     *
     * @returns A matching {@link GattService} object or undefined.
     * If multiple services match the filter, the first one is returned.
     *
     * @throws an exception if the services cannot be resolved until the given timeout.
     */
    getService(filter?: InterfaceFilterSet<GattService>, retryOptions?: RetryOptions, servicesResolvedTimeoutMs?: number): Promise<GattService | undefined>;
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