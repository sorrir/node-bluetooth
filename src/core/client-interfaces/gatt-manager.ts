import { Bluez } from "../bluez";
import { GattManager1 } from "./generated/GattManager1";
import { BaseInterface } from "./models/base-interface";
import {
  int16,
  uint16,
  int32,
  uint32,
  byte,
  path,
  fileDescriptor,
  dict,
} from "../types";
import { Variant } from "@quadratclown/dbus-next";

export class GattManager extends BaseInterface<GattManager1> {
  /**
   * Hide constructor, initialization shall be done asynchronously with connect.
   */
  private constructor(bluez: Bluez, internal: GattManager1) {
    super(bluez, internal);
  }

  /**
   * Connect to GATT manager under the specified path.
   *
   * @param bluez `Bluez` instance.
   * @param path path of the object.
   * @return `GattManager` if it exists.
   */
  static async connect(bluez: Bluez, path: string) {
    return new GattManager(bluez, await GattManager1.Connect(bluez.bus, path));
  }

  /*
   * Direct mappings to introspected properties, methods and signals of internal GattManager1
   */

  //@method({ name: 'RegisterApplication', inSignature: 'oa{sv}', outSignature: '' })
  async registerApplication(application: path, options: dict<string, Variant>) {
    return this._internal.RegisterApplication(application, options);
  }

  //@method({ name: 'UnregisterApplication', inSignature: 'o', outSignature: '' })
  async unregisterApplication(application: path) {
    return this._internal.UnregisterApplication(application);
  }
}
