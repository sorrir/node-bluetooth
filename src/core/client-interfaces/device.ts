import { Bluez } from "../bluez";
import { Device1 } from "./generated/Device1";
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
import { GattService } from "./gatt-service";

/**
 * @class
 * Remote device that has been discovered by a `Adapter`.
 *
 * Representation of Bluezs `Device1` interface.
 */

export class Device extends BaseInterface<Device1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: Device1) {
    super(bluez, internal);
  }

  /**
   * Connect to device under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `Device` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new Device(bluez, await Device1.Connect(bluez.bus, path));
  }

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
  async getService(
    filter: InterfaceFilterSet<GattService> = {},
    retryOptions: RetryOptions = { maxRetries: 0, retryIntervalMs: 1000 },
    servicesResolvedTimeoutMs = 10000
  ): Promise<GattService | undefined> {
    await this.ServicesResolved.waitForValue(true, servicesResolvedTimeoutMs);
    return this.getChildObject(
      "GattService1",
      GattService.connect,
      filter,
      retryOptions
    );
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal Device1
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

  //@property({ name: 'Appearance', signature: 'q', access: ACCESS_READ })
  Appearance = new ReadOnlyProperty<uint16>("Appearance", this._internal);

  //@property({ name: 'Icon', signature: 's', access: ACCESS_READ })
  Icon = new ReadOnlyProperty<string>("Icon", this._internal);

  //@property({ name: 'Paired', signature: 'b', access: ACCESS_READ })
  Paired = new ReadOnlyProperty<boolean>("Paired", this._internal);

  //@property({ name: 'Trusted', signature: 'b', access: ACCESS_READWRITE })
  Trusted = new Property<boolean>("Trusted", this._internal);

  //@property({ name: 'Blocked', signature: 'b', access: ACCESS_READWRITE })
  Blocked = new Property<boolean>("Blocked", this._internal);

  //@property({ name: 'LegacyPairing', signature: 'b', access: ACCESS_READ })
  LegacyPairing = new ReadOnlyProperty<boolean>(
    "LegacyPairing",
    this._internal
  );

  //@property({ name: 'RSSI', signature: 'n', access: ACCESS_READ })
  RSSI = new ReadOnlyProperty<int16>("RSSI", this._internal);

  //@property({ name: 'Connected', signature: 'b', access: ACCESS_READ })
  Connected = new ReadOnlyProperty<boolean>("Connected", this._internal);

  //@property({ name: 'UUIDs', signature: 'as', access: ACCESS_READ })
  UUIDs = new ReadOnlyProperty<Array<string>>("UUIDs", this._internal);

  //@property({ name: 'Modalias', signature: 's', access: ACCESS_READ })
  Modalias = new ReadOnlyProperty<string>("Modalias", this._internal);

  //@property({ name: 'Adapter', signature: 'o', access: ACCESS_READ })
  Adapter = new ReadOnlyProperty<path>("Adapter", this._internal);

  //@property({ name: 'ManufacturerData', signature: 'a{qv}', access: ACCESS_READ })
  ManufacturerData = new ReadOnlyProperty<dict<uint16, Variant>>(
    "ManufacturerData",
    this._internal
  );

  //@property({ name: 'ServiceData', signature: 'a{sv}', access: ACCESS_READ })
  ServiceData = new ReadOnlyProperty<dict<string, Variant>>(
    "ServiceData",
    this._internal
  );

  //@property({ name: 'TxPower', signature: 'n', access: ACCESS_READ })
  TxPower = new ReadOnlyProperty<int16>("TxPower", this._internal);

  //@property({ name: 'ServicesResolved', signature: 'b', access: ACCESS_READ })
  ServicesResolved = new ReadOnlyProperty<boolean>(
    "ServicesResolved",
    this._internal
  );

  //@method({ name: 'Disconnect', inSignature: '', outSignature: '' })
  async disconnect() {
    return this._internal.Disconnect();
  }

  //@method({ name: 'Connect', inSignature: '', outSignature: '' })
  async connect() {
    return this._internal.Connect();
  }

  //@method({ name: 'ConnectProfile', inSignature: 's', outSignature: '' })
  async connectProfile(UUID: string) {
    return this._internal.ConnectProfile(UUID);
  }

  //@method({ name: 'DisconnectProfile', inSignature: 's', outSignature: '' })
  async disconnectProfile(UUID: string) {
    return this._internal.DisconnectProfile(UUID);
  }

  //@method({ name: 'Pair', inSignature: '', outSignature: '' })
  async pair() {
    return this._internal.Pair();
  }

  //@method({ name: 'CancelPairing', inSignature: '', outSignature: '' })
  async cancelPairing() {
    return this._internal.CancelPairing();
  }
}
