import { Bluez } from "../bluez";
import { Adapter1 } from "./generated/Adapter1";
import { BaseInterface } from "./models/base-interface";
import { Property, ReadOnlyProperty } from "./models/property";
import { path, dict, Variant } from "../types";
import { RetryOptions } from "../helper";
import { Device } from "./device";
export declare class Adapter extends BaseInterface<Adapter1> {
    /**
    * Hide constructor, initialization shall be done asynchronously with connect
    */
    private constructor();
    static connect(bluez: Bluez, path?: String): Promise<Adapter>;
    /**
     * Get information about all discovered devices
     *
     * @return An object of the format {'device_path' : data}
     */
    getDevicesRaw(): Promise<{}>;
    /**
     * Returns a device with the given address
     *
     * @param address Bluetooth device address
     * @return {@Link Device} if it exists
     */
    getDeviceByAddress(address: string, options?: RetryOptions): Promise<Device>;
    /**
     * Returns a device with the given name
     *
     * @param address Bluetooth device name
     * @return {@Link Device} if it exists
     */
    getDeviceByName(name: string, options?: RetryOptions): Promise<Device>;
    /**
     * Returns a device with the given alias
     *
     * @param address Bluetooth device alias
     * @return {@Link Device} if it exists
     */
    getDeviceByAlias(alias: string, options?: RetryOptions): Promise<Device>;
    /**
     * Finds a specific device that matches the given filter.
     *
     * @param filter Filter, for example ```{'Name' : 'device_name'}```
     * @return {@Link Device} if it exists. If multiple devices match the filter,
     * the first one is returned
     */
    getDevice(filter?: object, options?: RetryOptions): Promise<Device>;
    clearDevices(): Promise<void>;
    removeDeviceByPath(path: string): Promise<any>;
    /**
    * Direct mappings to introspected properties, methods and signals of internal Adapter1
    */
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