import { Bluez } from "../bluez";
import { LEAdvertisingManager1 } from "./generated/LEAdvertisingManager1";
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

export class LEAdvertisingManager extends BaseInterface<LEAdvertisingManager1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: LEAdvertisingManager1) {
    super(bluez, internal);
  }

  /**
   * Connect to LE advertising manager under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `LEAdvertisingManager1` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new LEAdvertisingManager(
      bluez,
      await LEAdvertisingManager1.Connect(bluez.bus, path)
    );
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal LEAdvertisingManager1
   */

  //@property({ name: 'ActiveInstances', signature: 'y', access: ACCESS_READ })
  ActiveInstances = new ReadOnlyProperty<byte>(
    "ActiveInstances",
    this._internal
  );

  //@property({ name: 'SupportedInstances', signature: 'y', access: ACCESS_READ })
  SupportedInstances = new ReadOnlyProperty<byte>(
    "SupportedInstances",
    this._internal
  );

  //@property({ name: 'SupportedIncludes', signature: 'as', access: ACCESS_READ })
  SupportedIncludes = new ReadOnlyProperty<Array<string>>(
    "SupportedIncludes",
    this._internal
  );

  //@property({ name: 'SupportedSecondaryChannels', signature: 'as', access: ACCESS_READ })
  SupportedSecondaryChannels = new ReadOnlyProperty<Array<string>>(
    "SupportedSecondaryChannels",
    this._internal
  );

  //@method({ name: 'RegisterAdvertisement', inSignature: 'oa{sv}', outSignature: '' })
  async registerAdvertisement(
    advertisement: path,
    options: dict<string, Variant>
  ) {
    return this._internal.RegisterAdvertisement(advertisement, options);
  }

  //@method({ name: 'UnregisterAdvertisement', inSignature: 'o', outSignature: '' })
  async unregisterAdvertisement(service: path) {
    return this._internal.UnregisterAdvertisement(service);
  }
}
