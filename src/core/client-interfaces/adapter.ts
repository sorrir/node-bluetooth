import { Bluez } from "../bluez";
import { Adapter1 } from "./generated/Adapter1";
import { BaseInterface } from "./models/base-interface";
import { Signal } from "./models/signal";
import { Property, ReadOnlyProperty } from "./models/property";
import {
  int16,
  uint16,
  int32,
  uint32,
  byte,
  path,
  fileDescriptor,
  dict,
  Variant,
  dBusType,
} from "../types";
import { RetryOptions, InterfaceFilterSet } from "../helper";
import { Device } from "./device";
import { LEAdvertisingManager } from "./le-advertising-manager";
import { GattManager } from "./gatt-manager";
import { Media } from "./media";
import { NetworkServer } from "./network-server";
import { Exception } from "handlebars";

/**
 * @class
 * Bluetooth adapter that manages devices.
 *
 * Representation of Bluezs `Adapter1` interface.
 */

export class Adapter extends BaseInterface<Adapter1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: Adapter1) {
    super(bluez, internal);
  }

  /**
   * Connect to adapter under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `Adapter` if it exists.
   */
  static async connect(bluez: Bluez, path = "/org/bluez/hci0") {
    return new Adapter(bluez, await Adapter1.Connect(bluez.bus, path));
  }

  /**
   * Connect to the default adapter.
   *
   * @param bluez `Bluez` instance.
   */
  static async connectDefault(bluez: Bluez) {
    const adapterPaths = Object.keys(
      await bluez.getObjectData("Adapter1", "/org/bluez")
    );
    if (adapterPaths.length === 0) {
      throw new Exception(
        "Could not connect to default adapter: No adapter found"
      );
    }
    return Adapter.connect(bluez, adapterPaths[0]);
  }

  /**
   * Get information about all discovered devices.
   *
   * @return An object of the format {'device_path' : data}.
   */

  async getDevicesRaw(): Promise<{ [K in path]: any }> {
    return this._bluez.getObjectData("Device1", this.path);
  }

  /**
   * Returns a device with the given address.
   *
   * @param address Bluetooth device address.
   * @return `Device` if it exists.
   */

  async getDeviceByAddress(
    address: string,
    options?: RetryOptions
  ): Promise<Device> {
    return this.getDevice({ Address: address }, options);
  }

  /**
   * Returns a device with the given name.
   *
   * @param address Bluetooth device name.
   * @return `Device` if it exists.
   */

  async getDeviceByName(name: string, options?: RetryOptions): Promise<Device> {
    return this.getDevice({ Name: name }, options);
  }

  /**
   * Returns a device with the given alias.
   *
   * @param address Bluetooth device alias.
   * @return `Device` if it exists.
   */

  async getDeviceByAlias(
    alias: string,
    options?: RetryOptions
  ): Promise<Device> {
    return this.getDevice({ Alias: alias }, options);
  }

  /**
   * Get a device that matches the given filter.
   *
   * @param filter filter by any given property of `Device`, usally by UUID.
   * @param retryOptions retry this operation with a given number of times and interval in ms.
   *
   * @returns `Device` object or undefined.
   * If multiple services match the filter, the first one is returned.
   */

  async getDevice(
    filter: InterfaceFilterSet<Device> = {},
    options?: RetryOptions
  ): Promise<Device | undefined> {
    return this.getChildObject("Device1", Device.connect, filter, options);
  }

  /**
   * Deletes all devices managed by the adapter.
   */

  async clearDevices() {
    const paths = await this.getDevicesRaw().then((data) => Object.keys(data));
    paths.forEach(async (path) => await this.removeDeviceByPath(path));
  }

  /**
   * Deletes a specific device registred under the given path.
   *
   * @param path the path of the `Device`.
   */

  async removeDeviceByPath(path: string) {
    return this._internal.RemoveDevice(path);
  }

  /**
   * Get the adapters `LEAdvertisingManager`.
   */

  async getAdvertisingManager() {
    return LEAdvertisingManager.connect(this._bluez, this.path);
  }

  /**
   * Get the adapters `GattManager`.
   */

  async getGattManager() {
    return GattManager.connect(this._bluez, this.path);
  }

  /**
   * Get the adapters `Media`.
   */

  async getMedia() {
    return Media.connect(this._bluez, this.path);
  }

  /**
   * Get the adapters `NetworkServer`.
   */

  async getNetworkServer() {
    return NetworkServer.connect(this._bluez, this.path);
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal Adapter1
   */

  //@property({ name: 'Address', signature: 's', access: ACCESS_READ })
  Address = new ReadOnlyProperty<string>("Address", this._internal);

  //@property({ name: 'AddressType', signature: 's', access: ACCESS_READ })
  AddressType = new ReadOnlyProperty<string>("AddressType", this._internal);

  //@property({ name: 'Name', signature: 's', access: ACCESS_READ })
  Name = new ReadOnlyProperty<string>("Name", this._internal);

  //@property({ name: 'Alias', signature: 's', access: ACCESS_READWRITE })
  Alias = new Property<string>("Alias", this._internal);

  //@property({ name: 'Class', signature: 'u', access: ACCESS_READ })
  Class = new ReadOnlyProperty<uint32>("Class", this._internal);

  //@property({ name: 'Powered', signature: 'b', access: ACCESS_READWRITE })
  Powered = new Property<boolean>("Powered", this._internal);

  //@property({ name: 'Discoverable', signature: 'b', access: ACCESS_READWRITE })
  Discoverable = new Property<boolean>("Discoverable", this._internal);

  //@property({ name: 'DiscoverableTimeout', signature: 'u', access: ACCESS_READWRITE })
  DiscoverableTimeout = new Property<uint32>(
    "DiscoverableTimeout",
    this._internal
  );

  //@property({ name: 'Pairable', signature: 'b', access: ACCESS_READWRITE })
  Pairable = new Property<boolean>("Pairable", this._internal);

  //@property({ name: 'PairableTimeout', signature: 'u', access: ACCESS_READWRITE })
  PairableTimeout = new Property<uint32>("PairableTimeout", this._internal);

  //@property({ name: 'Discovering', signature: 'b', access: ACCESS_READ })
  Discovering = new ReadOnlyProperty<boolean>("Discovering", this._internal);

  //@property({ name: 'UUIDs', signature: 'as', access: ACCESS_READ })
  UUIDs = new ReadOnlyProperty<Array<string>>("UUIDs", this._internal);

  //@property({ name: 'Modalias', signature: 's', access: ACCESS_READ })
  Modalias = new ReadOnlyProperty<string>("Modalias", this._internal);

  //@method({ name: 'StartDiscovery', inSignature: '', outSignature: '' })
  async startDiscovery() {
    return this._internal.StartDiscovery();
  }

  //@method({ name: 'SetDiscoveryFilter', inSignature: 'a{sv}', outSignature: '' })
  async setDiscoveryFilter(properties: dict<string, Variant>) {
    return this._internal.SetDiscoveryFilter(properties);
  }

  //@method({ name: 'StopDiscovery', inSignature: '', outSignature: '' })
  async stopDiscovery() {
    return this._internal.StopDiscovery();
  }

  //@method({ name: 'RemoveDevice', inSignature: 'o', outSignature: '' })
  async removeDevice(device: path) {
    return this._internal.RemoveDevice(device);
  }

  //@method({ name: 'GetDiscoveryFilters', inSignature: '', outSignature: 'as' })
  async getDiscoveryFilters(): Promise<Array<string>> {
    return new Array<string>(await this._internal.GetDiscoveryFilters());
  }
}
