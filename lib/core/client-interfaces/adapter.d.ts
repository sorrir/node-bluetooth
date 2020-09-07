import { Bluez } from "../bluez";
import { Adapter1 } from "./generated/Adapter1";
import { BaseInterface } from "./models/base-interface";
import { Property, ReadOnlyProperty } from "./models/property";
import { path, dict, Variant } from "../types";
import { RetryOptions, InterfaceFilterSet } from "../helper";
import { Device } from "./device";
import { LEAdvertisingManager } from "./le-advertising-manager";
import { GattManager } from "./gatt-manager";
import { Media } from "./media";
import { NetworkServer } from "./network-server";
/**
 * @class
 * Bluetooth adapter that manages devices.
 *
 * Representation of Bluezs `Adapter1` interface.
 */
export declare class Adapter extends BaseInterface<Adapter1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect.
    */
    private constructor();
    /**
     * Connect to adapter under the specified path.
     *
     * @param bluez `Bluez` instance.
     * @param path path of the object.
     * @return `Adapter` if it exists.
     */
    static connect(bluez: Bluez, path?: String): Promise<Adapter>;
    /**
     * Connect to the default adapter.
     *
     * @param bluez `Bluez` instance.
     */
    static connectDefault(bluez: Bluez): Promise<Adapter>;
    /**
     * Get information about all discovered devices.
     *
     * @return An object of the format {'device_path' : data}.
     */
    getDevicesRaw(): Promise<{
        [K in path]: any;
    }>;
    /**
     * Returns a device with the given address.
     *
     * @param address Bluetooth device address.
     * @return `Device` if it exists.
     */
    getDeviceByAddress(address: string, options?: RetryOptions): Promise<Device>;
    /**
     * Returns a device with the given name.
     *
     * @param address Bluetooth device name.
     * @return `Device` if it exists.
     */
    getDeviceByName(name: string, options?: RetryOptions): Promise<Device>;
    /**
     * Returns a device with the given alias.
     *
     * @param address Bluetooth device alias.
     * @return `Device` if it exists.
     */
    getDeviceByAlias(alias: string, options?: RetryOptions): Promise<Device>;
    /**
    * Get a device that matches the given filter.
    *
    * @param filter filter by any given property of `Device`, usally by UUID.
    * @param retryOptions retry this operation with a given number of times and interval in ms.
    *
    * @returns `Device` object or undefined.
    * If multiple services match the filter, the first one is returned.
    */
    getDevice(filter?: InterfaceFilterSet<Device>, options?: RetryOptions): Promise<Device | undefined>;
    /**
     * Deletes all devices managed by the adapter.
     */
    clearDevices(): Promise<void>;
    /**
     * Deletes a specific device registred under the given path.
     *
     * @param path the path of the `Device`.
     */
    removeDeviceByPath(path: string): Promise<any>;
    /**
     * Get the adapters `LEAdvertisingManager`.
     */
    getAdvertisingManager(): Promise<LEAdvertisingManager>;
    /**
     * Get the adapters `GattManager`.
     */
    getGattManager(): Promise<GattManager>;
    /**
     * Get the adapters `Media`.
     */
    getMedia(): Promise<Media>;
    /**
     * Get the adapters `NetworkServer`.
     */
    getNetworkServer(): Promise<NetworkServer>;
    Address: ReadOnlyProperty<string>;
    AddressType: ReadOnlyProperty<string>;
    Name: ReadOnlyProperty<string>;
    Alias: Property<string>;
    Class: ReadOnlyProperty<number>;
    Powered: Property<boolean>;
    Discoverable: Property<boolean>;
    DiscoverableTimeout: Property<number>;
    Pairable: Property<boolean>;
    PairableTimeout: Property<number>;
    Discovering: ReadOnlyProperty<boolean>;
    UUIDs: ReadOnlyProperty<string[]>;
    Modalias: ReadOnlyProperty<string>;
    startDiscovery(): Promise<any>;
    setDiscoveryFilter(properties: dict<string, Variant>): Promise<any>;
    stopDiscovery(): Promise<any>;
    removeDevice(device: path): Promise<any>;
    getDiscoveryFilters(): Promise<Array<string>>;
}
//# sourceMappingURL=adapter.d.ts.map